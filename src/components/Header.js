import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import styled from 'styled-components';
import Router from 'next/router';
import NProgress from 'nprogress';
import ToggleTheme from '@components/ToggleTheme';
import Logo from '@icons/Logo';
import { AppContext } from '@components/AppContext';

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
  const { activeUser } = useContext(AppContext);

  return (
    <HeaderStyles theme={theme} route={route}>
      <div className="container">
        <p id="logo">
          <Link href="/">
            <a>
              <Logo />
              <span>Quiz Garden</span>
            </a>
          </Link>
        </p>
        <nav>
          <Link href="/">
            <a aria-label="Go to the homepage">Home</a>
          </Link>
          <Link href="/quizzes">
            <a aria-label="See a list of quizzes">Quizzes</a>
          </Link>
          {activeUser?.firstName ? (
            <Link href="/u/[username]" as={`/u/${activeUser.username}`}>
              <a>{activeUser.firstName}</a>
            </Link>
          ) : (
            <Link href="/sign-in">
              <a aria-label="Sign in to your account">Sign In</a>
            </Link>
          )}
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
  ${({ route }) => {
    if (route === '/') {
      return `
        --color: var(--white);
        --logo-color: var(--white);
        --logo-hover: var(--black);
        `;
    }

    if (route.includes('sign')) {
      return `
        --color: var(--text-color);
        --logo-color: var(--bg-color);
        --logo-hover: var(--text-color);
      `;
    }

    return `
      --color: var(--text-color);
      --logo-color: var(--text-color);
      --logo-hover: var(--primary-color-light);
    `;
  }};
  position: relative;
  z-index: 50;
  width: 100%;

  @media print {
    display: none;
  }

  .container {
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 0 var(--gutter);
  }

  #logo {
    border-radius: var(--br);

    &:hover > a {
      color: var(--logo-hover);

      svg path {
        fill: var(--logo-hover);
      }
    }

    a {
      color: var(--logo-color);
      display: flex;
      align-items: center;
      font-size: var(--fs-lg);
      font-weight: 600;
      letter-spacing: 0.11rem;
      padding: 0.4rem 1.2rem;
    }

    span {
      margin-top: 0.75rem;
      margin-left: 0.5rem;
    }

    svg path {
      fill: var(--logo-color);
    }
  }

  nav {
    align-items: center;
    display: flex;
  }

  nav a {
    border-radius: var(--br);
    color: var(--color);
    font-weight: 600;
    letter-spacing: 0.09rem;
    margin: 0.5rem;
    padding: 0.4rem 1.2rem;
    transition: var(--transition-none);

    &:hover {
      background: var(--primary-color-light);
      color: var(--white);
    }
  }
`;
