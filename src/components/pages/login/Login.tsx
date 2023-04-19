import { FormEvent, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks"
import { PageLayout } from "../../layouts/PageLayout"
import { UserAuth } from "../../../types/User";
import { Header } from "../../header/Header";
import { fetchUser, loginUser } from "../../../store/action";
import { AuthStatus } from "../../../types/AuthStatus";
import { Token } from "../../../util/token";
import { useNavigate } from "react-router-dom";
import { ErrorField } from "../../error_field/ErrorField";

export const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const errors = useAppSelector((state) => state.errors);
  const authStatus = useAppSelector((state) => state.authStatus);

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form) as Iterable<[UserAuth]>;
    const data: UserAuth = Object.fromEntries(formData);
    dispatch(loginUser(data));
  };

  useEffect(() => {
    if (authStatus === AuthStatus.Unknown) {
      dispatch(fetchUser(Token.getId()));
      navigate("/");
    }
  }, [authStatus, dispatch, navigate]);

  return (
    <PageLayout title="Войти" header={<Header>
      <h1 className="self-end">Войти</h1>
    </Header>} footer={false}>
      <form className="flex justify-center flex-col" action="#" method="post" onSubmit={handleFormSubmit}>
        <div className="flex justify-around">
          <label>Почта</label>
          <input type="email" name="email" placeholder="Почта" required />
        </div>
        <div className="flex justify-around">
          <label>Пароль</label>
          <input type="password" name="password" placeholder="Пароль" required />
        </div>
        <div className="flex justify-center">
          <button type="submit">Войти</button>
        </div>
        <ErrorField field="detail" />
      </form>
    </PageLayout>
  );
};
