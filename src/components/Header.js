import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

function Header() {
  return (
    <HeaderStyles>
      <div className="inner">
        <p>
          <Link href="/">
            <a>Quiz Garden</a>
          </Link>
        </p>
        <nav>
          <Link href="/">
            <a>🏡 Home</a>
          </Link>
          <Link href="/quizzes">
            <a>📝 Quizzes</a>
          </Link>
        </nav>
      </div>
    </HeaderStyles>
  );
}

const HeaderStyles = styled.header`
  width: 100%;

  .inner {
    align-items: center;
    display: flex;
    justify-content: space-between;
    padding: 0 var(--gutter);
  }

  nav a {
    border-radius: var(--br);
    color: var(--fc-main);
    padding: 0.8rem 1.2rem;
    margin: 0.5rem;

    &:hover {
      background: var(--bg-alt-color);
    }
  }
`;

export default Header;
