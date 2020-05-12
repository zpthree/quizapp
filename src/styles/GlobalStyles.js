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
    --charcoal: #0e0e0e;
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

    ${({ theme }) => {
      if (theme === 'dark') {
        return `
        --bg-color: var(--black);
        --bg-color-alt: var(--charcoal);
        --border-color: var(--charcoal);
        --text-color: var(--white);
        --nprogress-bar: var(--white);
        `;
      }

      return `
      --bg-color: var(--white);
      --bg-color-alt: var(--lightgrey);
      --border-color: var(--grey);
      --text-color: var(--black);
      --nprogress-bar: var(--white);
      `;
    }};

    --bg-color: ${({ route }) => route === '/' && 'var(--primary-color)'};

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

  .btn {
    padding: 0.75rem 1.5rem;
    border-radius: var(--br);
    margin-top: 1rem;
    display: inline-block;
    border: none;
    outline: none;
    font-size: var(--fs-base);
    cursor: pointer;
    transition: var(--transition-none);
    background-color: var(--background-color);
  }

  .btn.btn--submit {
    --background-color: var(--primary-color);
    color: var(--white);

    &[aria-disabled='true'] {
      --background-color: var(--primary-color-light);
      opacity: 0.4;
      cursor: default;
    }

    &:not([aria-disabled='true']):hover {
      --background-color: var(--primary-color-light);
      color: var(--white);
    }
  }

  .btn.btn--cancel {
    --background-color: var(--grey);

    &:hover {
      --background-color: var(--text-color);
      color: var(--bg-color);
    }
  }
`;
