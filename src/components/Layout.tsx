import React, {ReactNode} from 'react';
import {Wrapper, WrapperVariant} from './Wrapper';
import {NavBar} from './NavBar';

interface LayoutProps {
    children?: ReactNode
  variant?: WrapperVariant;
}

export const Layout:
React.FC<LayoutProps> =
({children, variant}: LayoutProps) => {
  return (
    <>
      <NavBar />
      <Wrapper variant={variant}>{children}</Wrapper>
    </>
  );
};
