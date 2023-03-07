import { FC, ReactNode } from "react";
import { Link } from "react-router-dom";

interface ITabLinkProps {
  to: string;
  children?: ReactNode;
  title: string;
};

export const TabLink: FC<ITabLinkProps> = ({ to, children, title }) => {
  return (
    <Link to={to} className="flex flex-col items-center">
      {children}
      <p className="text-xs">{title}</p>
    </Link>
  );
}
