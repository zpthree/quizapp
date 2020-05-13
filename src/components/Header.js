import React from 'react';
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
      <div className="container">
        <p id="logo">
          <Link href="/">
            <a>Quiz Garden</a>
          </Link>
        </p>
        <nav>
          <Link href="/">
            <a aria-label="Go to the homepage">Home</a>
          </Link>
          <Link href="/quizzes">
            <a aria-label="See a list of quizzes">Quizzes</a>
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
  ${({ route }) => {
    if (route === '/') {
      return `
        --color: var(--white);
      `;
    }

    return `
      --color: var(--text-color);
    `;
  }};

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
    border: 0.2rem solid var(--background-color);
    transition: transform var(--transition);

    &:hover {
      transform: scale(1.05);
    }

    a {
      color: var(--color);
      display: block;
      font-size: var(--fs-lg);
      font-weight: 600;
      letter-spacing: 0.11rem;
      padding: 0.4rem 1.2rem;
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
    letter-spacing: 0.9px;
    margin: 0.5rem;
    padding: 0.4rem 1.2rem;
    transition: var(--transition-none);

    &:hover {
      background: var(--primary-color-light);
      color: var(--white);
    }
  }
`;
