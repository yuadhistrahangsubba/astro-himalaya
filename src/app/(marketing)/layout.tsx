import { Footer } from "@/components/marketing/footer";
import { Navbar } from "@/components/marketing/navbar";
import { SunlitBackground } from "@/components/marketing/sunlit-background";

export default function MarketingLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // `color` resolved from a var() is computed once where the rule lives — here,
  // on <body>, outside this scope — and that computed value simply inherits
  // down. Re-declaring `text-foreground` here forces a fresh evaluation of
  // --foreground inside the .light scope, so plain text without its own
  // color utility picks up the light theme's ink color instead of staying
  // stuck with body's dark-theme value.
  return (
    <div className="light bg-background text-foreground">
      <SunlitBackground />
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
