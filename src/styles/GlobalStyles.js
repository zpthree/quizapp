import { createGlobalStyle } from 'styled-components';

function getMaxWidth() {
  const isDocument = typeof document !== `undefined`;
  if (!isDocument) return null;

  const html = document.querySelector('html');
  const style = window
    .getComputedStyle(html, null)
    .getPropertyValue('font-size');
  const fontSize = parseFloat(style);

  if (fontSize <= 10) return `1200px`;
  return `${fontSize * 120}px`;
}

export const GlobalStyles = createGlobalStyle`
  :root {
    --max-width: ${getMaxWidth()};

    /* font */
    --fs-sm: 1.6rem;
    --fs-md: 1.8rem;
    --fs-base: 2rem;
    --fs-lg: 2.4rem;
    --fs-xl: 3rem;

    /* colors */
    --border-color: #000;
    --fc-main: #000;
    --fc-light: #999;
    --fc-alt: #ff0000;
    --bg-color: #fff;
    --bg-alt-color: #f4f4f4;
    --grey: #ccc;

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
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  body {
    background: var(--bg-color);
    color: var(--fc-main);
    font-size: var(--fs-base);
    line-height: 1.75;
    transition: background-color .4s ease-in-out;
  }

  main,
  .inner {
    margin: auto;
    max-width: var(--max-width);
    width: 100%;
  }

  main {
    padding-top: 2rem;
  }

  a {
    color: var(--fc-main);
    text-decoration: none;
  }
`;
