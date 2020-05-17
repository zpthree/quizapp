import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import withLayout from '@components/withLayout';
import SignIn from '@components/SignIn';
import Undraw from '@icons/UndrawMath';

export default withLayout(function SignInPage() {
  return (
    <SignInPageStyles>
      <div className="wrapper">
        <div className="welcome">
          <Undraw />
          <div className="copy">
            <h1>A place to grow 👨🏻‍🌾</h1>
            <p>
              The ultimate study tool. Make and/or take short quizzes to prepare
              for an uncoming exam. Get a grade at the end so you can see how
              much more studying you need to do.
            </p>
          </div>
        </div>
        <div className="auth">
          <div>
            <SignIn />
            <Link href="/sign-up">
              <a>Sign Up</a>
            </Link>
          </div>
        </div>
      </div>
    </SignInPageStyles>
  );
});

export const SignInPageStyles = styled.div`
  .wrapper {
    min-height: calc(100vh - 17.15rem);
    width: 100vw;
    display: grid;
    grid-template-rows: 1fr 1fr;

    @media screen and (min-width: 990px) {
      grid-template-rows: auto;
      grid-template-columns: 1fr 1fr;
    }
  }

  .welcome {
    background-color: var(--primary-color);
    margin-bottom: -8rem;
    margin-top: -9.15rem;
    padding: 13.15rem 4rem 4rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;

    svg {
      width: 100%;
      max-width: 40rem;
    }

    .copy {
      width: 100%;
      max-width: 65rem;
      color: var(--bg-color);
      margin-top: 5rem;
    }
  }

  .auth {
    display: grid;
    align-items: center;
    justify-content: center;
    padding: 4rem 0;
  }

  .auth > div {
    display: grid;
    align-items: center;
    justify-content: center;

    a {
      display: inline-block;
      margin-top: 2rem;
      color: var(--primary-color);
      font-weight: 500;
      text-align: center;
    }
  }
`;
