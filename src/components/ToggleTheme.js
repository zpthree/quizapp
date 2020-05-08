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
  /* The switch - the box around the slider */
  position: relative;
  display: inline-block;
  width: 6rem;
  height: 3rem;
  margin-left: 2rem;
  background: inherit;
  border: none;
  outline: none;

  /* The slider */
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  .slider:before {
    position: absolute;
    content: '';
    height: 2.2rem;
    width: 2.2rem;
    left: 0.4rem;
    bottom: 0.4rem;
    background-color: var(--white);
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  .slider[data-dark-mode='true'] {
    background-color: var(--bg-color-alt);
  }

  .slider[data-dark-mode='true']:before {
    background-color: var(--primary-color);
  }

  input:focus + .slider {
    box-shadow: 0 0 1px var(--primary-color);
  }

  .slider[data-dark-mode='true']:before {
    -webkit-transform: translateX(2.6rem);
    -ms-transform: translateX(2.6rem);
    transform: translateX(2.6rem);
  }

  /* Rounded sliders */
  .slider.round {
    border-radius: 2.8rem;
  }

  .slider.round:before {
    border-radius: 50%;
  }
`;
