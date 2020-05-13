import styled from 'styled-components';

const QuestionStyles = styled.div`
  h2 {
    font-size: var(--fs-xl);
  }

  .answers {
    display: grid;
    grid-gap: 2rem;
    grid-template-columns: 1;
    position: relative;
    width: 100%;
  }

  .question-nav-links {
    --direction: column;
    --btn-width: 100%;
    align-items: center;
    display: flex;
    flex-direction: var(--direction);
    justify-content: space-between;

    & > button,
    & > a,
    & > p {
      max-width: 34rem;
      text-align: center;
      width: var(--btn-width);
    }

    @media screen and (min-width: 768px) {
      --direction: row;
      --btn-width: auto;
    }
  }
`;

export default QuestionStyles;
