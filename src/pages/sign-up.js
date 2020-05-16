import React from 'react';
import Link from 'next/link';
import withLayout from '@components/withLayout';
import SignUp from '@components/SignUp';
import { SignInPageStyles } from '@pages/sign-in';
import Undraw from '@icons/UndrawMath';

export default withLayout(function SignUpPage() {
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
            <SignUp />
            <Link href="/sign-in">
              <a>Sign In</a>
            </Link>
          </div>
        </div>
      </div>
    </SignInPageStyles>
  );
});
