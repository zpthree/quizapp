import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Twitter, GitHub } from '@icons';

export default function Footer({ route }) {
  return (
    <FooterStyles route={route}>
      <div className="inner">
        <p>
          Created by{' '}
          <a
            target="_blank"
            rel="noreferrer noopener"
            href="https://zachpatrick.com"
          >
            Zach Patrick
          </a>
        </p>
        <div>
          <a
            target="_blank"
            rel="noreferrer noopener"
            href="https://github.com/zpthree/quizapp"
          >
            <GitHub />
          </a>
          <a
            target="_blank"
            rel="noreferrer noopener"
            href="https://twitter.com/zpthree"
          >
            <Twitter />
          </a>
          <a
            target="_blank"
            rel="noreferrer noopener"
            href="https://api.quizgarden.io"
          >
            API
          </a>
        </div>
      </div>
    </FooterStyles>
  );
}

Footer.propTypes = {
  route: PropTypes.string.isRequired,
};

const FooterStyles = styled.footer`
  ${({ route }) => {
    if (route === '/') {
      return `
        --color: var(--white);
        --color-hover: var(--black)
      `;
    }

    return `
      --color: var(--text-color-light);
      --color-hover: var(--text-color)
    `;
  }};

  font-size: var(--fs-md);
  height: 8rem;

  &,
  a {
    color: var(--color);
  }

  p > a {
    text-decoration: underline;
  }

  svg {
    height: 2.5rem;
    width: 2.5rem;

    path {
      fill: var(--color);
    }
  }

  a:hover {
    color: var(--color-hover);

    svg path {
      fill: var(--color-hover);
    }
  }

  div > a:not(:last-child) {
    margin-right: 2rem;
  }

  .inner {
    --direction: column;
    align-items: center;
    flex-direction: var(--direction);
    display: flex;
    height: 8rem;
    justify-content: center;
    max-width: var(--small-page-width);

    @media screen and (min-width: 768px) {
      --direction: row;
    }

    div,
    div > a {
      align-items: center;
      display: flex;
    }

    & > p {
      margin: 0 2rem;
      padding: 0 2rem;
    }

    p:first-child {
      @media screen and (min-width: 768px) {
        border-right: 0.1rem solid var(--border-color);
      }
    }

    & > p,
    & > div {
      margin-bottom: 2rem;

      @media screen and (min-width: 768px) {
        margin-bottom: 0;
      }
    }
  }
`;
