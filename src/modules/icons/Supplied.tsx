import { Icon, IconProps } from './Icon';

export const Supplied = (props: IconProps) => (
  <Icon width="64" height="64" viewBox="0 0 64 64" {...props}>
    <ellipse cx="32" cy="45" rx="24" ry="13" fill="url(#paint0_linear_1154_19823)" />
    <ellipse
      cx="24"
      cy="13"
      rx="24"
      ry="13"
      transform="matrix(1 0 0 -1 8 45)"
      fill="url(#paint1_linear_1154_19823)"
    />
    <ellipse
      cx="24"
      cy="13"
      rx="24"
      ry="13"
      transform="matrix(1 0 0 -1 8 32)"
      fill="url(#paint2_linear_1154_19823)"
    />
    <mask id="mask0_1154_19823" maskUnits="userSpaceOnUse" x="8" y="6" width="48" height="26">
      <ellipse
        cx="24"
        cy="13"
        rx="24"
        ry="13"
        transform="matrix(1 0 0 -1 8 32)"
        fill="url(#paint3_linear_1154_19823)"
      />
    </mask>
    <g mask="url(#mask0_1154_19823)">
      <g filter="url(#filter0_f_1154_19823)">
        <ellipse
          cx="24"
          cy="14.5"
          rx="24"
          ry="14.5"
          transform="matrix(1 0 0 -1 8 45)"
          fill="url(#paint4_linear_1154_19823)"
        />
      </g>
    </g>
    <defs>
      <filter
        id="filter0_f_1154_19823"
        x="-2"
        y="6"
        width="68"
        height="49"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="5" result="effect1_foregroundBlur_1154_19823" />
      </filter>
      <linearGradient
        id="paint0_linear_1154_19823"
        x1="8"
        y1="46"
        x2="56"
        y2="46"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#A4E6E6" />
        <stop offset="0.326775" stopColor="#97B8F8" />
        <stop offset="0.849433" stopColor="#B061FF" />
      </linearGradient>
      <linearGradient
        id="paint1_linear_1154_19823"
        x1="0"
        y1="13"
        x2="48"
        y2="13"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#FFCD6B" />
        <stop offset="1" stopColor="#EB5EDF" />
      </linearGradient>
      <linearGradient
        id="paint2_linear_1154_19823"
        x1="24"
        y1="-6"
        x2="24"
        y2="90.5"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#A273FF" />
        <stop offset="1" stopColor="#4331E9" />
      </linearGradient>
      <linearGradient
        id="paint3_linear_1154_19823"
        x1="-6.5"
        y1="15.5"
        x2="56"
        y2="28"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#FFE8D4" />
        <stop offset="1" stopColor="#B68EFF" />
      </linearGradient>
      <linearGradient
        id="paint4_linear_1154_19823"
        x1="19.5"
        y1="17.5"
        x2="36.5"
        y2="31"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#FFCD6B" />
        <stop offset="1" stopColor="#EB5EDF" />
      </linearGradient>
    </defs>
  </Icon>
);
