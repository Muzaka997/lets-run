import { useCallback, useRef, useState } from "react";

export type RecorderStatus = "idle" | "recording" | "recorded";

/**
 * Microphone recording via the native MediaRecorder API.
 * Produces a base64 data URL (playable directly by <audio src=…>) so the
 * recording can be persisted as a plain string through GraphQL.
 */
export function useRecorder() {
  const [status, setStatus] = useState<RecorderStatus>("idle");
  const [audioData, setAudioData] = useState<string | null>(null); // data: URL
  const [seconds, setSeconds] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const releaseStream = useCallback(() => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
  }, []);

  const start = useCallback(async () => {
    setError(null);
    // getUserMedia is only exposed on secure origins (https:// or localhost).
    if (typeof window !== "undefined" && window.isSecureContext === false) {
      setError(
        "Recording needs a secure page: open the app over https:// or via localhost (not an http:// LAN IP).",
      );
      return;
    }
    if (!navigator.mediaDevices?.getUserMedia) {
      setError(
        "This browser blocks microphone access here. Try Chrome/Firefox/Safari over https:// or localhost.",
      );
      return;
    }
    if (typeof MediaRecorder === "undefined") {
      setError("This browser doesn't support audio recording (MediaRecorder).");
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      chunksRef.current = [];
      const recorder = new MediaRecorder(stream);
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };
      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, {
          type: recorder.mimeType || "audio/webm",
        });
        const reader = new FileReader();
        reader.onloadend = () => setAudioData(reader.result as string);
        reader.readAsDataURL(blob);
        releaseStream();
        stopTimer();
        setStatus("recorded");
      };
      recorderRef.current = recorder;
      recorder.start();
      setSeconds(0);
      setStatus("recording");
      timerRef.current = setInterval(() => setSeconds((s) => s + 1), 1000);
    } catch (err) {
      const e = err as DOMException;
      // Surface the specific reason so "it doesn't record" is actionable.
      let msg = "Couldn't start recording.";
      if (e?.name === "NotAllowedError" || e?.name === "SecurityError") {
        msg =
          "Microphone permission was denied. Click the mic/lock icon in the address bar, allow access, then try again.";
      } else if (e?.name === "NotFoundError" || e?.name === "OverconstrainedError") {
        msg = "No microphone was found on this device.";
      } else if (e?.name === "NotReadableError") {
        msg = "The microphone is busy — another app may be using it.";
      } else if (e?.message) {
        msg = `Couldn't start recording: ${e.message}`;
      }
      console.error("[recorder] getUserMedia failed:", e?.name, err);
      setError(msg);
      releaseStream();
      setStatus("idle");
    }
  }, [releaseStream, stopTimer]);

  const stop = useCallback(() => {
    if (recorderRef.current && status === "recording") {
      recorderRef.current.stop();
    }
  }, [status]);

  const reset = useCallback(() => {
    if (recorderRef.current && status === "recording") {
      try {
        recorderRef.current.stop();
      } catch {
        /* already stopped */
      }
    }
    stopTimer();
    releaseStream();
    chunksRef.current = [];
    setAudioData(null);
    setSeconds(0);
    setError(null);
    setStatus("idle");
  }, [releaseStream, status, stopTimer]);

  return { status, audioData, seconds, error, start, stop, reset };
}
