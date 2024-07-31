import { useEffect, useState } from "react";
import { useDibs } from "./Dibs/useDibs";

export default function useEpochTimer() {
  const { startTimestamp } = useDibs();

  const [epochTimer, setEpochTimer] = useState({
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  const [now, setNow] = useState(new Date().getTime() / 1000);

  useEffect(() => {
    if (startTimestamp) {
      const nextEpoch =
        startTimestamp + Math.ceil((now - startTimestamp) / 86400) * 86400;
      const hours = Math.floor((nextEpoch - now) / 3600);
      const minutes = Math.floor((nextEpoch - now - hours * 3600) / 60);
      const seconds = Math.floor(nextEpoch - now - hours * 3600 - minutes * 60);
      setEpochTimer({
        hours: hours < 10 ? "0" + hours : String(hours),
        minutes: minutes < 10 ? "0" + minutes : String(minutes),
        seconds: seconds < 10 ? "0" + seconds : String(seconds),
      });
    }
  }, [now, startTimestamp]);

  useEffect(() => {
    const interval = setInterval(
      () => setNow(new Date().getTime() / 1000),
      1000
    );
    return () => {
      clearInterval(interval);
    };
  }, []);

  return epochTimer;
}
