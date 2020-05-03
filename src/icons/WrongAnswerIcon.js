import React from 'react';
import styled from 'styled-components';

const SVG = styled.svg`
  height: 4rem;
  width: 4rem;

  .fa-primary {
    fill: white;
  }

  .fa-secondary {
    fill: #ff0000;
  }
`;

export default function WrongAnswerIcon() {
  return (
    <SVG
      className="svg-inline--fa fa-times-circle fa-w-16"
      viewBox="0 0 512 512"
    >
      <g className="fa-group">
        <path
          className="fa-secondary"
          d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1a12 12 0 0 1 0 17L338 377.6a12 12 0 0 1-17 0L256 312l-65.1 65.6a12 12 0 0 1-17 0L134.4 338a12 12 0 0 1 0-17l65.6-65-65.6-65.1a12 12 0 0 1 0-17l39.6-39.6a12 12 0 0 1 17 0l65 65.7 65.1-65.6a12 12 0 0 1 17 0l39.6 39.6a12 12 0 0 1 0 17L312 256z"
        ></path>
        <path
          className="fa-primary"
          d="M377.6 321.1a12 12 0 0 1 0 17L338 377.6a12 12 0 0 1-17 0L256 312l-65.1 65.6a12 12 0 0 1-17 0L134.4 338a12 12 0 0 1 0-17l65.6-65-65.6-65.1a12 12 0 0 1 0-17l39.6-39.6a12 12 0 0 1 17 0l65 65.7 65.1-65.6a12 12 0 0 1 17 0l39.6 39.6a12 12 0 0 1 0 17L312 256z"
        ></path>
      </g>
    </SVG>
  );
}
