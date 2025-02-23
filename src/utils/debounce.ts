export const debounce = <T extends (...args: Parameters<T>) => void>(
  func: T,
  delay: number
) => {
  let timeoutId: ReturnType<typeof setTimeout>;

  return (...args: Parameters<T>): void => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};