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
        --color: var(--primary-color-light);
        --background-color: var(--white);
      `;
    }

    return `
      --color: var(--white);
      --background-color: var(--text-color)
    `;
  }};

  /* The switch - the box around the slider */
  background: inherit;
  border: none;
  display: inline-block;
  width: 4rem;
  margin-left: 2rem;
  outline: none;
  padding: 0.5rem;
  position: relative;
  height: 4rem;
  cursor: pointer;

  .slider {
    display: inline-block;
    border: 0.3rem solid var(--background-color);
    border-radius: 50%;
    transition: var(--transition);
    overflow: hidden;
    height: 100%;
    width: 100%;
    position: relative;

    &:before {
      background-color: var(--background-color);
      right: 0;
      content: '';
      left: 0;
      bottom: 50%;
      position: absolute;
      transition: var(--transition);
      height: 50%;
    }
  }

  .slider[data-dark-mode='true'] {
    transform: rotate(180deg);
  }
`;
