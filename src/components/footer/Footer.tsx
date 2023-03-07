import { FC } from "react";
import { createPortal } from "react-dom";
import { CgInsights, CgList, CgMonday, CgProfile } from "react-icons/cg";
import { TabLink } from "./TabLink";

export const Footer: FC = () => {
  return createPortal(
    <footer className="bg-gray-100 py-2">
      <ul className="flex justify-between mx-4">
        <li>
          <TabLink to="/products" title="Продукты">
            <CgMonday size={24} />
          </TabLink>
        </li>
        <li>
          <TabLink to="/diary" title="Дневник">
            <CgList size={24} />
          </TabLink>
        </li>
        <li>
          <TabLink to="/reports" title="Отчёты">
            <CgInsights size={24} />
          </TabLink>
        </li>
        <li>
          <TabLink to="/profile" title="Профиль">
            <CgProfile size={24} />
          </TabLink>
        </li>
      </ul>
    </footer>,
    document.querySelector("#footer") as HTMLElement
  );
}
