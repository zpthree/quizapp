import React, { useContext } from 'react';
import UserAccount from '@components/UserAccount';
import { UserAccountContext } from '@components/UserAccountProvider';
import { QuizzesPageStyles } from '@pages/quizzes';
import QuizListing from '@components/QuizListing';

function UserPage() {
  function UserAccountLayout() {
    const { quizzes } = useContext(UserAccountContext);
    return (
      <QuizzesPageStyles
        style={{
          margin: `auto`,
          maxWidth: `var(--small-page-width)`,
        }}
      >
        {quizzes?.map(quiz => (
          <QuizListing key={quiz.id} quiz={quiz} />
        ))}
      </QuizzesPageStyles>
    );
  }

  return (
    <UserAccount>
      <UserAccountLayout />
    </UserAccount>
  );
}

export default UserPage;
