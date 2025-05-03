import * as React from 'react';
import { useFetcher } from 'react-router';

interface ILoginFormProps {}

const LoginForm: React.FunctionComponent<ILoginFormProps> = (props) => {
  const { Form, state } = useFetcher();
  return (
    <Form className="authorization__form form" method="post">
      <div className="authorization__input-wrapper form__input-wrapper">
        <input
          className="authorization__input authorization__input--login form__input"
          type="text"
          name="email"
          required
          placeholder="Логин"
        />
        <svg className="form__input-icon" width="19" height="18">
          <use xlinkHref="#icon-input-user"></use>
        </svg>
        <label className="visually-hidden">Логин</label>
        <span className="form__error-label form__error-label--login">
          Неверный логин
        </span>
      </div>
      <div className="authorization__input-wrapper form__input-wrapper">
        <input
          className="authorization__input authorization__input--password form__input"
          type="password"
          name="password"
          required
          placeholder="Пароль"
        />
        <svg className="form__input-icon" width="16" height="20">
          <use xlinkHref="#icon-input-password"></use>
        </svg>
        <label className="visually-hidden">Пароль</label>
        <span className="form__error-label">Пароли не совпадают</span>
      </div>
      <a className="authorization__recovery" href="#">
        Восстановить пароль
      </a>
      <button
        className="authorization__submit button button--main"
        type="submit"
        disabled={state === 'submitting'}
      >
        Войти
      </button>
    </Form>
  );
};

export { LoginForm };
