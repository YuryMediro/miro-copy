import { useEffect, useState } from "react";

export const useVisible = (initial: boolean) => {
  const [visible, setVisible] = useState<boolean>(initial);

  const handleOnClick = () => {
    setVisible((prev) => !prev);
  };

  return { visible, handleOnClick };
};

export const useConfirmPasswordVisible = (initial: boolean) => {
  const [visible, setVisible] = useState<boolean>(initial);

  const handleOnClick = () => {
    setVisible((prev) => !prev);
  };
  return { visible, handleOnClick };
};

export function useDebounce<T>(value: T, delay: number) {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounceValue(value), delay);

    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounceValue;
}
