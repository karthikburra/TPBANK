import { useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  User,
  MapPin,
  Mail,
  CheckCircle,
  Calendar,
  Pencil,
  RefreshCw,
  Smartphone,
  LogOut,
  ShieldCheck,
  ChevronRight,
  CreditCard,
  X,
} from "lucide-react";
import { OtpInput } from "./OtpInput";

const PROFILE_DATA = {
  fullName: "Rajesh Kumar Sharma",
  age: 32,
  dob: "14 Aug 1993",
  address: "47/2, MG Road, Koramangala, Bangalore, Karnataka – 560 034",
  gender: "Male",
  aadhar: "XXXX XXXX 7821",
  mobile: "+91 98765 43210",
  accountNo: "1234 5678 9012",
  ifsc: "TPBK0001234",
  branch: "Koramangala, Bangalore",
  accountType: "Zero Balance Savings",
};

type EmailStep = "idle" | "input" | "otp" | "verified";

export function ProfilePage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("rajesh.sharma@gmail.com");
  const [newEmail, setNewEmail] = useState("");
  const [emailStep, setEmailStep] = useState<EmailStep>("idle");
  const [emailOtp, setEmailOtp] = useState("");
  const [emailError, setEmailError] = useState("");
  const [otpError, setOtpError] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const validateEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

  const handleSendOtp = () => {
    if (!validateEmail(newEmail)) {
      setEmailError("Please enter a valid email address");
      return;
    }
    setEmailError("");
    setEmailOtp("");
    setOtpError(false);
    setEmailStep("otp");
  };

  const handleVerifyOtp = () => {
    if (emailOtp.length !== 6) {
      setOtpError(true);
      return;
    }
    setEmail(newEmail);
    setNewEmail("");
    setOtpError(false);
    setEmailStep("verified");
    setTimeout(() => setEmailStep("idle"), 2500);
  };

  const handleResendOtp = () => {
    if (resendCooldown) return;
    setEmailOtp("");
    setOtpError(false);
    setResendCooldown(true);
    setTimeout(() => setResendCooldown(false), 30000);
  };

  const handleLogout = () => {
    setShowLogoutConfirm(false);
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-bg-base text-text-primary">
      {/* Header */}
      <div className="bg-bg-base pt-12 pb-20 px-5">
        <div className="max-w-sm mx-auto">
          <p className="text-text-secondary text-xs font-medium mb-1">
            Your Account
          </p>
          <p className="text-text-primary font-black text-xl">Profile</p>
        </div>
      </div>

      <div className="max-w-sm mx-auto px-4 -mt-16 pb-28">

        {/* Avatar + Name Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="tp-card p-5 shadow-xl mb-4"
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl rim-light bg-brand-blue flex items-center justify-center shadow-lg flex-shrink-0">
              <span className="text-text-primary font-black text-2xl">
                {PROFILE_DATA.fullName.charAt(0)}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-text-primary font-black text-lg leading-tight truncate">
                {PROFILE_DATA.fullName}
              </p>
              <p className="text-text-secondary text-xs mt-0.5">
                {PROFILE_DATA.gender} · {PROFILE_DATA.age} yrs
              </p>
              <span className="inline-flex items-center gap-1 mt-1.5 bg-bg-base text-status-success text-xs font-semibold px-2 py-0.5 rounded-full rim-light">
                <ShieldCheck className="w-3 h-3 text-status-success" />
                Aadhar Verified
              </span>
            </div>
          </div>
        </motion.div>

        {/* Personal Details */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className="tp-card p-5 shadow-sm mb-4"
        >
          <p className="text-text-secondary text-xs font-semibold uppercase tracking-wider mb-3">
            Personal Details
          </p>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl rim-light bg-bg-base flex items-center justify-center flex-shrink-0">
                <Calendar className="w-4 h-4 text-brand-blue" />
              </div>
              <div>
                <p className="text-text-secondary text-xs">Date of Birth</p>
                <p className="text-text-primary font-semibold text-sm">
                  {PROFILE_DATA.dob} · {PROFILE_DATA.age} Years
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl rim-light bg-bg-base flex items-center justify-center flex-shrink-0">
                <MapPin className="w-4 h-4 text-accent-pink" />
              </div>
              <div>
                <p className="text-text-secondary text-xs">Registered Address</p>
                <p className="text-text-primary font-semibold text-sm leading-snug">
                  {PROFILE_DATA.address}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl rim-light bg-bg-base flex items-center justify-center flex-shrink-0">
                <Smartphone className="w-4 h-4 text-accent-yellow" />
              </div>
              <div>
                <p className="text-text-secondary text-xs">Mobile Number</p>
                <p className="text-text-primary font-semibold text-sm">
                  {PROFILE_DATA.mobile}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl rim-light bg-bg-base flex items-center justify-center flex-shrink-0">
                <User className="w-4 h-4 text-brand-blue-text" />
              </div>
              <div>
                <p className="text-text-secondary text-xs">Aadhar Number</p>
                <p className="text-text-primary font-semibold text-sm">
                  {PROFILE_DATA.aadhar}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bank Details */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12 }}
          className="tp-card p-5 shadow-sm mb-4"
        >
          <p className="text-text-secondary text-xs font-semibold uppercase tracking-wider mb-3">
            Bank Account
          </p>
          <div className="space-y-3">
            {[
              { label: "Account No.", value: PROFILE_DATA.accountNo },
              { label: "IFSC Code", value: PROFILE_DATA.ifsc },
              { label: "Branch", value: PROFILE_DATA.branch },
              { label: "Account Type", value: PROFILE_DATA.accountType },
            ].map(({ label, value }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl rim-light bg-bg-base flex items-center justify-center flex-shrink-0">
                  <CreditCard className="w-4 h-4 text-brand-blue-text" />
                </div>
                <div>
                  <p className="text-text-secondary text-xs">{label}</p>
                  <p className="text-text-primary font-semibold text-sm">
                    {value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Email Section */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.16 }}
          className="tp-card p-5 shadow-sm mb-4"
        >
          <div className="flex items-center justify-between mb-3">
            <p className="text-text-secondary text-xs font-semibold uppercase tracking-wider">
              Email Address
            </p>
            {emailStep === "idle" && (
              <button
                onClick={() => { setNewEmail(""); setEmailStep("input"); setEmailError(""); }}
                className="flex items-center gap-1 text-brand-blue-text text-xs font-bold bg-bg-base px-3 py-1.5 rounded-xl rim-light active:scale-95 transition-transform"
              >
                <Pencil className="w-3 h-3" />
                Change
              </button>
            )}
            {emailStep !== "idle" && (
              <button
                onClick={() => { setEmailStep("idle"); setNewEmail(""); setEmailError(""); setOtpError(false); }}
                className="text-text-secondary active:scale-95 transition-transform"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Current Email */}
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-xl rim-light bg-bg-base flex items-center justify-center flex-shrink-0">
              <Mail className="w-4 h-4 text-status-success" />
            </div>
            <div>
              <p className="text-text-secondary text-xs">Verified Email</p>
              <p className="text-text-primary font-semibold text-sm">{email}</p>
            </div>
            <CheckCircle className="w-4 h-4 text-status-success ml-auto flex-shrink-0" />
          </div>

          <AnimatePresence mode="wait">
            {/* Input new email */}
            {emailStep === "input" && (
              <motion.div
                key="new-email"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
              >
                <div className="border-t border-gray-100 pt-3">
                  <label className="text-xs text-text-secondary font-semibold">
                    New Email Address
                  </label>
                  <input
                    type="email"
                    autoFocus
                    placeholder="newmail@example.com"
                    value={newEmail}
                    onChange={(e) => { setNewEmail(e.target.value); setEmailError(""); }}
                    className="mt-1.5 w-full rounded-2xl px-4 py-3 text-sm bg-bg-surface border border-white/5 rim-light text-text-primary placeholder:text-text-secondary/40 focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue"
                  />
                  {emailError && (
                    <p className="text-red-400 text-xs mt-1">{emailError}</p>
                  )}
                  <button
                    onClick={handleSendOtp}
                    className="mt-3 w-full tp-button-primary animate-ambient-breath text-sm flex items-center justify-center gap-2 active:scale-95 transition-transform"
                  >
                    Send OTP
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* OTP verification */}
            {emailStep === "otp" && (
              <motion.div
                key="otp-verify"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
              >
                <div className="border-t border-gray-100 pt-3">
                  <div className="flex items-center justify-between bg-bg-base rounded-2xl px-3 py-2.5 mb-3 rim-light">
                    <div className="flex items-center gap-2 min-w-0">
                      <Mail className="w-4 h-4 text-brand-blue flex-shrink-0" />
                      <span className="text-text-primary text-xs font-semibold truncate">
                        {newEmail}
                      </span>
                    </div>
                    <button
                      onClick={() => setEmailStep("input")}
                      className="flex items-center gap-1 text-brand-blue-text text-xs font-black ml-2 flex-shrink-0 bg-bg-surface rounded-xl px-2.5 py-1.5 rim-light active:scale-95 transition-transform"
                    >
                      <Pencil className="w-3 h-3" />
                      Change
                    </button>
                  </div>

                  <p className="text-text-secondary text-xs text-center mb-3">
                    Enter the 6-digit OTP sent to your new email
                  </p>

                  <OtpInput
                    value={emailOtp}
                    onChange={(val) => { setEmailOtp(val); setOtpError(false); }}
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

                  <button
                    onClick={handleVerifyOtp}
                    className="mt-3 w-full tp-button-primary animate-ambient-breath text-sm flex items-center justify-center gap-2 active:scale-95 transition-transform"
                  >
                    <Smartphone className="w-4 h-4" />
                    Verify & Update Email
                  </button>

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
                      <RefreshCw className={`w-3.5 h-3.5 ${resendCooldown ? "animate-spin" : ""}`} />
                      {resendCooldown ? "Resend in 30s" : "Resend OTP"}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Success */}
            {emailStep === "verified" && (
              <motion.div
                key="email-updated"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="border-t border-gray-100 pt-3">
                  <div className="flex items-center gap-3 bg-bg-base rounded-2xl px-4 py-3 rim-light">
                    <CheckCircle className="w-5 h-5 text-status-success flex-shrink-0" />
                    <div>
                      <p className="text-status-success font-semibold text-sm">
                        Email Updated Successfully!
                      </p>
                      <p className="text-brand-blue-text text-xs">{email}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Logout Button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <button
            onClick={() => setShowLogoutConfirm(true)}
            className="w-full tp-card border border-red-500/40 rounded-3xl p-4 flex items-center gap-3 text-red-400 active:scale-95 transition-transform"
          >
            <div className="w-10 h-10 rounded-2xl rim-light bg-bg-base flex items-center justify-center flex-shrink-0">
              <LogOut className="w-5 h-5 text-red-400" />
            </div>
            <div className="text-left flex-1">
              <p className="font-black text-sm text-red-400">Logout</p>
              <p className="text-text-secondary text-xs">Sign out of your account</p>
            </div>
            <ChevronRight className="w-4 h-4 text-red-400" />
          </button>
        </motion.div>
      </div>

      {/* Logout Confirm Modal */}
      <AnimatePresence>
        {showLogoutConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50 flex items-end justify-center"
            onClick={() => setShowLogoutConfirm(false)}
          >
            <motion.div
              initial={{ y: 200 }}
              animate={{ y: 0 }}
              exit={{ y: 200 }}
              className="tp-card rounded-t-3xl w-full max-w-sm p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-10 h-1 bg-bg-base rounded-full mx-auto mb-5 rim-light" />

              <div className="flex flex-col items-center text-center mb-6">
                <div className="w-16 h-16 rounded-2xl rim-light bg-bg-base flex items-center justify-center mb-3">
                  <LogOut className="w-7 h-7 text-red-400" />
                </div>
                <h3 className="text-text-primary font-black text-lg">Log Out?</h3>
                <p className="text-text-secondary text-sm mt-1">
                  You'll be taken back to the Aadhar login screen. Your account data is safe.
                </p>
              </div>

              <button
                onClick={handleLogout}
                className="w-full tp-button-primary bg-red-500 text-text-primary rounded-2xl py-4 font-bold text-sm mb-3 active:scale-95 transition-transform animate-ambient-breath"
              >
                Yes, Log Out
              </button>
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="w-full bg-bg-surface text-text-secondary rounded-2xl py-3 font-semibold text-sm active:scale-95 transition-transform rim-light"
              >
                Cancel
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
