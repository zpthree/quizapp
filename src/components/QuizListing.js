import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import styled from 'styled-components';
import { AppContext } from '@components/AppContext';

function makeExcerpt({ string, length }) {
  if (string.length <= length) {
    return string;
  }

  return `${string.substring(0, length)}...`;
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
        <p>{makeExcerpt({ string: quiz.description, length: 240 })}</p>
      )}
    </QuizListingStyles>
  );
}

QuizListing.propTypes = {
  quiz: PropTypes.object.isRequired,
};

export const QuizListingStyles = styled.div`
  ${({ theme }) => {
    if (theme === 'dark') {
      return `--box-shadow: 0 .2rem .2rem .2rem rgba(255, 255, 255, 0.1);`;
    }

    return `--box-shadow: 0 .2rem .2rem .1rem rgba(0, 0, 0, 0.1);`;
  }}

  border-radius: var(--br);
  border: 0.1rem solid var(--border-color);
  box-shadow: var(--box-shadow);
  padding: 1rem 2rem;

  h2 {
    font-size: var(--fs-lg);
    margin-top: 1rem;
    transition: var(--transition-none);
  }

  p {
    font-size: var(--fs-md);
  }

  a:hover {
    color: var(--text-color-alt);
  }
`;

export default QuizListing;
