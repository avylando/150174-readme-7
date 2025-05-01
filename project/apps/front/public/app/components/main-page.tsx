import * as React from 'react';

interface IMainPageProps {}

const MainPage: React.FunctionComponent<IMainPageProps> = (props) => {
  return (
    <main>
      <h1 className="visually-hidden">
        Главная страница сайта по созданию микроблога readme
      </h1>
      <div className="page__main-wrapper page__main-wrapper--intro container">
        <section className="intro">
          <h2 className="visually-hidden">Наши преимущества</h2>
          <b className="intro__slogan">
            Блог, каким
            <br />
            он должен быть
          </b>
          <ul className="intro__advantages-list">
            <li className="intro__advantage intro__advantage--ease">
              <p className="intro__advantage-text">
                Есть все необходимое для&nbsp;простоты публикации
              </p>
            </li>
            <li className="intro__advantage intro__advantage--no-excess">
              <p className="intro__advantage-text">
                Нет ничего лишнего, отвлекающего от сути
              </p>
            </li>
          </ul>
        </section>
        <section className="authorization">
          <h2 className="visually-hidden">Авторизация</h2>
          <form
            className="authorization__form form"
            action="http://localhost:4000/api/users/login"
            method="post"
          >
            <div className="authorization__input-wrapper form__input-wrapper">
              <input
                className="authorization__input authorization__input--login form__input"
                type="text"
                name="login"
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
            >
              Войти
            </button>
          </form>
        </section>
      </div>
    </main>
  );
};

export { MainPage };
