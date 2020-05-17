import styled from 'styled-components';

const FormStyles = styled.div`
  ${({ theme }) => {
    if (theme === 'dark') {
      return `--box-shadow: 0 .2rem .2rem .2rem rgba(255, 255, 255, 0.1);`;
    }

    return `--box-shadow: 0 .2rem .2rem .1rem rgba(0, 0, 0, 0.1);`;
  }}

  form {
    border-radius: var(--br);
    border: 0.1rem solid var(--border-color);
    box-shadow: var(--box-shadow);
    max-width: 40rem;
    padding: 4rem;
    width: 100%;
  }

  fieldset {
    border: none;
    padding: 0;
  }

  .logo {
    text-align: center;
    width: 100%;

    svg {
      height: 5rem;
      width: 5rem;
    }

    svg path {
      fill: var(--text-color);
    }
  }

  label {
    display: inline-block;
    width: 100%;
  }

  input,
  p,
  button {
    display: inline-block;
    font-size: var(--fs-base);
    width: 100%;
  }

  input {
    height: 4rem;
    margin-bottom: 1rem;
    padding: 0.6rem 1.2rem;
    width: 100%;
  }

  button {
    margin-top: 2rem;
  }
`;

export default FormStyles;
