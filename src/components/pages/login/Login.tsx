import { ChangeEvent, FormEvent, useEffect, useState } from "react";
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
  const authStatus = useAppSelector((state) => state.authStatus);

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form) as Iterable<[UserAuth]>;
    const data: UserAuth = Object.fromEntries(formData);
    dispatch(loginUser(data));
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleForgotPassword = () => {
    if (!email) {
      return;
    }
    setMessage("Пожалуйста, проверьте почту");
  }

  useEffect(() => {
    if (authStatus === AuthStatus.Unknown) {
      dispatch(fetchUser(Token.getId()));
      navigate("/diary");
    }
  }, [authStatus, dispatch, navigate]);

  return (
    <PageLayout title="Войти" header={<Header>
      <h1 className="self-end">Войти</h1>
    </Header>} footer={false}>
      <form className="flex justify-center flex-col" action="#" method="post" onSubmit={handleFormSubmit}>
        <div className="flex justify-around">
          <label>Почта</label>
          <input type="email" name="email" placeholder="Почта" value={email} onChange={handleEmailChange} required />
        </div>
        <div className="flex justify-around">
          <label>Пароль</label>
          <input type="password" name="password" placeholder="Пароль" required />
        </div>
        <div className="flex justify-center flex-col">
          <button type="submit">Войти</button>
          <button type="button" onClick={handleForgotPassword}>Забыли пароль?</button>
        </div>
        <div className="mx-4 text-red-600">
          <ErrorField field="detail" />
          {message && <p>{message}</p>}
        </div>
      </form>
    </PageLayout>
  );
};
