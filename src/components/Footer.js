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
  font-size: var(--fs-md);
  height: 8rem;

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
    align-items: center;
    display: flex;
    height: 8rem;
    justify-content: center;
    max-width: var(--small-page-width);

    div,
    div > a {
      align-items: center;
      display: flex;
    }

    p {
      margin: 0 2rem;
      padding: 0 2rem;
    }

    p:first-child {
      border-right: 1px solid var(--border-color);
    }
  }
`;
