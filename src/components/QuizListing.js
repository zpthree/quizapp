import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import styled from 'styled-components';

function makeExcerpt({ string, outputLength }) {
  if (string.length <= outputLength) {
    return string;
  }

  return `${string.substring(0, outputLength)}...`;
}

function QuizListing({ quiz }) {
  return (
    <QuizListingStyles>
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
  border: 2px solid var(--border-color);
  border-radius: var(--br);
  padding: 1rem;

  h2 {
    font-size: var(--fs-lg);
  }

  a:hover {
    color: var(--fc-alt);
  }
`;

export default QuizListing;
