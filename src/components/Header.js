import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import styled from 'styled-components';
import Router from 'next/router';
import NProgress from 'nprogress';
import toggleTheme from '@lib/toggleTheme';

Router.onRouteChangeStart = () => {
  NProgress.start();
};

Router.onRouteChangeComplete = () => {
  NProgress.done();
};

Router.onRouteChangeError = () => {
  NProgress.done();
};

function Header({ isDarkMode }) {
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
          <label htmlFor="themeToggler" className="switch">
            <input
              id="themeToggler"
              type="checkbox"
              defaultChecked={`${isDarkMode}`}
            />
            <span className="slider round" />
          </label>
        </nav>
      </div>
    </HeaderStyles>
  );
}

Header.propTypes = {
  isDarkMode: PropTypes.bool,
};

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

  /* The switch - the box around the slider */
  .switch {
    position: relative;
    display: inline-block;
    width: 6rem;
    height: 3rem;
    margin-left: 2rem;
  }

  /* Hide default HTML checkbox */
  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  /* The slider */
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  .slider:before {
    position: absolute;
    content: '';
    height: 22px;
    width: 22px;
    left: 4px;
    bottom: 4px;
    background-color: var(--white);
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  input:checked + .slider {
    background-color: var(--bg-color-alt);
  }

  input:checked + .slider:before {
    background-color: var(--primary-color);
  }

  input:focus + .slider {
    box-shadow: 0 0 1px var(--primary-color);
  }

  input:checked + .slider:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
  }

  /* Rounded sliders */
  .slider.round {
    border-radius: 28px;
  }

  .slider.round:before {
    border-radius: 50%;
  }
`;

export default Header;
