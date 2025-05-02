import * as React from 'react';
import { LoginForm } from './login-form';

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
          <LoginForm />
        </section>
      </div>
    </main>
  );
};

export { MainPage };
