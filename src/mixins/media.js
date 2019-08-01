import { isObject } from "wtf-is-this";

export default (theme, { useTransient, responsive }) => {
  const options = {
    property: "media",
    handheldPoint: "s",
    breakpoints: {
      xs: 0, // first: mobile
      x: 576, // tablet portrait
      s: 800, // tablet
      m: 1080, // desktop
      l: 1380, // desktop hd
      xl: 1680 // last desktop wide
    },
    ...responsive
  };

  const { breakpoints, handheldPoint } = options;

  const property = useTransient ? `$${options.property}` : options.property;

  let mediaQueries = {};

  let keys = Object.keys(breakpoints);

  keys.forEach((key, idx) => {
    const isFirst = idx == 0;
    const isLast = idx == keys.length - 1;
    const current = breakpoints[key];
    const next = breakpoints[keys[idx + 1]];

    if (isFirst) {
      // first media query
      mediaQueries[key] = css => props => `
        @media screen and (max-width: ${next}px) {
          ${css}; 
        }
      `;
    } else if (isLast) {
      // last media query
      mediaQueries[key] = css => props => `
        @media screen and (min-width: ${current}px) { 
          ${css}; 
        }
      `;
    } else {
      // middle media queries
      mediaQueries[key] = css => props => `
        @media screen and (min-width: ${current}px) and (max-width: ${next}px) { 
          ${css}; 
        }
      `;
    }
  });

  // helpers

  mediaQueries.retina = css => props => `
    @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
      ${css};
    }
  `;

  mediaQueries.handheld = css => props => `
    @media screen and (max-width: ${breakpoints[handheldPoint]}px) { ${css}; }
  `;

  mediaQueries.range = (breakpoints = []) => css => props => {
    return breakpoints
      .map(key => {
        return mediaQueries[key](css)(props);
      })
      .join("");
  };

  mediaQueries.responsive = func => props => {
    if (isObject(props[property])) {
      return Object.keys(props[property])
        .map(key => {
          return func(key, props.theme);
        })
        .join("");
    }
    return "";
  };

  return mediaQueries;
};
