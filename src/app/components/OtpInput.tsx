import { useRef, KeyboardEvent, ClipboardEvent } from "react";

interface OtpInputProps {
  value: string;
  onChange: (val: string) => void;
  hasError?: boolean;
  length?: number;
}

export function OtpInput({ value, onChange, hasError = false, length = 6 }: OtpInputProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const digits = value.split("").concat(Array(length).fill("")).slice(0, length);

  const focusAt = (index: number) => {
    const el = inputRefs.current[index];
    if (el) {
      el.focus();
      // Place cursor at end
      setTimeout(() => el.setSelectionRange(1, 1), 0);
    }
  };

  const handleChange = (index: number, raw: string) => {
    // Accept only last digit typed (handles autofill too)
    const digit = raw.replace(/\D/g, "").slice(-1);
    const arr = digits.map((d) => d);
    arr[index] = digit;
    const newVal = arr.join("").slice(0, length);
    onChange(newVal);
    if (digit && index < length - 1) {
      focusAt(index + 1);
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      if (digits[index]) {
        // Clear current
        const arr = digits.map((d) => d);
        arr[index] = "";
        onChange(arr.join(""));
      } else if (index > 0) {
        // Move to previous and clear it
        const arr = digits.map((d) => d);
        arr[index - 1] = "";
        onChange(arr.join(""));
        focusAt(index - 1);
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      focusAt(index - 1);
    } else if (e.key === "ArrowRight" && index < length - 1) {
      focusAt(index + 1);
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
    onChange(pasted);
    const nextFocus = Math.min(pasted.length, length - 1);
    focusAt(nextFocus);
  };

  const handleFocus = (index: number) => {
    // On focus, select existing content so typing replaces it
    const el = inputRefs.current[index];
    if (el) el.select();
  };

  return (
    <div className="flex gap-2 justify-center">
      {digits.map((digit, i) => (
        <input
          key={i}
          ref={(el) => { inputRefs.current[i] = el; }}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={1}
          value={digit}
          autoComplete="one-time-code"
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onPaste={handlePaste}
          onFocus={() => handleFocus(i)}
          className={`w-11 h-12 min-w-11 min-h-11 rounded-xl border text-center text-xl font-black font-mono transition-colors focus:outline-none caret-transparent rim-light
            ${
              hasError
                ? "border-red-500 bg-bg-surface text-red-400"
                : digit
                ? "border-brand-blue bg-bg-surface text-brand-blue-text"
                : "border-border bg-bg-base text-text-primary"
            }
            focus:ring-2 focus:ring-brand-blue focus:border-brand-blue`}
        />
      ))}
    </div>
  );
}
