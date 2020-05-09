import React from 'react';
import styled from 'styled-components';
import AnswerStyles, { loading } from '@styles/AnswerStyles';

export default function QuestionPlaceholder() {
  return (
    <QuestionPlaceholderStyles>
      <div className="title-placeholder loading" />
      <div className="answers">
        <AnswerStyles className="answer loading" />
        <AnswerStyles className="answer loading" />
        <AnswerStyles className="answer loading" />
        <AnswerStyles className="answer loading" />
        <div className="question-nav-links">
          <p className="go-back loading" />
          <p className="next-question loading" />
        </div>
      </div>
    </QuestionPlaceholderStyles>
  );
}

const QuestionPlaceholderStyles = styled.div`
  .title-placeholder {
    height: 7.5rem;
    margin-bottom: 2rem;
    width: 50%;
  }

  .answers {
    display: grid;
    grid-gap: 2rem;
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
    background-size: 100rem 10.4rem;
    border-radius: var(--br);
    position: relative;
    overflow: hidden;
    cursor: progress;
  }

  .question-nav-links {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .go-back {
    height: 6rem;
    overflow: hidden;
    padding: 0.75rem 1.5rem;
    width: 15rem;
  }

  .next-question {
    height: 6rem;
    overflow: hidden;
    padding: 0.75rem 1.5rem;
    width: 30rem;
  }
`;
