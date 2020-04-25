import React, { memo } from 'react';

const LoadingIcon = memo(() => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    style={{ margin: 'auto', background: '0 0' }}
    width="200"
    height="200"
    viewBox="0 0 100 100"
    preserveAspectRatio="xMidYMid"
    display="block"
  >
    <g transform="matrix(.8 0 0 .8 10 2)">
      <polygon fill="#f4b350" points="73 50 50 11 28 50 50 50" transform="rotate(254 50 39)">
        <animateTransform
          attributeName="transform"
          type="rotate"
          repeatCount="indefinite"
          dur="1s"
          values="0 50 38.5;360 50 38.5"
          keyTimes="0;1"
        />
      </polygon>
      <polygon fill="#f9690e" points="5 89 50 89 28 50" transform="rotate(254 28 78)">
        <animateTransform
          attributeName="transform"
          type="rotate"
          repeatCount="indefinite"
          dur="1s"
          values="0 27.5 77.5;360 27.5 77.5"
          keyTimes="0;1"
        />
      </polygon>
      <polygon fill="tomato" points="73 50 50 89 95 89" transform="rotate(254 72 78)">
        <animateTransform
          attributeName="transform"
          type="rotate"
          repeatCount="indefinite"
          dur="1s"
          values="0 72.5 77.5;360 72 77.5"
          keyTimes="0;1"
        />
      </polygon>
    </g>
  </svg>
));

export default LoadingIcon;
