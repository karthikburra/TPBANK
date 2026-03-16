import { useState } from "react";
import { motion } from "motion/react";
import {
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Copy,
  CreditCard,
  Shield,
  Bell,
  Globe,
  Smartphone,
  ChevronRight,
  CheckCircle,
} from "lucide-react";

const CARD_BG =
  "https://images.unsplash.com/photo-1761624159468-82b4dd9f3fd8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBiYW5raW5nJTIwY3JlZGl0JTIwY2FyZCUyMGJsdWUlMjBncmFkaWVudHxlbnwxfHx8fDE3NzMxNDI2Mzl8MA&ixlib=rb-4.1.0&q=80&w=1080";

export function CardsPage() {
  const [cvvVisible, setCvvVisible] = useState(false);
  const [cardLocked, setCardLocked] = useState(false);
  const [copied, setCopied] = useState(false);
  const [settings, setSettings] = useState({
    onlineTxn: true,
    contactless: true,
    international: false,
    atmWithdraw: true,
    notifications: true,
  });

  const copyCardNumber = () => {
    navigator.clipboard.writeText("4521000000007831");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-bg-base text-text-primary">
      {/* Header */}
      <div className="bg-bg-base pt-12 pb-4 px-5">
        <div className="max-w-sm mx-auto">
          <h1 className="text-text-primary font-black text-xl">My Cards</h1>
          <p className="text-text-secondary text-xs mt-0.5">
            Manage your debit card
          </p>
        </div>
      </div>

      <div className="max-w-sm mx-auto px-4 py-5 pb-24">
        {/* Card Visual */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative rounded-3xl overflow-hidden mb-5 tp-card"
          style={{ height: 200 }}
        >
          <img src={CARD_BG} alt="Card BG" className="absolute inset-0 w-full h-full object-cover opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/60 via-transparent to-accent-pink/50" />

          {cardLocked && (
            <div className="absolute inset-0 bg-gray-900/70 flex flex-col items-center justify-center z-10">
              <Lock className="w-10 h-10 text-white mb-2" />
              <p className="text-white font-black text-sm">Card Locked</p>
              <p className="text-white/60 text-xs">Tap unlock to activate</p>
            </div>
          )}

          <div className="absolute inset-0 p-5 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-text-secondary text-xs font-semibold uppercase tracking-[0.18em]">
                TP Bank Debit
              </span>
              <div className="w-10 h-7 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-lg opacity-90" />
            </div>
            <div>
              <p className="text-text-primary text-base tracking-[0.2em] font-mono">
                4521 •••• •••• 7831
              </p>
              <div className="flex items-center justify-between mt-1">
                <div>
                  <p className="text-text-secondary text-[10px] uppercase">Holder</p>
                  <p className="text-text-primary text-xs font-semibold">
                    RAJESH K SHARMA
                  </p>
                </div>
                <div>
                  <p className="text-text-secondary text-[10px] uppercase">
                    Expiry
                  </p>
                  <p className="text-text-primary text-xs font-semibold">
                    03/29
                  </p>
                </div>
                <div>
                  <p className="text-text-secondary text-[10px] uppercase">CVV</p>
                  <p className="text-text-primary text-xs font-semibold font-mono">
                    {cvvVisible ? "472" : "•••"}
                  </p>
                </div>
                <div className="flex">
                  <div className="w-6 h-6 rounded-full bg-red-500/80" />
                  <div className="w-6 h-6 rounded-full bg-yellow-500/80 -ml-2" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <button
            onClick={copyCardNumber}
            className="tp-card rounded-2xl p-3 flex flex-col items-center gap-1.5 active:scale-95 transition-transform"
          >
            {copied ? (
              <CheckCircle className="w-5 h-5 text-status-success" />
            ) : (
              <Copy className="w-5 h-5 text-brand-blue-text" />
            )}
            <span className="text-text-secondary text-xs font-semibold">
              {copied ? "Copied!" : "Copy No."}
            </span>
          </button>

          <button
            onClick={() => setCvvVisible(!cvvVisible)}
            className="tp-card rounded-2xl p-3 flex flex-col items-center gap-1.5 active:scale-95 transition-transform"
          >
            {cvvVisible ? (
              <EyeOff className="w-5 h-5 text-brand-blue-text" />
            ) : (
              <Eye className="w-5 h-5 text-brand-blue-text" />
            )}
            <span className="text-text-secondary text-xs font-semibold">
              {cvvVisible ? "Hide CVV" : "Show CVV"}
            </span>
          </button>

          <button
            onClick={() => setCardLocked(!cardLocked)}
            className={`rounded-2xl p-3 flex flex-col items-center gap-1.5 tp-card active:scale-95 transition-transform ${
              cardLocked ? "bg-bg-surface" : "bg-bg-surface"
            }`}
          >
            {cardLocked ? (
              <Unlock className="w-5 h-5 text-accent-pink" />
            ) : (
              <Lock className="w-5 h-5 text-accent-pink" />
            )}
            <span className="text-text-secondary text-xs font-semibold">
              {cardLocked ? "Unlock" : "Lock Card"}
            </span>
          </button>
        </div>

        {/* Card Details */}
        <div className="tp-card p-4 mb-4">
          <p className="text-text-secondary text-xs font-semibold uppercase tracking-wider mb-3">
            Card Information
          </p>
          {[
            { label: "Card Number", value: "4521 •••• •••• 7831" },
            { label: "Card Type", value: "RuPay Platinum Debit" },
            { label: "Network", value: "RuPay" },
            { label: "Daily Limit", value: "₹1,00,000" },
            { label: "ATM Limit", value: "₹25,000 / day" },
          ].map(({ label, value }) => (
            <div key={label} className="flex items-center justify-between py-2.5 border-b border-white/5 last:border-0">
              <p className="text-text-secondary text-sm">{label}</p>
              <p className="text-text-primary font-semibold text-sm">{value}</p>
            </div>
          ))}
        </div>

        {/* Card Controls */}
        <div className="tp-card p-4 mb-6">
          <p className="text-text-secondary text-xs font-semibold uppercase tracking-wider mb-3">
            Card Controls
          </p>
          {[
            { key: "onlineTxn", icon: Globe, label: "Online Transactions", desc: "E-commerce & websites" },
            { key: "contactless", icon: CreditCard, label: "Contactless Pay", desc: "NFC tap-to-pay" },
            { key: "international", icon: Globe, label: "International Use", desc: "Overseas transactions" },
            { key: "atmWithdraw", icon: Shield, label: "ATM Withdrawal", desc: "Cash at ATM machines" },
            { key: "notifications", icon: Bell, label: "Txn Notifications", desc: "SMS & app alerts" },
          ].map(({ key, icon: Icon, label, desc }) => (
            <div key={key} className="flex items-center gap-3 py-3 border-b border-white/5 last:border-0">
              <div className="w-9 h-9 rim-light bg-bg-base rounded-xl flex items-center justify-center">
                <Icon className="w-4 h-4 text-text-secondary" />
              </div>
              <div className="flex-1">
                <p className="text-text-primary font-semibold text-sm">{label}</p>
                <p className="text-text-secondary text-xs">{desc}</p>
              </div>
              <button
                onClick={() =>
                  setSettings((prev) => ({
                    ...prev,
                    [key]: !prev[key as keyof typeof prev],
                  }))
                }
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  settings[key as keyof typeof settings]
                    ? "bg-brand-blue"
                    : "bg-bg-base"
                }`}
              >
                <div
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${
                    settings[key as keyof typeof settings] ? "left-7" : "left-1"
                  }`}
                />
              </button>
            </div>
          ))}
        </div>

        {/* Report / Block */}
        <button className="w-full bg-white rounded-3xl p-4 shadow-sm flex items-center justify-between mb-2 active:scale-95 transition-transform">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-red-50 rounded-xl flex items-center justify-center">
              <Shield className="w-4 h-4 text-red-500" />
            </div>
            <div className="text-left">
              <p className="text-gray-800 font-semibold text-sm">
                Report Lost / Stolen Card
              </p>
              <p className="text-gray-400 text-xs">Block & request replacement</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-300" />
        </button>

        <button className="w-full bg-white rounded-3xl p-4 shadow-sm flex items-center justify-between active:scale-95 transition-transform">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center">
              <Smartphone className="w-4 h-4 text-blue-500" />
            </div>
            <div className="text-left">
              <p className="text-gray-800 font-semibold text-sm">Set / Change Card PIN</p>
              <p className="text-gray-400 text-xs">Secure your card</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-300" />
        </button>
      </div>
    </div>
  );
}
