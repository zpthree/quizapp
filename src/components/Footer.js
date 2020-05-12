import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import GitHub from '@icons/GitHub';
import Twitter from '@icons/Twitter';

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
  height: 8rem;
  font-size: var(--fs-md);

  &,
  a {
    color: ${({ route }) =>
      route === '/' ? 'var(--white)' : 'var(--text-color-light)'};
  }

  p > a {
    text-decoration: underline;
  }

  svg {
    height: 2.5rem;
    width: 2.5rem;
  }

  div > a:hover {
    opacity: 0.75;
  }

  div > a:not(:last-child) {
    margin-right: 2rem;
  }

  .inner {
    height: 8rem;
    max-width: var(--small-page-width);
    display: flex;
    justify-content: center;
    align-items: center;

    div,
    div > a {
      display: flex;
      align-items: center;
    }

    p {
      padding: 0 2rem;
      margin: 0 2rem;
    }

    p:first-child {
      border-right: 1px solid var(--border-color);
    }
  }
`;
