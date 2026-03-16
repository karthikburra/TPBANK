import { useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  User,
  MapPin,
  Mail,
  CheckCircle,
  ChevronRight,
  Smartphone,
  Calendar,
  Pencil,
  RefreshCw,
} from "lucide-react";
import { OtpInput } from "./OtpInput";

// Mock data fetched from Aadhar
const AADHAR_DATA = {
  fullName: "Rajesh Kumar Sharma",
  age: 32,
  dob: "14 Aug 1993",
  address: "47/2, MG Road, Koramangala, Bangalore, Karnataka – 560 034",
  gender: "Male",
  aadhar: "XXXX XXXX 7821",
};

type EmailStep = "input" | "otp" | "verified";

export function UserDetails() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [emailStep, setEmailStep] = useState<EmailStep>("input");
  const [emailOtp, setEmailOtp] = useState("");
  const [emailError, setEmailError] = useState("");
  const [otpError, setOtpError] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(false);
  const [resendCount, setResendCount] = useState(0);

  const validateEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

  const handleSendOtp = () => {
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }
    setEmailError("");
    setEmailOtp("");
    setOtpError(false);
    setEmailStep("otp");
  };

  const handleChangeEmail = () => {
    setEmailOtp("");
    setOtpError(false);
    setEmailStep("input");
  };

  const handleResendOtp = () => {
    if (resendCooldown) return;
    setEmailOtp("");
    setOtpError(false);
    setResendCount((c) => c + 1);
    setResendCooldown(true);
    setTimeout(() => setResendCooldown(false), 30000);
  };

  const handleVerifyEmailOtp = () => {
    if (emailOtp.length !== 6) {
      setOtpError(true);
      return;
    }
    setOtpError(false);
    setEmailStep("verified");
  };

  const handleContinue = () => {
    navigate("/home");
  };

  return (
    <div className="min-h-screen bg-bg-base text-text-primary flex items-start justify-center px-4 py-8">
      <div className="w-full max-w-sm">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 mb-6"
        >
          <div className="w-8 h-8 rounded-xl rim-light bg-bg-surface flex items-center justify-center overflow-hidden">
            <img
              src="/tp-logo.png.png"
              alt="TP Bank"
              className="w-6 h-6 object-contain"
            />
          </div>
          <span className="text-text-primary font-black text-xl tracking-wide">
            TP<span className="text-brand-blue-text">Bank</span>
          </span>
          <span className="ml-auto text-brand-blue-text text-xs font-semibold bg-brand-blue/20 px-3 py-1 rounded-full">
            Step 2 of 3
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="text-text-primary font-black text-2xl mb-1"
        >
          Your Details
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="text-text-secondary text-sm mb-5"
        >
          Fetched from your Aadhar record
        </motion.p>

        {/* Aadhar Details Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="tp-card p-5 shadow-2xl mb-4"
        >
            <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-xl rim-light bg-bg-base flex items-center justify-center">
              <CheckCircle className="w-4 h-4 text-status-success" />
            </div>
            <span className="text-text-secondary text-sm font-semibold">
              Aadhar Verified Details
            </span>
          </div>

          {/* Avatar + Name */}
          <div className="flex items-center gap-3 mb-4 pb-4 border-b border-white/5">
            <div className="w-14 h-14 rounded-2xl rim-light bg-brand-blue flex items-center justify-center shadow-md">
              <span className="text-white font-black text-xl">
                {AADHAR_DATA.fullName.charAt(0)}
              </span>
            </div>
            <div>
              <p className="text-text-primary font-black text-lg leading-tight">
                {AADHAR_DATA.fullName}
              </p>
              <p className="text-text-secondary text-xs">
                {AADHAR_DATA.gender} · Aadhar: {AADHAR_DATA.aadhar}
              </p>
            </div>
          </div>

          {/* Details Grid */}
          <div className="space-y-3">
            <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl rim-light bg-bg-base flex items-center justify-center flex-shrink-0 mt-0.5">
              <Calendar className="w-4 h-4 text-brand-blue" />
              </div>
              <div>
                <p className="text-text-secondary text-xs">Date of Birth · Age</p>
                <p className="text-text-primary font-semibold text-sm">
                  {AADHAR_DATA.dob} · {AADHAR_DATA.age} Years
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl rim-light bg-bg-base flex items-center justify-center flex-shrink-0 mt-0.5">
                <MapPin className="w-4 h-4 text-accent-pink" />
              </div>
              <div>
                <p className="text-text-secondary text-xs">Registered Address</p>
                <p className="text-text-primary font-semibold text-sm leading-snug">
                  {AADHAR_DATA.address}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl rim-light bg-bg-base flex items-center justify-center flex-shrink-0 mt-0.5">
                <User className="w-4 h-4 text-accent-yellow" />
              </div>
              <div>
                <p className="text-text-secondary text-xs">Account Type</p>
                <p className="text-text-primary font-semibold text-sm">
                  Zero Balance Savings Account
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Email Verification Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="tp-card p-5 shadow-2xl"
        >
            <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-xl rim-light bg-bg-base flex items-center justify-center">
              <Mail className="w-4 h-4 text-brand-blue" />
            </div>
            <span className="text-text-primary font-bold text-sm">
              Email Verification
            </span>
            {emailStep === "verified" && (
              <CheckCircle className="w-4 h-4 text-status-success ml-auto" />
            )}
          </div>

          <AnimatePresence mode="wait">
            {/* ── STEP: Email Input ── */}
            {emailStep === "input" && (
              <motion.div
                key="email-input"
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 15 }}
              >
                <label className="text-xs text-text-secondary font-semibold uppercase tracking-wider">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="yourname@email.com"
                  value={email}
                  autoFocus
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailError("");
                  }}
                  className="mt-2 w-full rounded-2xl px-4 py-3 text-sm text-text-primary bg-bg-surface border border-white/5 rim-light placeholder:text-text-secondary/40 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-brand-blue transition-all"
                />
                {emailError && (
                  <p className="text-red-400 text-xs mt-1.5">{emailError}</p>
                )}
                <button
                  onClick={handleSendOtp}
                  className="mt-4 w-full tp-button-primary animate-ambient-breath font-bold flex items-center justify-center gap-2 active:scale-95 transition-transform text-sm"
                >
                  Send Verification OTP
                  <ChevronRight className="w-4 h-4" />
                </button>
              </motion.div>
            )}

            {/* ── STEP: OTP Entry ── */}
            {emailStep === "otp" && (
              <motion.div
                key="email-otp"
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
              >
                {/* Email being verified + change option */}
                <div className="flex items-center justify-between bg-bg-base rounded-2xl px-3 py-2.5 mb-4 rim-light">
                  <div className="flex items-center gap-2 min-w-0">
                    <Mail className="w-4 h-4 text-brand-blue flex-shrink-0" />
                    <span className="text-text-primary text-xs font-semibold truncate">
                      {email}
                    </span>
                  </div>
                  <button
                    onClick={handleChangeEmail}
                    className="flex items-center gap-1 text-brand-blue-text text-xs font-black ml-2 flex-shrink-0 bg-bg-surface rounded-xl px-2.5 py-1.5 rim-light active:scale-95 transition-transform"
                  >
                    <Pencil className="w-3 h-3" />
                    Change
                  </button>
                </div>

                <p className="text-text-secondary text-xs text-center mb-3">
                  Enter the 6-digit OTP sent to your email
                </p>

                {/* OTP Boxes */}
                <OtpInput
                  value={emailOtp}
                  onChange={(val) => {
                    setEmailOtp(val);
                    setOtpError(false);
                  }}
                  hasError={otpError}
                />

                {otpError && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-xs text-center mt-2"
                  >
                    Please enter the complete 6-digit OTP
                  </motion.p>
                )}

                <p className="text-xs text-text-secondary text-center mt-2">
                  Demo OTP:{" "}
                  <span className="font-black text-text-primary tracking-widest font-mono">
                    1 2 3 4 5 6
                  </span>
                </p>

                {/* Verify Button */}
                <button
                  onClick={handleVerifyEmailOtp}
                  className="mt-4 w-full tp-button-primary animate-ambient-breath font-bold flex items-center justify-center gap-2 active:scale-95 transition-transform text-sm"
                >
                  <Smartphone className="w-4 h-4" />
                  Verify OTP
                </button>

                {/* Resend + Change row */}
                <div className="flex items-center justify-between mt-3">
                  <button
                    onClick={handleResendOtp}
                    disabled={resendCooldown}
                    className={`flex items-center gap-1 text-xs font-semibold transition-colors ${
                      resendCooldown
                        ? "text-text-secondary/40 cursor-not-allowed"
                        : "text-brand-blue-text active:scale-95"
                    }`}
                  >
                    <RefreshCw
                      className={`w-3.5 h-3.5 ${resendCooldown ? "animate-spin" : ""}`}
                    />
                    {resendCooldown ? "Resend in 30s" : "Resend OTP"}
                  </button>

                  <button
                    onClick={handleChangeEmail}
                    className="flex items-center gap-1 text-xs font-semibold text-text-secondary active:scale-95 transition-transform"
                  >
                    <Pencil className="w-3 h-3" />
                    Change Email ID
                  </button>
                </div>
              </motion.div>
            )}

            {/* ── STEP: Verified ── */}
            {emailStep === "verified" && (
              <motion.div
                key="email-verified"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="flex items-center gap-3 bg-bg-base rounded-2xl px-4 py-3 mb-4 rim-light">
                  <CheckCircle className="w-5 h-5 text-status-success flex-shrink-0" />
                  <div>
                    <p className="text-status-success font-semibold text-sm">
                      Email Verified!
                    </p>
                    <p className="text-brand-blue-text text-xs">{email}</p>
                  </div>
                </div>
                <button
                  onClick={handleContinue}
                  className="w-full tp-button-primary animate-ambient-breath bg-status-success text-text-primary py-4 font-bold flex items-center justify-center gap-2 active:scale-95 transition-transform"
                >
                  Open My Account
                  <ChevronRight className="w-4 h-4" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <div className="h-8" />
      </div>
    </div>
  );
}
