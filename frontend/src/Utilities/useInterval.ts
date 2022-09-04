import { useEffect, useRef } from 'react';

/* From:
   https://blog.bitsrc.io/polling-in-react-using-the-useinterval-custom-hook-e2bcefda4197 */
export default function useInterval(callback:Function, delay:number) {
  const savedCallback = useRef<Function>();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      if(savedCallback.current) savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}