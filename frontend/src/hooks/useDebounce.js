import { useEffect, useState } from "react";

export const useDebounce = ({ val, delay }) => {
  const [debouncedVal, setDebouncedVal] = useState(val);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedVal(val);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [val, delay]);

  return debouncedVal;
};

export default useDebounce;
