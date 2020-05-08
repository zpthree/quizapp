import styled from 'styled-components';

const QuestionStyles = styled.div`
  max-height: calc(100vh - 25rem);

  h2 {
    font-size: var(--fs-xl);
  }

  .answers {
    display: grid;
    grid-gap: 20px;
    grid-template-columns: 1;
    width: 100%;
    position: relative;
  }

  .question-nav-links {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .go-back,
  .next-question {
    margin-top: 1rem;
    padding: 0.75rem 1.5rem;
  }

  .go-back {
    --background-color: var(--grey);
    background-color: var(--background-color);
    border-radius: var(--br);
    border: none;
    cursor: pointer;
    font-size: var(--fs-base);
    outline: none;
    transition: var(--transition-none);

    &:hover {
      --background-color: var(--offwhite);
    }
  }

  .next-question {
    background-color: var(--primary-color);
    border-radius: var(--br);
    color: var(--white);
    transition: var(--transition-none);

    &[data-answered='false'] {
      background-color: var(--primary-color-light);
      opacity: 0.6;
      cursor: not-allowed;
    }

    &[data-answered='true']:hover {
      background: var(--primary-color-dark);
      color: var(--white);
    }
  }
`;

export default QuestionStyles;
