import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { PageLayout } from "../../layouts/PageLayout"
import { FormEvent, useEffect } from "react";
import { UserSignup } from "../../../types/User";
import { registerUser } from "../../../store/action";
import { Header } from "../../header/Header";
import { AuthStatus } from "../../../types/AuthStatus";
import { ErrorField } from "../../error_field/ErrorField";

export const SignUp = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authStatus = useAppSelector((state) => state.authStatus);
  const registered = useAppSelector((state) => state.succeeded);

  if (authStatus !== AuthStatus.NoAuth) {
    navigate("/");
  }

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form) as Iterable<[UserSignup]>;
    const data: UserSignup = Object.fromEntries(formData);
    dispatch(registerUser(data));
  };

  useEffect(() => {
    if (registered) {
      navigate("/login");
    }
  }, [navigate, registered]);

  return (
    <PageLayout title="Регистрация" header={<Header>
      <h1 className="self-end">Зарегистрироваться</h1>
    </Header>} footer={false}>
      <form className="flex justify-center flex-col gap-2" action="#" method="post" onSubmit={handleFormSubmit}>
        <div className="flex justify-between mx-2">
          <label>Почта</label>
          <input type="email" name="email" className="w-32 border-gray-300 border-2" />
        </div>
        <div className="flex justify-center text-red-600">
          <ErrorField field="email" />
        </div>
        <div className="flex justify-between mx-2">
          <label>Псевдоним</label>
          <input type="username" name="username" className="w-32 border-gray-300 border-2" />
        </div>
        <div className="flex justify-center text-red-600">
          <ErrorField field="username" />
        </div>
        <div className="flex justify-between mx-2">
          <label>Пароль</label>
          <input type="password" name="password" className="w-32 border-gray-300 border-2" />
        </div>
        <div className="flex justify-center text-red-600">
          <ErrorField field="password" />
        </div>
        <div className="flex justify-between mx-2">
          <label className="text-center">Подтверждение пароля</label>
          <input type="password" name="password_confirm" className="w-32 border-gray-300 border-2" />
        </div>
        <div className="flex justify-center text-red-600">
          <ErrorField field="password_confirm" />
        </div>
        <div className="flex justify-center">
          <button type="submit">Зарегистрироваться</button>
        </div>
        <ErrorField field="detail" />
      </form>
    </PageLayout>
  );
};
