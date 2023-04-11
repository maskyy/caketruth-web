import { FC } from "react";
import { createPortal } from "react-dom";
import { CgInsights, CgList, CgLogIn, CgMonday, CgProfile, CgUserAdd } from "react-icons/cg";
import { TabLink } from "./TabLink";
import { useAppSelector } from "../../hooks";
import { AuthStatus } from "../../types/AuthStatus";

export const Footer: FC = () => {
  const authStatus = useAppSelector((state) => state.authStatus);
  return createPortal(
    <footer className="bg-gray-100 py-2">
      <ul className="flex justify-around mx-4">
        <li>
          <TabLink to="/products" title="Продукты">
            <CgMonday size={24} />
          </TabLink>
        </li>
        {authStatus === AuthStatus.NoAuth
          ? <>
          <li>
            <TabLink to="/login" title="Войти">
              <CgLogIn size={24} />
            </TabLink>
          </li>
          <li>
            <TabLink to="/signup" title="Регистрация">
              <CgUserAdd size={24} />
            </TabLink>
          </li>
          </>
          : <>
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
          </>}
      </ul>
    </footer>,
    document.querySelector("#footer") as HTMLElement
  );
}
