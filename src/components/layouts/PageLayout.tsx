import { FC, ReactNode, useEffect } from "react";
import { Footer } from "../footer/Footer";

interface IPageLayoutProps {
  title: string;
  header?: ReactNode;
  children: ReactNode;
  footer: boolean;
};

export const PageLayout: FC<IPageLayoutProps> = ({
  title,
  header,
  children,
  footer = true
}) => {
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
