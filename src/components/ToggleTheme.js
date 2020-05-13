import React, { useContext } from 'react';
import { gql, useMutation } from '@apollo/client';
import styled from 'styled-components';
import { AppContext } from '@components/AppContext';

const TOGGLE_THEME_MUTATION = gql`
  mutation TOGGLE_THEME_MUTATION($theme: String!) {
    toggleTheme(theme: $theme) {
      message
    }
  }
`;

export default function ToggleTheme() {
  const { theme, refetchAppData } = useContext(AppContext);
  const [toggleTheme] = useMutation(TOGGLE_THEME_MUTATION);

  return (
    <ThemeTogglerStyles
      type="button"
      theme={theme}
      aria-label="Toggle websites theme"
      onClick={async () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        await toggleTheme({
          variables: { theme: newTheme },
        });
        refetchAppData();
      }}
    >
      <span className="slider round" data-dark-mode={theme === 'dark'} />
    </ThemeTogglerStyles>
  );
}

const ThemeTogglerStyles = styled.button`
  ${({ theme }) => {
    if (theme === 'dark') {
      return `
        --color: var(--primary-color);
        --background-color: var(--darkgrey);
      `;
    }

    return `
      --color: var(--white);
      --background-color: var(--grey)
    `;
  }};

  /* The switch - the box around the slider */
  background: inherit;
  border: none;
  display: inline-block;
  height: 3.4rem;
  margin-left: 2rem;
  outline: none;
  position: relative;
  width: 6rem;

  /* The slider */
  .slider {
    -webkit-transition: var(--transition);
    background-color: var(--background-color);
    border-radius: 2.8rem;
    bottom: 0;
    cursor: pointer;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    transition: var(--transition);

    &:before {
      -webkit-transition: var(--transition);
      background-color: var(--color);
      border-radius: 50%;
      bottom: 0.6rem;
      content: '';
      height: 2.2rem;
      left: 0.6rem;
      position: absolute;
      transition: var(--transition);
      width: 2.2rem;
    }
  }

  .slider[data-dark-mode='true']:before {
    -ms-transform: translateX(2.6rem);
    -webkit-transform: translateX(2.6rem);
    transform: translateX(2.6rem);
  }
`;
