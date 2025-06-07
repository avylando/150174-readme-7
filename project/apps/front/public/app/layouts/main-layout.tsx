import * as React from 'react';
import { MainHeader } from '../components/app-header';
import { Footer } from '../components/app-footer';
import { SvgSprite } from '../components/svg-sprite';

interface IMainLayoutProps {}

const MainLayout: React.FunctionComponent<
  React.PropsWithChildren<IMainLayoutProps>
> = ({ children }) => {
  return (
    <div className="page page--main">
      <SvgSprite />
      <MainHeader />
      {children}
      <Footer />
    </div>
  );
};

export { MainLayout };
