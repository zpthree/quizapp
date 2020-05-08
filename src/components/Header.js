import React, { useContext } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import Router from 'next/router';
import NProgress from 'nprogress';
import ToggleTheme from '@components/ToggleTheme';

Router.onRouteChangeStart = () => {
  NProgress.start();
};

Router.onRouteChangeComplete = () => {
  NProgress.done();
};

Router.onRouteChangeError = () => {
  NProgress.done();
};

function Header() {
  return (
    <HeaderStyles>
      <div className="inner">
        <p id="logo">
          <Link href="/">
            <a>Quiz Garden</a>
          </Link>
        </p>
        <nav>
          <Link href="/">
            <a>Home</a>
          </Link>
          <Link href="/quizzes">
            <a>Quizzes</a>
          </Link>
          <ToggleTheme />
        </nav>
      </div>
    </HeaderStyles>
  );
}

const HeaderStyles = styled.header`
  border-bottom: 1px solid var(--primary-color);
  width: 100%;

  .inner {
    align-items: center;
    display: flex;
    justify-content: space-between;
    padding: 0 var(--gutter);
  }

  #logo a {
    color: var(--text-color);
  }

  nav {
    display: flex;
    align-items: center;
  }

  nav a {
    border-radius: var(--br);
    color: var(--text-color);
    padding: 0.4rem 1.2rem;
    margin: 0.5rem;
    transition: var(--transition-none);

    &:hover {
      background: var(--primary-color-dark);
      color: var(--white);
    }
  }
`;

export default Header;
