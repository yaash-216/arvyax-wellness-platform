import { useEffect, useRef, useState } from "react";
import type { UseAutoSaveOptions } from "../types";

export const useAutoSave = <T>({
  value,
  onSave,
  delay = 5000,
}: UseAutoSaveOptions<T>) => {
  const timer = useRef<number | null>(null);
  const lastSavedRef = useRef<T | null>(null);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">(
    "idle"
  );

  useEffect(() => {
    if (
      lastSavedRef.current &&
      JSON.stringify(lastSavedRef.current) === JSON.stringify(value)
    ) {
      return;
    }
    setStatus("idle");
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(async () => {
      try {
        setStatus("saving");
        await onSave(value);
        lastSavedRef.current = value;
        setStatus("saved");
        setTimeout(() => setStatus("idle"), 1500);
      } catch (err) {
        setStatus("error");
      }
    }, delay);

    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, [value]);

  const manualSave = async () => {
    if (timer.current) window.clearTimeout(timer.current);
    try {
      setStatus("saving");
      await onSave(value);
      lastSavedRef.current = value;
      setStatus("saved");
      setTimeout(() => setStatus("idle"), 1500);
    } catch (err) {
      setStatus("error");
    }
  };

  return { status, manualSave };
};
