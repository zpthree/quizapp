import styled from 'styled-components';

const ResultsStyles = styled.div`
  ${({ theme }) => {
    if (theme === 'dark') {
      return `--box-shadow: 0 .2rem .2rem .2rem rgba(255, 255, 255, 0.1);`;
    }

    return `--box-shadow: 0 .2rem .2rem .1rem rgba(0, 0, 0, 0.1);`;
  }}

  &.loading {
    min-height: 40rem;
  }

  padding: 2rem var(--gutter);

  & > div {
    border-radius: var(--br);
    border: 0.1rem solid var(--border-color);
    box-shadow: var(--box-shadow);
    margin: 4rem auto;
    max-width: var(--small-page-width);
    padding: 2rem var(--gutter);
    position: relative;
    width: 100%;
  }

  @media print {
    border: none;
    box-shadow: none;
    margin-top: 0;
    width: 8.5in;
  }

  .grade {
    display: inline-block;
    font-size: var(--fs-base);
    margin: 0;
    padding: 0.5rem 0;

    span {
      font-weight: 600;
    }

    &[data-good-grade='true'] span {
      color: rgba(0, 170, 0, 1);
    }

    &[data-good-grade='false'] span {
      color: rgba(255, 0, 0, 1);
    }

    @media print {
      background-color: #fff;
    }
  }

  h1 {
    font-size: var(--fs-lg);
  }

  h2 {
    display: grid;
    font-size: var(--fs-base);
    grid-template-columns: 3rem auto;
  }

  p {
    font-size: var(--fs-md);
  }

  .results-question {
    page-break-inside: avoid;
    margin-bottom: 4rem;
  }

  .question-explanation {
    border: 0.1rem solid var(--border-color);
    display: grid;
    grid-template-columns: 4rem auto;
    margin-top: 4rem;
    padding: 1rem 2rem 1rem 1rem;
  }

  .question-explanation--light-blub {
    font-size: var(--fs-xl);
    margin: 1.8rem 0;
  }

  .results-answer {
    display: grid;
    grid-template-columns: 2.8rem auto;
    padding: 0.5rem;

    &:not(:last-child) {
      margin-bottom: 0.6rem;
    }

    &[data-answered='true'] {
      background-color: rgba(255, 0, 0, 0.15);
      color: #ff0000;
      font-weight: 600;
    }

    &[data-answered='true'][data-is-correct='true'],
    &[data-correct-answer='true'] {
      background-color: rgba(0, 170, 0, 0.15);
      color: #00aa00;
      font-weight: 600;
    }
  }

  .results-answer p {
    height: auto;
    margin: 0 0 0 2rem;
  }

  .results-answer--answer {
    text-align: left;
  }
`;

export default ResultsStyles;
