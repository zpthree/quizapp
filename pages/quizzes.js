import React from 'react';
import { gql, useQuery } from '@apollo/client';
import withLayout from '@components/withLayout';

const ALL_QUIZZES_QUERY = gql`
  {
    allQuizzes {
      id
      title
    }
  }
`;

function QuizzesPage() {
  const { loading, error, data } = useQuery(ALL_QUIZZES_QUERY);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return data.allQuizzes.map(quiz => <p>{quiz.title}</p>);
}

export default withLayout(QuizzesPage);
