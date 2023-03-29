export const debounce = (callback: any, time: number) => {
  let timer: any;
  return (...args: any) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback(...args);
    }, time);
  };
};
