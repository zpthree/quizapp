import React from 'react';
import styled from 'styled-components';

const SVG = styled.svg`
  height: 4rem;
  width: 4rem;

  .fa-primary {
    fill: white;
  }

  .fa-secondary {
    fill: #00aa00;
  }
`;

export default function CorrectAnswerIcon() {
  return (
    <SVG
      className="svg-inline--fa fa-check-circle fa-w-16"
      viewBox="0 0 512 512"
    >
      <g className="fa-group">
        <path
          className="fa-secondary"
          d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm155.31 195.31l-184 184a16 16 0 0 1-22.62 0l-104-104a16 16 0 0 1 0-22.62l22.62-22.63a16 16 0 0 1 22.63 0L216 308.12l150.06-150.06a16 16 0 0 1 22.63 0l22.62 22.63a16 16 0 0 1 0 22.62z"
        ></path>
        <path
          className="fa-primary"
          d="M227.31 387.31a16 16 0 0 1-22.62 0l-104-104a16 16 0 0 1 0-22.62l22.62-22.63a16 16 0 0 1 22.63 0L216 308.12l150.06-150.06a16 16 0 0 1 22.63 0l22.62 22.63a16 16 0 0 1 0 22.62l-184 184z"
        ></path>
      </g>
    </SVG>
  );
}
