import { createGlobalStyle } from 'styled-components';
import { lighten, darken } from 'polished';

function getMaxWidth() {
  const isDocument = typeof document !== `undefined`;

  if (isDocument) {
    const html = document.querySelector('html');
    const style = window
      .getComputedStyle(html, null)
      .getPropertyValue('font-size');
    const fontSize = parseFloat(style);

    if (fontSize <= 10) return `1500px`;
    return `${fontSize * 150}px`;
  }
}

export const GlobalStyles = createGlobalStyle`
  :root {
    /* theme variables */
    --bg-color: ${({ theme }) =>
      theme === 'dark' ? 'var(--black)' : 'var(--white)'};
    --bg-color-alt: ${({ theme }) =>
      theme === 'dark' ? 'var(--charcoal)' : 'var(--lightgrey)'};
    --border-color: ${({ theme }) =>
      theme === 'dark' ? 'var(--charcoal)' : 'var(--grey)'};
    --text-color: ${({ theme }) =>
      theme === 'dark' ? 'var(--white)' : 'var(--black)'};
    --nprogress-bar: ${({ theme }) =>
      theme === 'dark' ? 'var(--white)' : 'var(--white)'};
    --results-page-box-shadow: ${({ theme }) =>
      theme === 'dark'
        ? '0 .1rem .4rem .2rem rgba(150, 150, 150, .2)'
        : '0 .4rem .4rem .2rem rgba(0, 0, 0, .1)'};
    --logo-bg-color: ${({ theme }) =>
      theme === 'dark' ? 'var(--black)' : 'var(--white)'};
    --logo-text-color: ${({ theme }) =>
      theme === 'dark' ? 'var(--white)' : 'var(--primary-color)'};

    --max-width: ${getMaxWidth()};
    --small-page-width: 85rem;
    --transition: 400ms ease-in-out;
    --transition-none: all 0ms ease-in-out;

    /* font */
    --fs-root: 10px;
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
    --lightgrey: #f4f4f4;
    --white: #fff;
    --offwhite: #fdfdfd;

    --primary-color: ${({ primaryColor }) => primaryColor};
    --primary-color-light: ${({ primaryColor }) =>
      lighten(0.075, `${primaryColor}`)};
    --primary-color-dark: ${({ primaryColor }) =>
      darken(0.075, `${primaryColor}`)};

    --text-color-light: #999;
    --text-color-alt: var(--primary-color);

    --br: 2px;
    --gutter: 2rem;

    @media screen and (min-width: 990px) {
      --gutter: 4rem;
    }
    @media screen and (min-width: 1920px) {
      --max-width: 72%;
      --fs-root: .5vw;
    }
    @media print {
      --bg-color: var(--white);
      --bg-color-alt: var(--lightgrey);
      --border-color: var(--grey);
      --text-color: var(--black);
      --nprogress-bar: var(--primary-color);
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
    font-size: var(--fs-root);
    transition: background-color var(--transition),
                border-color var(--transition);
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
    color-adjust: exact !important;
    -webkit-print-color-adjust: exact !important;
  }

  @media print {
    @page {
      padding: 0;
      margin: 3rem;
      border: none;
      border-collapse: collapse;
    }
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
