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
    align-items: center;
    display: flex;
    justify-content: space-between;
  }
`;

export default QuestionStyles;
