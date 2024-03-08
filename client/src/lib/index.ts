export const debounce = <T extends (...args: any) => any>(func: T, waitFor: number = 100) => {
  let timeout: number = 0;
  const debounced = (...args: any) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), waitFor);
  };

  return debounced as (...args: Parameters<T>) => ReturnType<T>;
};
