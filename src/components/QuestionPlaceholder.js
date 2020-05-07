import React from 'react';
import styled, { keyframes } from 'styled-components';
import AnswerStyles from '@styles/AnswerStyles';

export default function QuestionPlaceholder() {
  return (
    <QuestionPlaceholderStyles>
      <div className="title-placeholder loading" />
      <div className="answers">
        <AnswerStyles className="answer loading" />
        <AnswerStyles className="answer loading" />
        <AnswerStyles className="answer loading" />
        <AnswerStyles className="answer loading" />
      </div>
    </QuestionPlaceholderStyles>
  );
}

const loading = keyframes`
    0%{
        background-position: -468px 0
    }
    100%{
        background-position: 468px 0
    }
`;

const QuestionPlaceholderStyles = styled.div`
  max-height: calc(100vh - 25rem);

  .title-placeholder {
    height: 6rem;
    margin-bottom: 2rem;
    width: 50%;
  }

  .answers {
    display: grid;
    grid-gap: 20px;
    grid-template-columns: 1;
    width: 100%;
    position: relative;
  }

  .answer {
    height: 9rem;
  }

  .loading {
    animation-duration: 1s;
    animation-fill-mode: forwards;
    animation-iteration-count: infinite;
    animation-name: ${loading};
    animation-timing-function: linear;
    background: linear-gradient(
      to right,
      var(--bg-color-alt) 25%,
      var(--bg-color) 50%,
      var(--bg-color-alt) 75%
    );
    background-size: 1000px 104px;
    position: relative;
    overflow: hidden;
  }
`;
