import React, { useContext } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { UserAccountContext } from '@components/UserAccountProvider';
import SignOut from '@components/SignOut';

export default function UserPageNav({ theme }) {
  // TODO ? do i need this here
  const { user } = useContext(UserAccountContext);

  if (!user) return <div>Loading...</div>;

  return (
    <UserPageNavStyles theme={theme}>
      <nav>
        {user.quizzes?.length && (
          <Link href="/u/[username]/quizzes" as={`/u/${user.username}/quizzes`}>
            <a>My Quizzes</a>
          </Link>
        )}
        <Link
          href="/u/[username]/update-info"
          as={`/u/${user.username}/update-info`}
        >
          <a>Update My Info</a>
        </Link>
        <Link
          href="/u/[username]/update-password"
          as={`/u/${user.username}/update-password`}
        >
          <a>Change My Password</a>
        </Link>
        <Link href="/u/[username]/theme" as={`/u/${user.username}/theme`}>
          <a>Theme</a>
        </Link>
        <SignOut />
      </nav>
    </UserPageNavStyles>
  );
}

UserPageNav.propTypes = {
  theme: PropTypes.string.isRequired,
};

const UserPageNavStyles = styled.aside`
  ${({ theme }) => {
    if (theme === 'dark') {
      return `
        --aside-color: var(--text-color);
        --aside-bg: var(--bg-color);
        --aside-border: .2rem solid var(--white);
      `;
    }

    return `
      --aside-color: var(--bg-color);
      --aside-bg: var(--text-color);
      --aside-border: none;
    `;
  }}

  border-radius: var(--br);
  transition: var(--transition-none);

  nav {
    background-color: var(--bg-color-alt);
    border-radius: var(--br);
    display: grid;
    padding: 2rem;

    button {
      background-color: inherit;
      border: none;
      cursor: pointer;
      font-size: var(--fs-base);
      outline: none;
      text-align: left;
    }

    button,
    a {
      border-radius: var(--br);
      margin: 0.5rem 0;
      padding: 0.5rem 1rem;
    }

    a:hover,
    button:hover {
      color: var(--white);
      background: var(--primary-color-light);
    }
  }

  &,
  a,
  button {
    color: var(--text-color);
    font-weight: 600;
  }
`;
