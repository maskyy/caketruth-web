import { FC, ReactNode } from "react";
import Icon from "../../assets/img/ct-icon.svg";

interface IHeaderProps {
  children?: ReactNode
};

const Header: FC<IHeaderProps> = ({ children }) => {
  return (
    <header className="bg-gray-100 pb-2">
      <div className="flex items-center gap-2 mx-2">
        <img src={Icon} alt="Логотип" />
        {children}
      </div>
    </header>
  );
}

export default Header;
