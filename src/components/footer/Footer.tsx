import { CgInsights, CgList, CgMonday, CgProfile } from "react-icons/cg";
import TabLink from "./TabLink";

function Footer() {
  return (
    <footer className="bg-gray-100 py-2">
      <ul className="flex justify-between mx-2">
        <li>
          <TabLink to="/products" title="Продукты">
            <CgMonday />
          </TabLink>
        </li>
        <li>
          <TabLink to="/diary" title="Дневник">
            <CgList />
          </TabLink>
        </li>
        <li>
          <TabLink to="/reports" title="Отчёты">
            <CgInsights />
          </TabLink>
        </li>
        <li>
          <TabLink to="/profile" title="Профиль">
            <CgProfile />
          </TabLink>
        </li>
      </ul>
    </footer>
  );
}

export default Footer;
