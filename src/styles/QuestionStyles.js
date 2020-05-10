import styled from 'styled-components';

const QuestionStyles = styled.div`
  h2 {
    font-size: var(--fs-xl);
  }

  .answers {
    display: grid;
    grid-gap: 2rem;
    grid-template-columns: 1;
    width: 100%;
    position: relative;
  }

  .question-nav-links {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

export default QuestionStyles;
