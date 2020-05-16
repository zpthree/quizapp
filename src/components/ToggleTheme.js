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
        --color: var(--black);
        --background-color: var(--text-color-light);
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
  padding: 0.5rem 1rem;
  position: relative;
  height: 4rem;
  cursor: pointer;

  .slider {
    display: inline-block;
    border: 0.3rem solid var(--text-color);
    border-radius: var(--br);
    transition: var(--transition);
    overflow: hidden;
    height: 100%;
    width: 100%;
    position: relative;

    &:before {
      -webkit-transition: var(--transition);
      background-color: var(--text-color);
      right: 0;
      content: '';
      left: 0;
      top: 0;
      position: absolute;
      transition: var(--transition);
      height: 1.4rem;
    }
  }

  .slider[data-dark-mode='true']:before {
    transform: translateY(1.4rem);
  }
`;
