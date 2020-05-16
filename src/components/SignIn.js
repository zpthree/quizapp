import React, { useState, useContext } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { AppContext } from '@components/AppContext';
import Logo from '@icons/Logo';

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      id
      firstName
      lastName
      username
      email
    }
  }
`;

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signIn] = useMutation(SIGNIN_MUTATION);
  const { refetchAppData, theme } = useContext(AppContext);
  const router = useRouter();

  return (
    <SignInFormStyles
      theme={theme}
      method="post"
      onSubmit={async e => {
        e.preventDefault();
        const { data } = await signIn({ variables: { email, password } });
        await refetchAppData();
        router.push('/u/[username]', `/u/${data?.signIn.username}`);
      }}
    >
      <div className="logo">
        <Logo />
      </div>
      <label htmlFor="email">
        <p>Email</p>
        <input
          id="email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </label>
      <label htmlFor="password">
        <p>Password</p>
        <input
          id="password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </label>
      <button type="submit" className="btn btn__submit">
        Sign In
      </button>
    </SignInFormStyles>
  );
}

export const SignInFormStyles = styled.form`
  ${({ theme }) => {
    if (theme === 'dark') {
      return `--box-shadow: 0 .2rem .2rem .2rem rgba(255, 255, 255, 0.1);`;
    }

    return `--box-shadow: 0 .2rem .2rem .1rem rgba(0, 0, 0, 0.1);`;
  }}

  border-radius: var(--br);
  border: 0.1rem solid var(--border-color);
  box-shadow: var(--box-shadow);
  max-width: 40rem;
  padding: 4rem;
  width: 100%;

  fieldset {
    border: none;
    padding: 0;
  }

  .logo {
    text-align: center;
    width: 100%;

    svg {
      height: 5rem;
      width: 5rem;
    }

    svg path {
      fill: var(--text-color);
    }
  }

  label {
    display: inline-block;
    width: 100%;
  }

  input,
  p,
  button {
    display: inline-block;
    font-size: var(--fs-base);
    width: 100%;
  }

  input {
    height: 4rem;
    margin-bottom: 1rem;
    padding: 0.6rem 1.2rem;
    width: 100%;
  }

  button {
    margin-top: 2rem;
  }
`;
