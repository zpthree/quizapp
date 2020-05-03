import React from 'react';
import styled from 'styled-components';
import withLayout from '@components/withLayout';
import Question from '@components/Question';
import QuestionNavigator from '@components/QuestionNavigator';

function QuestionPage() {
  return (
    <QuestionStyles>
      <QuestionNavigator />
      <Question />
    </QuestionStyles>
  );
}

export default withLayout(QuestionPage);

const QuestionStyles = styled.div`
  padding: 0 var(--gutter);

  h1 {
    font-size: var(--fs-xl);
  }

  .answers {
    display: grid;
    grid-gap: 20px;
    grid-template-columns: 1;
    width: 100%;
    position: relative;
  }

  .answers[aria-busy='true'],
  .answers[aria-busy='true'] button {
    cursor: default;
  }

  .answers[aria-busy='true'] {
    opacity: 0.65;
  }
`;
