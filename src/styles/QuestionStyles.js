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
`;

export default QuestionStyles;
