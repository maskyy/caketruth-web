import { ReactNode, useEffect } from "react";
import { Footer } from "../footer/Footer";

interface PageLayoutProps {
  title: string;
  header?: ReactNode;
  children: ReactNode;
  footer: boolean;
}

export const PageLayout = ({ title, header, children, footer = true }: PageLayoutProps) => {
  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <main>
      {header}
      {children}
      {footer && <Footer />}
    </main>
  );
}
