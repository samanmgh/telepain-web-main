import {useState, useEffect} from 'react';

const breakpoints = {
  sm: '480px',
  md: '768px',
  lg: '976px',
  xl: '1440px'
};

const useBreakpoints = () => {
  const [breakpointsState, setBreakpointsState] = useState({
    isSm: false,
    isMd: false,
    isLg: false,
    isXl: false,
  });

  useEffect(() => {
    if (window) {
      handleMediaQueryChange();
      Object.values(mediaQueries(window)).forEach(mq => mq.addEventListener("change", handleMediaQueryChange));
    }
    return () => {
      Object.values(mediaQueries(window)).forEach(mq => mq.addEventListener("change", handleMediaQueryChange));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const mediaQueries = (window: any) => {
    return {
      sm: window.matchMedia(`(max-width: ${breakpoints.sm})`),
      md: window.matchMedia(`(min-width: ${breakpoints.sm}) and (max-width: ${breakpoints.md})`),
      lg: window.matchMedia(`(min-width: ${breakpoints.md}) and (max-width: ${breakpoints.lg})`),
      xl: window.matchMedia(`(min-width: ${breakpoints.lg})`)
    };
  };
  const handleMediaQueryChange = () => {
    const isXl = mediaQueries(window).xl.matches;
    const isLg = mediaQueries(window).lg.matches || isXl;
    const isMd = mediaQueries(window).md.matches || isLg;
    const isSm = mediaQueries(window).sm.matches || isMd;

    setBreakpointsState({isSm, isMd, isLg, isXl});
  };

  return breakpointsState;
};

export default useBreakpoints;

export const dateOptions: { [key: string]: "numeric" } = {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
};

export const timeOptions: { [key: string]: "numeric" } = {
  hour: 'numeric',
  minute: 'numeric',
};

export const thousandMask = (number: string) => {
  const spl = number && number.split(".");
  if (spl && spl[1]) {
    return numberWithCommas(spl[0]) + "." + spl[1];
  } else {
    return numberWithCommas(number);
  }
};

export const numberWithCommas = (number: string) => {
  return number && number.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const dateConvertor = (date: string, locale: string) => {
  const d = new Date(date);
  return new Intl.DateTimeFormat(locale, {dateStyle: 'medium', timeStyle: 'short'}).format(d)
}