import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import {
  Shield,
  CheckCircle,
  ChevronRight,
  Smartphone,
  Sun,
  Moon,
} from "lucide-react";
import { OtpInput } from "./OtpInput";

type Step = "aadhar" | "otp" | "verified";

export function AadharVerification() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("aadhar");
  const [aadhar, setAadhar] = useState("");
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState(false);
  const [aadharError, setAadharError] = useState("");

  // Local theme state so the first screen also has a toggle
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const stored = window.localStorage.getItem("tp-theme");
    const initial: "dark" | "light" =
      stored === "light" || stored === "dark" ? stored : "dark";
    setTheme(initial);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("dark", "light");
    root.classList.add(theme);
    window.localStorage.setItem("tp-theme", theme);
  }, [theme]);

  const formatAadhar = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 12);
    return digits.replace(/(\d{4})(\d{4})(\d{0,4})/, (_, a, b, c) =>
      c ? `${a} ${b} ${c}` : b ? `${a} ${b}` : a
    );
  };

  const handleAadharChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAadhar(formatAadhar(e.target.value));
    setAadharError("");
  };

  const handleGetOtp = () => {
    const digits = aadhar.replace(/\s/g, "");
    if (digits.length !== 12) {
      setAadharError("Please enter a valid 12-digit Aadhar number");
      return;
    }
    setStep("otp");
  };

  const handleVerifyOtp = () => {
    if (otp.length !== 6) {
      setOtpError(true);
      return;
    }
    setOtpError(false);
    setStep("verified");
    setTimeout(() => navigate("/details"), 1500);
  };

  return (
    <div className="min-h-screen bg-bg-base text-text-primary flex items-center justify-center px-4">
      {/* Theme toggle – visible on first screen */}
      <button
        type="button"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="fixed right-4 top-4 z-50 flex items-center gap-1 rounded-full px-3 py-1.5 text-[11px] font-medium rim-light bg-bg-surface/90 text-text-secondary border border-border backdrop-blur"
        aria-label="Toggle light/dark mode"
      >
        {theme === "dark" ? (
          <>
            <Moon className="w-3.5 h-3.5" />
            <span>Dark</span>
          </>
        ) : (
          <>
            <Sun className="w-3.5 h-3.5" />
            <span>Light</span>
          </>
        )}
      </button>
      <div className="w-full max-w-sm">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center gap-2 mb-6"
        >
          <img
            src="/tp-logo.png.png"
            alt="TP Bank"
            className="w-12 h-12 object-contain"
          />
          <span className="text-text-primary font-black text-2xl tracking-wide">
            TP<span className="text-brand-blue-text">Bank</span>
          </span>
        </motion.div>

        {/* Illustration / hero */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 6 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative w-full rounded-[32px] overflow-hidden mb-4 rim-light"
          style={{
            background: "radial-gradient(circle at 0% 0%, rgba(129,140,248,0.35), transparent 55%), radial-gradient(circle at 100% 0%, rgba(244,114,182,0.3), transparent 60%), radial-gradient(circle at 100% 100%, rgba(79,70,229,0.6), transparent 55%)",
          }}
        >
          <div className="w-full flex items-center justify-center bg-[color:var(--KDS-color-surface-default)]/80">
            <img
              src="/aadhar-hero.png.png"
              alt="Secure Aadhar verification illustration"
              className="w-full h-auto object-contain"
            />
          </div>
        </motion.div>

        {/* Step pill — matches Figma "Step 1 of 3 — Aadhar Verification" */}
        <div className="flex flex-col items-center gap-2 mb-4">
          <div
            className="inline-flex items-center justify-center px-4 py-1 rim-light"
            style={{
              borderRadius: "var(--KDS-radius-pill)",
              backgroundColor: "var(--KDS-color-surface-default)",
            }}
          >
            <span
              className="text-[11px] font-medium tracking-[0.18em] uppercase"
              style={{ color: "var(--KDS-color-brand-primary)" }}
            >
              Step 1 of 3 — Aadhar Verification
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-blue" />
            <span className="w-2 h-2 rounded-full bg-text-secondary/40" />
            <span className="w-2 h-2 rounded-full bg-text-secondary/20" />
          </div>
        </div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="tp-card p-6 shadow-2xl"
          style={{
            backgroundColor: "var(--KDS-color-surface-default)",
            borderColor: "var(--KDS-color-border-subtle)",
          }}
        >
          {step === "aadhar" && (
            <div>
              <div className="flex items-center gap-3 mb-1">
                <div className="w-10 h-10 rounded-2xl rim-light bg-bg-base flex items-center justify-center">
                  <Shield className="w-5 h-5 text-brand-blue" />
                </div>
                <div>
                  <h2
                    className="font-black text-xl tracking-tight"
                    style={{ color: "var(--KDS-color-text-primary)" }}
                  >
                    Verify Your Aadhar
                  </h2>
                  <p
                    className="text-xs"
                    style={{ color: "var(--KDS-color-text-secondary)" }}
                  >
                    Enter your 12-digit Aadhar number to continue
                  </p>
                </div>
              </div>

              <div className="mt-5">
                <label
                  className="text-xs font-semibold uppercase tracking-wider"
                  style={{ color: "var(--KDS-color-text-secondary)" }}
                >
                  Aadhar Number
                </label>
                <div className="mt-2 relative">
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="1234 5678 9012"
                    value={aadhar}
                    onChange={handleAadharChange}
                    className="w-full rounded-2xl px-4 py-3.5 text-lg tracking-[0.3em] rim-light focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-brand-blue transition-all"
                    style={{
                      color: "var(--KDS-color-text-primary)",
                      backgroundColor: "var(--KDS-color-surface-default)",
                      borderWidth: 2,
                      borderColor: "var(--KDS-color-brand-primary)",
                    }}
                  />
                </div>
                {aadharError && (
                  <p className="text-red-400 text-xs mt-1.5">{aadharError}</p>
                )}
              </div>

              <p
                className="text-[11px] mt-3 text-center"
                style={{ color: "var(--KDS-color-text-secondary)" }}
              >
                OTP will be sent to your Aadhar-linked mobile number
              </p>

              <button
                onClick={handleGetOtp}
                className="mt-4 w-full tp-button-primary animate-ambient-breath active:scale-95 transition-transform"
              >
                Get OTP
                <ChevronRight className="w-4 h-4" />
              </button>

              <p className="text-[11px] text-text-secondary mt-3 text-center">
                🔒 Your data is end-to-end encrypted
              </p>
            </div>
          )}

          {step === "otp" && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
                <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-2xl rim-light bg-bg-base flex items-center justify-center">
                  <Smartphone className="w-5 h-5 text-brand-blue" />
                </div>
                <div>
                  <h2 className="text-text-primary font-black text-lg">
                    Enter OTP
                  </h2>
                  <p className="text-text-secondary text-xs">
                    Sent to ••••• {aadhar.replace(/\s/g, "").slice(-4) || "XXXX"}
                  </p>
                </div>
              </div>

              <OtpInput
                value={otp}
                onChange={(val) => {
                  setOtp(val);
                  setOtpError(false);
                }}
                hasError={otpError}
              />

              {otpError && (
                <p className="text-red-400 text-xs text-center mt-2">
                  Please enter the 6-digit OTP
                </p>
              )}

              <p className="text-xs text-text-secondary text-center mt-2">
                Demo OTP:{" "}
                <span className="font-black text-text-primary tracking-widest font-mono">
                  1 2 3 4 5 6
                </span>
              </p>

              <button
                onClick={handleVerifyOtp}
                className="mt-4 w-full tp-button-primary animate-ambient-breath active:scale-95 transition-transform"
              >
                Verify OTP
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setStep("aadhar")}
                className="mt-3 w-full text-text-secondary text-sm py-2"
              >
                ← Change Aadhar Number
              </button>
            </motion.div>
          )}

          {step === "verified" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center py-4"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <CheckCircle className="w-16 h-16 text-status-success" />
              </motion.div>
              <h2 className="text-text-primary font-black text-xl mt-3">
                Identity Verified!
              </h2>
              <p className="text-text-secondary text-sm mt-1 text-center">
                Your Aadhar has been successfully verified
              </p>
              <div className="mt-4 w-full bg-bg-base rounded-full h-1.5 overflow-hidden rim-light">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.3 }}
                  className="h-full bg-status-success rounded-full"
                />
              </div>
              <p className="text-xs text-text-secondary mt-2">
                Redirecting to next step…
              </p>
            </motion.div>
          )}
        </motion.div>

        {/* Steps indicator */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {["aadhar", "otp", "verified"].map((s, i) => (
            <div
              key={s}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                step === s
                  ? "w-8 bg-blue-400"
                  : i < ["aadhar", "otp", "verified"].indexOf(step)
                  ? "w-4 bg-blue-300"
                  : "w-4 bg-white/20"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}