import { useState } from "react";
import { motion } from "motion/react";
import {
  Eye,
  EyeOff,
  Send,
  QrCode,
  Download,
  Home,
  Phone,
  Copy,
  ChevronRight,
  Briefcase,
  Zap,
  Truck,
  Star,
} from "lucide-react";

// Mock QR modal
function QRModal({
  type,
  onClose,
}: {
  type: "scan" | "generate";
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 z-50 flex items-end justify-center"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 300 }}
        animate={{ y: 0 }}
        exit={{ y: 300 }}
        className="bg-bg-surface rounded-t-3xl w-full max-w-sm flex flex-col text-text-primary"
        style={{ maxHeight: "85vh" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drag handle */}
        <div className="pt-4 pb-2 flex-shrink-0">
          <div className="w-10 h-1 bg-bg-base rounded-full mx-auto rim-light" />
        </div>

        {/* Scrollable body */}
        <div className="overflow-y-auto px-6 pb-28 flex-1">
          {type === "generate" ? (
            <>
              <h3 className="text-text-primary font-black text-lg text-center mb-4">
                Your QR Code
              </h3>
              <div className="flex justify-center mb-4">
                <div className="w-48 h-48 bg-bg-base border border-border rounded-2xl flex items-center justify-center">
                  <div className="grid grid-cols-5 gap-1 p-2">
                    {Array.from({ length: 25 }).map((_, i) => (
                      <div
                        key={i}
                        className={`w-7 h-7 rounded-sm ${
                          [0, 1, 2, 5, 6, 10, 12, 14, 18, 20, 22, 23, 24].includes(i)
                            ? "bg-bg-surface"
                            : "bg-bg-base"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-center text-text-secondary text-sm">
                Share this QR to collect payments
              </p>
              <p className="text-center text-brand-blue-text font-bold text-sm mt-1">
                Rajesh Kumar Sharma · TP Bank
              </p>
            </>
          ) : (
            <>
              <h3 className="text-text-primary font-black text-lg text-center mb-4">
                Scan QR Code
              </h3>
              <div className="flex justify-center mb-4">
                <div className="w-52 h-52 bg-bg-base rounded-2xl flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-4 border-2 border-border rounded-xl" />
                  <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-brand-blue/70 animate-pulse" />
                  <QrCode className="w-16 h-16 text-text-secondary/40" />
                  <p className="absolute bottom-4 text-text-secondary text-xs">
                    Point camera at QR
                  </p>
                </div>
              </div>
              <p className="text-center text-text-secondary text-sm">
                Scan any UPI QR code to make payment
              </p>
            </>
          )}
          <button
            onClick={onClose}
            className="mt-5 w-full bg-bg-base rounded-2xl py-3 text-text-secondary font-semibold text-sm rim-light"
          >
            Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Transfer Modal
function TransferModal({ onClose }: { onClose: () => void }) {
  const [amount, setAmount] = useState("");
  const [upi, setUpi] = useState("");
  const [sent, setSent] = useState(false);

  const handleSend = () => {
    if (amount && upi) setSent(true);
  };

  return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 bg-black/60 z-50 flex items-end justify-center"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 300 }}
        animate={{ y: 0 }}
        className="bg-bg-surface rounded-t-3xl w-full max-w-sm flex flex-col text-text-primary"
        style={{ maxHeight: "85vh" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drag handle */}
        <div className="pt-4 pb-2 flex-shrink-0">
          <div className="w-10 h-1 bg-bg-base rounded-full mx-auto rim-light" />
        </div>

        {/* Scrollable body */}
        <div className="overflow-y-auto px-6 pb-28 flex-1">
          {!sent ? (
            <>
              <h3 className="text-text-primary font-black text-lg mb-4">
                Send Money
              </h3>
              <label className="text-xs text-text-secondary font-semibold">
                UPI ID / Mobile No.
              </label>
              <input
                className="mt-1 mb-3 w-full border border-border rounded-2xl px-4 py-3 text-sm bg-bg-base text-text-primary placeholder:text-text-secondary/60 focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/60"
                placeholder="name@upi or 9876543210"
                value={upi}
                onChange={(e) => setUpi(e.target.value)}
              />
              <label className="text-xs text-text-secondary font-semibold">
                Amount (₹)
              </label>
              <input
                className="mt-1 mb-4 w-full border border-border rounded-2xl px-4 py-3 text-sm bg-bg-base text-text-primary placeholder:text-text-secondary/60 focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/60"
                placeholder="0.00"
                inputMode="decimal"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <button
                onClick={handleSend}
                className="w-full bg-gradient-to-r from-brand-blue to-indigo-600 text-white rounded-2xl py-3.5 font-bold text-sm"
              >
                Send ₹{amount || "0"}
              </button>
            </>
          ) : (
            <div className="flex flex-col items-center py-4">
              <div className="w-16 h-16 rounded-full bg-bg-base flex items-center justify-center mb-3 rim-light">
                <Send className="w-7 h-7 text-status-success" />
              </div>
              <h3 className="text-text-primary font-black text-lg">
                ₹{amount} Sent!
              </h3>
              <p className="text-text-secondary text-sm mt-1">to {upi}</p>
              <button
                onClick={onClose}
                className="mt-5 w-full bg-bg-base rounded-2xl py-3 text-text-secondary font-semibold text-sm rim-light"
              >
                Done
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

// Cash Delivery Modal
function CashDeliveryModal({ onClose }: { onClose: () => void }) {
  const [amount, setAmount] = useState("");
  const [booked, setBooked] = useState(false);

  return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 bg-black/60 z-50 flex items-end justify-center"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 300 }}
        animate={{ y: 0 }}
        className="bg-bg-surface rounded-t-3xl w-full max-w-sm flex flex-col text-text-primary"
        style={{ maxHeight: "85vh" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drag handle */}
        <div className="pt-4 pb-2 flex-shrink-0">
          <div className="w-10 h-1 bg-bg-base rounded-full mx-auto rim-light" />
        </div>

        {/* Scrollable body */}
        <div className="overflow-y-auto px-6 pb-28 flex-1">
          {!booked ? (
            <>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-2xl bg-bg-base flex items-center justify-center rim-light">
                  <Truck className="w-5 h-5 text-accent-yellow" />
                </div>
                <div>
                  <h3 className="text-text-primary font-black text-base">
                    Cash Home Delivery
                  </h3>
                  <p className="text-text-secondary text-xs">
                    Get cash delivered to your doorstep
                  </p>
                </div>
              </div>
              <div className="bg-bg-base rounded-2xl p-3 mb-4 text-xs text-accent-yellow rim-light">
                ✨ New Feature — Available in Bangalore, Chennai, Mumbai & Delhi.
                Delivery in 2–4 hrs. ₹29 delivery charge.
              </div>
              <label className="text-xs text-text-secondary font-semibold">
                Amount to Deliver (₹)
              </label>
              <input
                className="mt-1 mb-3 w-full border border-border rounded-2xl px-4 py-3 text-sm bg-bg-base text-text-primary placeholder:text-text-secondary/60 focus:outline-none focus:border-accent-yellow focus:ring-2 focus:ring-accent-yellow/60"
                placeholder="Min ₹500 – Max ₹20,000"
                inputMode="decimal"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <label className="text-xs text-text-secondary font-semibold">
                Delivery Address
              </label>
              <input
                className="mt-1 mb-5 w-full border border-border rounded-2xl px-4 py-3 text-sm bg-bg-base text-text-primary placeholder:text-text-secondary/60 focus:outline-none focus:border-accent-yellow focus:ring-2 focus:ring-accent-yellow/60"
                placeholder="47/2, MG Road, Koramangala..."
                defaultValue="47/2, MG Road, Koramangala, Bangalore – 560 034"
              />
              <button
                onClick={() => amount && setBooked(true)}
                className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-2xl py-4 font-bold text-sm shadow-lg shadow-orange-500/40 active:scale-95 transition-transform"
              >
                Book Cash Delivery
              </button>
            </>
          ) : (
            <div className="flex flex-col items-center py-4">
              <div className="w-16 h-16 rounded-full bg-bg-base flex items-center justify-center mb-3 rim-light">
                <Truck className="w-7 h-7 text-accent-yellow" />
              </div>
              <h3 className="text-text-primary font-black text-lg">Booked!</h3>
              <p className="text-text-secondary text-sm mt-1 text-center">
                ₹{amount} cash will be delivered in 2–4 hrs
              </p>
              <p className="text-accent-yellow text-xs mt-2">
                Order ID: TPC{Math.floor(Math.random() * 90000 + 10000)}
              </p>
              <button
                onClick={onClose}
                className="mt-5 w-full bg-bg-base rounded-2xl py-3 text-text-secondary font-semibold text-sm rim-light"
              >
                Done
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export function HomePage() {
  const [balanceVisible, setBalanceVisible] = useState(true);
  const [modal, setModal] = useState<
    "transfer" | "scan" | "generate" | "cash" | null
  >(null);
  const [copied, setCopied] = useState("");

  const copyToClipboard = (text: string, field: string) => {
    try {
      navigator.clipboard.writeText(text).catch(() => {
        // Fallback for blocked Clipboard API
        const el = document.createElement("textarea");
        el.value = text;
        el.style.position = "fixed";
        el.style.opacity = "0";
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);
      });
    } catch {
      // Silent fail
    }
    setCopied(field);
    setTimeout(() => setCopied(""), 2000);
  };

  const services = [
    {
      id: "transfer",
      icon: Send,
      label: "Money\nTransfer",
      color: "from-blue-500 to-blue-600",
      bg: "bg-blue-50",
      textColor: "text-blue-600",
    },
    {
      id: "scan",
      icon: QrCode,
      label: "Pay via\nQR Scan",
      color: "from-indigo-500 to-purple-600",
      bg: "bg-indigo-50",
      textColor: "text-indigo-600",
    },
    {
      id: "generate",
      icon: Download,
      label: "Collect\nAmount",
      color: "from-emerald-500 to-teal-600",
      bg: "bg-emerald-50",
      textColor: "text-emerald-600",
    },
    {
      id: "cash",
      icon: Truck,
      label: "Cash\nDelivery",
      color: "from-orange-500 to-amber-500",
      bg: "bg-orange-50",
      textColor: "text-orange-600",
      isNew: true,
    },
  ];

  return (
    <div className="min-h-screen bg-bg-base text-text-primary">
      {/* Modals */}
      {modal === "transfer" && (
        <TransferModal onClose={() => setModal(null)} />
      )}
      {(modal === "scan" || modal === "generate") && (
        <QRModal
          type={modal}
          onClose={() => setModal(null)}
        />
      )}
      {modal === "cash" && <CashDeliveryModal onClose={() => setModal(null)} />}

      {/* Top Bar */}
      <div className="bg-bg-base pt-12 pb-6 px-5">
        <div className="max-w-sm mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-2xl rim-light bg-bg-surface flex items-center justify-center overflow-hidden">
                <img
                  src="/tp-logo.png.png"
                  alt="TP Bank"
                  className="w-7 h-7 object-contain"
                />
              </div>
              <div>
                <p className="text-text-secondary text-[11px] font-medium">
                  Welcome back 👋
                </p>
                <p className="text-text-primary font-black text-sm">
                  Rajesh Kumar Sharma
                </p>
              </div>
            </div>
            <div className="w-10 h-10 rounded-2xl rim-light bg-bg-surface flex items-center justify-center shadow-lg">
              <span className="text-text-primary font-black">R</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-sm mx-auto px-4 pb-24">
        {/* TP Vault Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative rounded-3xl overflow-hidden mb-5"
          style={{ height: 210 }}
        >
          {/* Indigo-to-blue subtle mesh gradient */}
          <div
            className="absolute inset-0"
            style={{
              backgroundColor: "#0b1020",
              backgroundImage:
                "radial-gradient(circle at 0% 0%, rgba(129,140,248,0.45), transparent 55%), radial-gradient(circle at 100% 100%, rgba(244,114,182,0.35), transparent 60%), radial-gradient(circle at 0% 100%, rgba(79,70,229,0.65), transparent 55%)",
            }}
          />
          {/* 45-degree TP accent cut */}
          <div className="absolute -right-16 -top-16 w-40 h-40 bg-brand-blue/40 rotate-45" />
          <div className="absolute -right-4 -top-10 w-20 h-20 bg-accent-pink/50 rotate-45 opacity-70" />

          {/* Card Content – always light text to match Figma */}
          <div className="absolute inset-0 p-5 flex flex-col justify-between text-white">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-white/70 text-[11px] font-semibold uppercase tracking-[0.2em]">
                  TP Vault
                </span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-white text-xs">Total Balance</span>
                  <button
                    onClick={() => setBalanceVisible(!balanceVisible)}
                    className="text-white/70"
                    aria-label={balanceVisible ? "Hide balance" : "Show balance"}
                  >
                    {balanceVisible ? (
                      <Eye className="w-3.5 h-3.5" />
                    ) : (
                      <EyeOff className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
                <p className="text-white font-black text-3xl mt-1 font-mono tabular-nums">
                  {balanceVisible ? "₹ 0.00" : "₹ ••••"}
                </p>
              </div>
              {/* Compact TP mark */}
              <div className="relative flex flex-col items-end gap-2">
                <div className="w-10 h-7 rounded-md rim-light bg-white/10 flex items-center justify-center">
                  <span className="text-[10px] font-black text-white tracking-[0.18em]">
                    TP
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[10px] text-white/70">
                  <span className="font-mono">•••7831</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] text-white/75 mt-2">
              <div>
                <p className="uppercase tracking-[0.18em] text-[10px]">
                  Available
                </p>
                <p className="font-mono text-white">₹ 0.00</p>
              </div>
              <div>
                <p className="uppercase tracking-[0.18em] text-[10px]">
                  On Hold
                </p>
                <p className="font-mono text-white/80">₹ 0.00</p>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-status-success" />
                <span className="text-[10px] text-status-success font-medium">
                  Secure by TP Vault
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bank Details */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="tp-card p-4 mb-4"
        >
          <p className="text-text-secondary text-xs font-semibold uppercase tracking-wider mb-3">
            Bank Account Details
          </p>
          {[
            { label: "Account No.", value: "1234 5678 9012", copy: "123456789012" },
            { label: "IFSC Code", value: "TPBK0001234" },
            { label: "Branch", value: "Koramangala, Bangalore" },
            { label: "Account Type", value: "Zero Balance Savings" },
          ].map(({ label, value, copy }) => (
            <div
              key={label}
              className="flex items-center justify-between py-2 border-b border-white/5 last:border-0"
            >
              <div>
                <p className="text-text-secondary text-xs">{label}</p>
                <p className="text-text-primary font-semibold text-sm">{value}</p>
              </div>
              {copy && (
                <button
                  onClick={() => copyToClipboard(copy, label)}
                  className="flex items-center gap-1 text-brand-blue-text text-xs rim-light rounded-xl px-2 py-1 bg-bg-base active:scale-95 transition-transform"
                >
                  <Copy className="w-3.5 h-3.5" />
                  {copied === label ? "Copied!" : "Copy"}
                </button>
              )}
            </div>
          ))}
        </motion.div>

        {/* Entrepreneur Credit Offer */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="relative rounded-3xl overflow-hidden mb-4 tp-card"
        >
          <div className="bg-gradient-to-r from-brand-blue to-indigo-700 p-5">
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 rounded-2xl rim-light bg-bg-base/60 flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-text-primary" />
              </div>
              <span className="bg-yellow-400 text-yellow-900 text-xs font-black px-2.5 py-1 rounded-full">
                OFFER
              </span>
            </div>
            <h3 className="text-white font-black text-base mb-1">
              Are You an Entrepreneur?
            </h3>
            <p className="text-white/80 text-xs leading-relaxed mb-3">
              Get instant credit balance in your account to kickstart your
              business journey with TP Bank.
            </p>

            <div className="grid grid-cols-3 gap-2 mb-4">
              {[
                { label: "Interest Rate", value: "10% p.a." },
                { label: "Charged On", value: "1st Monthly" },
                { label: "Min Amount", value: "₹10,000" },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="bg-bg-base/40 rounded-2xl px-2 py-2 text-center rim-light"
                >
                  <p className="text-white font-black text-sm">{value}</p>
                  <p className="text-white/60 text-[10px] mt-0.5">{label}</p>
                </div>
              ))}
            </div>

            <button className="w-full tp-button-primary bg-text-primary text-brand-blue rounded-2xl py-3 font-black text-sm flex items-center justify-center gap-2 animate-ambient-breath">
              <Zap className="w-4 h-4" />
              Apply for Credit Now
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>

        {/* Quick Services */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-4"
        >
          <p className="text-text-primary font-black text-base mb-3">
            Quick Services
          </p>
          <div className="grid grid-cols-2 gap-3">
            {services.map(
              ({ id, icon: Icon, label, bg, textColor, isNew }) => (
                <button
                  key={id}
                  onClick={() =>
                    setModal(id as "transfer" | "scan" | "generate" | "cash")
                  }
                  className="tp-card rounded-3xl p-4 text-left relative active:scale-95 transition-transform"
                >
                  {isNew && (
                    <span className="absolute top-3 right-3 bg-accent-yellow text-bg-base text-[9px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-wide">
                      NEW
                    </span>
                  )}
                  <div
                    className="w-10 h-10 min-w-11 min-h-11 rounded-2xl bg-bg-base rim-light flex items-center justify-center mb-3 relative"
                  >
                    <Icon className="w-5 h-5 stroke-brand-blue" />
                    <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-accent-pink" />
                  </div>
                  <p
                    className="text-text-primary font-black text-sm leading-tight whitespace-pre-line"
                  >
                    {label}
                  </p>
                </button>
              )
            )}
          </div>
        </motion.div>

        {/* Customer Care */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="tp-card p-4 mb-6"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl rim-light bg-bg-base flex items-center justify-center flex-shrink-0">
              <Phone className="w-5 h-5 text-status-success" />
            </div>
            <div className="flex-1">
              <p className="text-text-secondary text-xs font-semibold">
                Customer Care · 24×7
              </p>
              <p className="text-text-primary font-black text-lg">1800-267-1234</p>
              <p className="text-text-secondary text-xs">
                Toll-free · Helpline & Support
              </p>
            </div>
            <a
              href="tel:18002671234"
              className="w-10 h-10 rounded-2xl rim-light bg-status-success flex items-center justify-center shadow-md"
            >
              <Phone className="w-4 h-4 text-white" />
            </a>
          </div>

          <div className="flex items-center gap-2 mt-3 pt-3 border-t border-white/5">
            <Star className="w-3.5 h-3.5 text-accent-yellow fill-accent-yellow" />
            <Star className="w-3.5 h-3.5 text-accent-yellow fill-accent-yellow" />
            <Star className="w-3.5 h-3.5 text-accent-yellow fill-accent-yellow" />
            <Star className="w-3.5 h-3.5 text-accent-yellow fill-accent-yellow" />
            <Star className="w-3.5 h-3.5 text-accent-yellow fill-accent-yellow" />
            <span className="text-text-secondary text-xs ml-1">
              4.8/5 · Based on 12,400+ reviews
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}