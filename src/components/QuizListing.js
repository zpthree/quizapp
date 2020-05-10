import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import styled from 'styled-components';
import { AppContext } from '@components/AppContext';

function makeExcerpt({ string, outputLength }) {
  if (string.length <= outputLength) {
    return string;
  }

  return `${string.substring(0, outputLength)}...`;
}

function QuizListing({ quiz }) {
  const { theme } = useContext(AppContext);

  return (
    <QuizListingStyles theme={theme}>
      <h2>
        <Link href="/quiz/[slug]" as={`/quiz/${quiz.slug}`}>
          <a>{quiz.title}</a>
        </Link>
      </h2>
      {quiz.description && (
        <p>{makeExcerpt({ string: quiz.description, outputLength: 100 })}</p>
      )}
    </QuizListingStyles>
  );
}

QuizListing.propTypes = {
  quiz: PropTypes.object.isRequired,
};

const QuizListingStyles = styled.div`
  /* border: 0.2rem solid var(--border-color); */
  box-shadow: ${({ theme }) =>
    theme === 'dark'
      ? '0 2px 2px 2px rgba(255, 255, 255, 0.1)'
      : '0 2px 2px 2px rgba(0, 0, 0, 0.1)'};
  border-radius: var(--br);
  padding: 1rem 2rem;

  h2 {
    font-size: var(--fs-lg);
    transition: var(--transition-none);
    margin-top: 1rem;
  }

  p {
    font-size: var(--fs-md);
  }

  a:hover {
    color: var(--text-color-alt);
  }
`;

export default QuizListing;
