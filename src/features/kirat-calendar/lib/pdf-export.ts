/**
 * html2canvas + jsPDF are loaded lazily from a CDN on first use instead of
 * being installed as npm deps — "Save PDF" is a rarely-used, best-effort
 * feature, and rasterizing to canvas isn't worth the permanent bundle
 * weight for sessions that never touch it.
 */

interface Html2CanvasOptions {
  scale?: number;
  useCORS?: boolean;
  backgroundColor?: string;
}

type Html2Canvas = (node: HTMLElement, options?: Html2CanvasOptions) => Promise<HTMLCanvasElement>;

interface JsPdfInstance {
  addImage: (data: string, format: string, x: number, y: number, width: number, height: number) => void;
  addPage: () => void;
  save: (filename: string) => void;
}

interface JsPdfConstructor {
  new (orientation: "p" | "l", unit: "mm", format: "a4"): JsPdfInstance;
}

declare global {
  interface Window {
    html2canvas?: Html2Canvas;
    jspdf?: { jsPDF: JsPdfConstructor };
  }
}

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.head.appendChild(script);
  });
}

let pdfLibsLoaded = false;

async function ensurePdfLibs(): Promise<void> {
  if (pdfLibsLoaded) return;
  if (typeof window.html2canvas === "undefined") {
    await loadScript("https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js");
  }
  if (typeof window.jspdf === "undefined") {
    await loadScript("https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js");
  }
  pdfLibsLoaded = true;
}

async function rasterize(node: HTMLElement, backgroundColor: string) {
  await ensurePdfLibs();
  if (!window.html2canvas || !window.jspdf) throw new Error("PDF libraries failed to load");
  const canvas = await window.html2canvas(node, { scale: 2, useCORS: true, backgroundColor });
  return { imgData: canvas.toDataURL("image/png"), canvas };
}

function paginate(pdf: JsPdfInstance, imgData: string, imgWidth: number, imgHeight: number, pageHeight: number) {
  let heightLeft = imgHeight;
  let position = 0;
  pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
  heightLeft -= pageHeight;
  while (heightLeft > 0) {
    position = heightLeft - imgHeight;
    pdf.addPage();
    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
  }
}

export async function saveCalendarPdf(node: HTMLElement, backgroundColor: string, filename: string) {
  const { imgData, canvas } = await rasterize(node, backgroundColor);
  const { jsPDF } = window.jspdf!;

  const pdfWidth = 210; // A4 portrait mm
  const pageHeight = 297;
  const imgWidth = pdfWidth;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  const pdf = new jsPDF("p", "mm", "a4");
  paginate(pdf, imgData, imgWidth, imgHeight, pageHeight);
  pdf.save(filename);
}

export async function saveYearPdf(node: HTMLElement, backgroundColor: string, filename: string) {
  const { imgData, canvas } = await rasterize(node, backgroundColor);
  const { jsPDF } = window.jspdf!;

  const pdfWidth = 297; // A4 landscape mm — fits the wide 6-column year grid better
  const pageHeight = 210;
  const imgWidth = pdfWidth;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  const pdf = new jsPDF("l", "mm", "a4");
  paginate(pdf, imgData, imgWidth, imgHeight, pageHeight);
  pdf.save(filename);
}
