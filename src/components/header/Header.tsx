import { FC, ReactNode } from "react";
import Icon from "../../assets/img/ct-icon.svg";

interface IHeaderProps {
  children?: ReactNode,
  icon?: boolean,
};

export const Header: FC<IHeaderProps> = ({ children, icon = true }) => {
  return (
    <header className="bg-gray-100 pb-2">
      <div className="flex items-center gap-2 mx-2">
        {icon && <img src={Icon} alt="Логотип" />}
        {children}
      </div>
    </header>
  );
}
