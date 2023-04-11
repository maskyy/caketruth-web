import { FormEvent } from "react";
import { PageLayout } from "../../layouts/PageLayout";
import { Header } from "../../header/Header";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { UserUpdate } from "../../../types/User";
import { Link } from "react-router-dom";
import { CgLogOut, CgRedo } from "react-icons/cg";
import { updateUser } from "../../../store/action";

export const Profile = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const authStatus = useAppSelector((state) => state.authStatus);

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form) as Iterable<[UserUpdate]>;
    const data: UserUpdate = Object.fromEntries(formData);
    console.log(data);
    dispatch(updateUser(data));
  }
  return (
    <PageLayout title="Профиль" header={<Header><h1 className="self-end">Профиль</h1></Header>} footer>
      <form action="#" method="patch" className="flex flex-col justify-center gap-2" onSubmit={handleFormSubmit}>
        <input type="hidden" name="id" defaultValue={user?.id} />
        <div className="flex justify-between mx-2">
          <label>Почта</label>
          <input type="email" name="email" defaultValue={user?.email} className="w-32 border-gray-300 border-2" />
        </div>
        <div className="flex justify-between mx-2">
          <label>Псевдоним</label>
          <input type="username" name="username" defaultValue={user?.username} className="w-32 border-gray-300 border-2" />
        </div>
        <div className="flex justify-between mx-2">
          <label>Пароль</label>
          <input type="password" name="password" className="w-32 border-gray-300 border-2" />
        </div>
        <div className="flex justify-between mx-2">
          <label className="text-center">Подтверждение пароля</label>
          <input type="password" name="password_confirm" className="w-32 border-gray-300 border-2" />
        </div>
        <div className="flex justify-center items-center flex-col">
          <button type="submit" className="flex flex-col items-center"><CgRedo size={24} /> Обновить</button>
          <Link to="/logout" className="flex flex-col items-center"><CgLogOut size={24} />Выйти</Link>
        </div>
      </form>
    </PageLayout>
  );
}
