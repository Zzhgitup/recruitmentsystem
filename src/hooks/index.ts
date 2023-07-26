import { useEffect, useState, useRef, useCallback } from 'react';
export const useDebounce = <V>(value: V, delay?: number): V => {
  const [debounceValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    // 每次在value变化以后设置一个定时器
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    // 每次在上一个useEffect处理完以后再运行(这里返回的一个函数会执行当前 effect 之前对上一个 effect 进行清除)
    return () => clearTimeout(timeout);
  }, [value, delay]);
  return debounceValue;
};
//函数防抖

type DebouncedFunction<T extends any[]> = (...args: T) => void;

interface DebounceOptions {
  delay: number;
  leading?: boolean;
}

export function useFunDebounce<T extends any[]>(
  fn: (...args: T) => void,
  options: DebounceOptions = { delay: 300 }
): DebouncedFunction<T> {
  const { delay, leading = true } = options;

  const current = useRef<{ fn: (...args: T) => void; timer: NodeJS.Timeout | null }>({
    fn,
    timer: null
  });

  const debouncedFn = useCallback(
    (...args: T) => {
      if (current.current.timer) {
        clearTimeout(current.current.timer);
      }

      if (leading && !current.current.timer) {
        current.current.fn.call(null, ...args);
      }

      current.current.timer = setTimeout(() => {
        current.current.timer = null;
        if (!leading) {
          current.current.fn.call(null, ...args);
        }
      }, delay);
    },
    [delay, leading]
  );

  return debouncedFn;
}
export function useMobilorPC() {
  /*   const flag: any = navigator.userAgent.match(
    /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
  ); */
  return window.innerWidth > 768;
}
