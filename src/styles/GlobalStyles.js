import { createGlobalStyle } from 'styled-components';

function getMaxWidth() {
  const isDocument = typeof document !== `undefined`;
  if (!isDocument) return null;

  const html = document.querySelector('html');
  const style = window
    .getComputedStyle(html, null)
    .getPropertyValue('font-size');
  const fontSize = parseFloat(style);

  if (fontSize <= 10) return `1400px`;
  return `${fontSize * 140}px`;
}

export const GlobalStyles = createGlobalStyle`
  :root {
    --max-width: ${getMaxWidth()};
    --transition: 400ms ease-in-out;
    --transition-none: all 0ms ease-in-out;
    /* font */
    --fs-sm: 1.6rem;
    --fs-md: 1.8rem;
    --fs-base: 2rem;
    --fs-lg: 2.4rem;
    --fs-xl: 3rem;
    --fs-2xl: 4rem;
    --fs-3xl: 4.8rem;

    /* colors */
    --black: #000;
    --charcoal: #141414;
    --grey: #ccc;
    --white: #fff;

    --primary-color: #00a15c;
    --primary-color-light: #32b37c;
    --primary-color-dark: #039053;
    --border-color: var(--grey);
    --text-color: var(--black);
    --text-color-light: #999;
    --text-color-alt: var(--primary-color);
    --bg-color: #fff;
    --bg-color-alt: #f4f4f4;

    --br: 2px;
    --gutter: 2rem;

    @media screen and (min-width: 990px) {
      --gutter: 4rem;
    }
  }

  html,
  body {
    margin: 0;
    padding: 0;
    width: 100%;
  }

  html {
    box-sizing: border-box;
    font-size: 62.5%;
    transition: background-color var(--transition),
                border-color var(--transition),
                color var(--transition);
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
    transition: inherit;
  }

  body {
    background: var(--bg-color);
    color: var(--text-color);
    font-size: var(--fs-base);
    line-height: 1.5;
    font-family: sans-serif;
  }

  .inner {
    margin: auto;
    max-width: var(--max-width);
    width: 100%;
  }

  a {
    color: var(--text-color);
    text-decoration: none;
  }
`;
