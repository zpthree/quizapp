import styled, { keyframes } from 'styled-components';

export const loading = keyframes`
    0%{
        background-position: -468px 0
    }
    100%{
        background-position: 468px 0
    }
`;

const AnswerStyles = styled.button`
  background-color: var(--bg-color);
  border-radius: var(--br);
  border: 2px solid var(--border-color);
  color: var(--text-color);
  display: grid;
  font-size: var(--fs-base);
  grid-template-columns: 50px 1fr;
  outline: none;
  cursor: pointer;
  padding: 2rem;
  position: relative;

  &.loading {
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
    cursor: progress;
  }

  &.answered {
    background-color: rgba(0, 124, 184, 0.125);
    border-color: #1989bf;
  }

  &.answered.incorrect {
    background-color: rgba(255, 0, 0, 0.15);
    border-color: #ff0000;
  }

  &.answered.correct {
    background-color: rgba(0, 170, 0, 0.15);
    border-color: #00aa00;
  }

  &:hover:not([aria-disabled='true']) {
    background-color: var(--bg-color-alt);
  }

  p {
    margin: 0;
    padding: 1rem;

    &.answer--letter {
      border-radius: var(--br);
      font-size: var(--fs-lg);
      font-weight: 700;
    }

    &:not(.answer--letter) {
      text-align: left;
    }
  }
`;

export default AnswerStyles;
