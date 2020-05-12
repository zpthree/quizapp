import React from 'react';
import { gql, useQuery } from '@apollo/client';
import styled from 'styled-components';
import withLayout from '@components/withLayout';
import QuizListing, { QuizListingStyles } from '@components/QuizListing';
import { loading } from '@styles/AnswerStyles';

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
  const { loading: isLoading, error, data } = useQuery(ALL_QUIZZES_QUERY);

  if (isLoading)
    return (
      <QuizzesPageStyles className="loading inner">
        <QuizListingStyles />
        <QuizListingStyles />
        <QuizListingStyles />
        <QuizListingStyles />
      </QuizzesPageStyles>
    );
  if (error) return `Error! ${error.message}`;

  return (
    <QuizzesPageStyles className="inner">
      {data.allQuizzes.map(quiz => (
        <QuizListing key={quiz.id} quiz={quiz} />
      ))}
    </QuizzesPageStyles>
  );
}

const QuizzesPageStyles = styled.div`
  display: grid;
  grid-gap: 4rem;
  grid-template-columns: 1fr;

  &.inner {
    max-width: var(--small-page-width);
    padding: 4rem var(--gutter);
  }

  &.loading > div {
    height: 13rem;
    overflow: hidden;
  }
`;

export default withLayout(QuizzesPage);
