import React from 'react';
import { gql, useQuery } from '@apollo/client';
import styled from 'styled-components';
import withLayout from '@components/withLayout';
import QuizListing from '@components/QuizListing';

const ALL_QUIZZES_QUERY = gql`
  {
    allQuizzes {
      id
      slug
      title
      description
      tags
      user {
        name
      }
      user {
        name
      }
    }
  }
`;

function QuizzesPage() {
  const { loading, error, data } = useQuery(ALL_QUIZZES_QUERY);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return (
    <QuizzesPageStyles>
      {data.allQuizzes.map(quiz => (
        <QuizListing key={quiz.id} quiz={quiz} />
      ))}
    </QuizzesPageStyles>
  );
}

const QuizzesPageStyles = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 20px;
  padding: 0 var(--gutter);
`;

export default withLayout(QuizzesPage);
