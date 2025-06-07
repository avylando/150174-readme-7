import * as React from 'react';
import Logo from '../../../assets/img/logo.svg';
import { Link } from 'react-router';
import { AppRoute } from '../../../constants/routes';

interface HeaderProps {}

const SlimHeaderView: React.FunctionComponent<HeaderProps> = (props) => {
  return (
    <header className="header page__header">
      <div className="header__wrapper page__header-wrapper container">
        <div className="header__logo-wrapper page__logo-wrapper">
          <a className="header__logo-link header__logo-link--active">
            <img
              className="header__logo"
              src={Logo}
              alt="Логотип readme"
              width="172"
              height="32"
            />
          </a>
          <p className="header__topic page__header-topic">micro blogging</p>
        </div>
        <div className="header__nav-wrapper">
          <nav className="header__nav">
            <p className="header__register-slogan">Еще нет аккаунта?</p>
            <ul className="header__user-nav">
              <li>
                <Link
                  className="header__user-button header__register-button button button--transparent"
                  to={AppRoute.SIGN_UP}
                >
                  Регистрация
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export { SlimHeaderView };
