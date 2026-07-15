import type { jsPDF } from "jspdf";

/**
 * html2canvas-pro + jsPDF are dynamically imported on first use (not
 * imported at module scope) so their weight only ever hits sessions that
 * actually click "Save PDF" — same lazy-load intent the old CDN-script
 * version had, but as a real bundled dependency instead of a runtime
 * `<script src>` tag (which also meant this silently failed offline or
 * whenever the CDN was unreachable).
 *
 * The switch away from plain `html2canvas` is required, not cosmetic:
 * this app's Tailwind v4 theme is defined in `oklch()`/`color-mix()`,
 * which the original html2canvas can't parse at all ("Attempting to
 * parse an unsupported color function") — every export threw
 * immediately. html2canvas-pro is a maintained fork with oklch/lab/
 * color-mix support and the same API.
 */

async function rasterize(node: HTMLElement, backgroundColor: string) {
  const { default: html2canvas } = await import("html2canvas-pro");
  const canvas = await html2canvas(node, { scale: 2, useCORS: true, backgroundColor });
  return { imgData: canvas.toDataURL("image/png"), canvas };
}

function paginate(pdf: jsPDF, imgData: string, imgWidth: number, imgHeight: number, pageHeight: number) {
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
  const [{ imgData, canvas }, { jsPDF }] = await Promise.all([rasterize(node, backgroundColor), import("jspdf")]);

  const pdfWidth = 210; // A4 portrait mm
  const pageHeight = 297;
  const imgWidth = pdfWidth;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  const pdf = new jsPDF("p", "mm", "a4");
  paginate(pdf, imgData, imgWidth, imgHeight, pageHeight);
  pdf.save(filename);
}

export async function saveYearPdf(node: HTMLElement, backgroundColor: string, filename: string) {
  const [{ imgData, canvas }, { jsPDF }] = await Promise.all([rasterize(node, backgroundColor), import("jspdf")]);

  const pdfWidth = 297; // A4 landscape mm — fits the wide 6-column year grid better
  const pageHeight = 210;
  const imgWidth = pdfWidth;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  const pdf = new jsPDF("l", "mm", "a4");
  paginate(pdf, imgData, imgWidth, imgHeight, pageHeight);
  pdf.save(filename);
}
