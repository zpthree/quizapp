import React, { useContext } from 'react';
import PropTypes from 'prop-types';
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

export default function Header({ theme, route }) {
  return (
    <HeaderStyles theme={theme} route={route}>
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

Header.propTypes = {
  theme: PropTypes.string.isRequired,
  route: PropTypes.string.isRequired,
};

const HeaderStyles = styled.header`
  ${({ theme, route }) => {
    if (route === '/' || theme !== 'dark') {
      return 'background-color: var(--primary-color);';
    }

    return 'background-color: var(--background-color);';
  }};

  width: 100%;

  @media print {
    display: none;
  }

  .inner {
    align-items: center;
    display: flex;
    justify-content: space-between;
    padding: 0 var(--gutter);
  }

  #logo {
    border-radius: var(--br);
    border: 2px solid var(--background-color);
    transition: transform var(--transition);

    &:hover {
      transform: scale(1.05);
    }

    a {
      font-size: var(--fs-lg);
      color: var(--white);
      padding: 0.4rem 1.2rem;
      font-weight: 600;
      letter-spacing: 0.11rem;
      display: block;
    }
  }

  nav {
    display: flex;
    align-items: center;
  }

  nav a {
    border-radius: var(--br);
    color: var(--white);
    padding: 0.4rem 1.2rem;
    margin: 0.5rem;
    transition: var(--transition-none);

    &:hover {
      background: var(--primary-color-light);
      color: var(--white);
    }
  }
`;
