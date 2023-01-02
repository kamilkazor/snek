import React, { useEffect } from "react";

function useInterval(callback: Function, speed: number, running: boolean) {
  useEffect(() => {
    if (!running) return;
    const interval = setInterval(callback, speed);
    return () => {
      clearInterval(interval);
    };
  }, [running, speed]);
}

export default useInterval;
