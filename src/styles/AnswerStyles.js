import styled, { keyframes } from 'styled-components';

export const loading = keyframes`
    0%{
        background-position: -46.8rem 0
    }
    100%{
        background-position: 46.8rem 0
    }
`;

const AnswerStyles = styled.button`
  background-color: var(--bg-color);
  border-radius: var(--br);
  border: 0.2rem solid var(--border-color);
  color: var(--text-color);
  display: grid;
  font-size: var(--fs-base);
  grid-template-columns: 5rem auto;
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
    background-size: 100rem 10.4rem;
    position: relative;
    overflow: hidden;
    cursor: progress;
  }

  &.answered {
    background-color: rgba(0, 124, 184, 0.125);
    border-color: #1989bf;
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
