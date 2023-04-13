import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface TabLinkProps {
  to: string;
  children?: ReactNode;
  title: string;
};

export const TabLink = ({ to, children, title }: TabLinkProps) => {
  return (
    <Link to={to} className="flex flex-col items-center">
      {children}
      <p className="text-xs">{title}</p>
    </Link>
  );
}
