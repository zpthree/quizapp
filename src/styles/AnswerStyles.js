import styled from 'styled-components';

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
  /* transition: var(--transition-none); */

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

  .badge {
    align-items: center;
    bottom: 0;
    display: flex;
    justify-content: center;
    position: absolute;
    right: 1rem;
    top: 0;
    z-index: 50;
  }
`;

export default AnswerStyles;
