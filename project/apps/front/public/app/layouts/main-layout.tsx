import * as React from 'react';
import { Header } from '../components/app-header';
import { Footer } from '../components/app-footer';
import { SvgSprite } from '../components/svg-sprite';

interface IMainLayoutProps {}

const MainLayout: React.FunctionComponent<
  React.PropsWithChildren<IMainLayoutProps>
> = ({ children }) => {
  return (
    <>
      <SvgSprite />
      <Header />
      {children}
      <Footer />
    </>
  );
};

export { MainLayout };
