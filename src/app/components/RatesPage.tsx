import { motion } from "motion/react";
import {
  TrendingUp,
  TrendingDown,
  Briefcase,
  Home,
  Car,
  GraduationCap,
  PiggyBank,
  Shield,
  ChevronRight,
  Info,
  Zap,
} from "lucide-react";

const SAVINGS_RATES = [
  { label: "Zero Balance Account", rate: "3.5%", pa: "p.a.", highlight: false },
  { label: "Savings Premium Account", rate: "4.2%", pa: "p.a.", highlight: false },
  { label: "Senior Citizen Savings", rate: "5.0%", pa: "p.a.", highlight: true },
  { label: "Fixed Deposit (1 Year)", rate: "7.1%", pa: "p.a.", highlight: true },
  { label: "Fixed Deposit (3 Years)", rate: "7.5%", pa: "p.a.", highlight: false },
  { label: "Recurring Deposit", rate: "6.8%", pa: "p.a.", highlight: false },
];

const LOAN_RATES = [
  { icon: Home, label: "Home Loan", rate: "8.50%", tenure: "Up to 30 yrs", color: "text-blue-500", bg: "bg-blue-50" },
  { icon: Car, label: "Car Loan", rate: "9.25%", tenure: "Up to 7 yrs", color: "text-indigo-500", bg: "bg-indigo-50" },
  { icon: GraduationCap, label: "Education Loan", rate: "8.75%", tenure: "Up to 15 yrs", color: "text-purple-500", bg: "bg-purple-50" },
  { icon: Briefcase, label: "Business Credit", rate: "10.00%", tenure: "Monthly charge", color: "text-violet-600", bg: "bg-violet-50", highlight: true },
  { icon: PiggyBank, label: "Personal Loan", rate: "11.50%", tenure: "Up to 5 yrs", color: "text-rose-500", bg: "bg-rose-50" },
  { icon: Shield, label: "Gold Loan", rate: "7.50%", tenure: "Up to 3 yrs", color: "text-yellow-600", bg: "bg-yellow-50" },
];

const FOREX_RATES = [
  { currency: "USD", flag: "🇺🇸", buy: "83.12", sell: "83.48" },
  { currency: "EUR", flag: "🇪🇺", buy: "90.21", sell: "90.68" },
  { currency: "GBP", flag: "🇬🇧", buy: "105.34", sell: "105.90" },
  { currency: "JPY", flag: "🇯🇵", buy: "0.556", sell: "0.562" },
  { currency: "AED", flag: "🇦🇪", buy: "22.61", sell: "22.80" },
];

export function RatesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#0a1628] via-[#0d2244] to-[#1a3a6e] pt-12 pb-6 px-5">
        <div className="max-w-sm mx-auto">
          <h1 className="text-white font-black text-xl">Interest Rates</h1>
          <p className="text-blue-300/70 text-xs mt-0.5">
            Updated: 10 Mar 2026 · RBI Compliant
          </p>
        </div>
      </div>

      <div className="max-w-sm mx-auto px-4 py-5">
        {/* Entrepreneur Special Callout */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-violet-600 to-indigo-700 rounded-3xl p-4 mb-5 shadow-lg"
        >
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-4 h-4 text-yellow-300" />
            <span className="text-yellow-300 text-xs font-black uppercase tracking-wide">
              Entrepreneur Offer
            </span>
          </div>
          <p className="text-white font-black text-base mb-1">
            Business Credit Balance
          </p>
          <p className="text-white/80 text-xs leading-relaxed">
            Get instant credit at just{" "}
            <span className="text-yellow-300 font-black">10% interest p.a.</span>,
            charged on the{" "}
            <span className="text-yellow-300 font-black">1st of every month</span>.
            No hidden fees.
          </p>
          <button className="mt-3 bg-white text-indigo-700 rounded-2xl px-4 py-2 text-xs font-black flex items-center gap-1">
            Apply Now <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </motion.div>

        {/* Savings Rates */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl p-4 shadow-sm mb-4"
        >
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-4 h-4 text-green-500" />
            <p className="text-gray-800 font-black text-sm">
              Savings & Deposit Rates
            </p>
          </div>
          {SAVINGS_RATES.map(({ label, rate, pa, highlight }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + i * 0.05 }}
              className={`flex items-center justify-between py-3 border-b border-gray-50 last:border-0 ${
                highlight ? "rounded-xl px-2 -mx-2 bg-green-50/50" : ""
              }`}
            >
              <div>
                <p className="text-gray-700 text-sm font-semibold">{label}</p>
                {highlight && (
                  <span className="text-green-500 text-[10px] font-bold">
                    ✦ Best Rate
                  </span>
                )}
              </div>
              <div className="text-right">
                <span className="text-green-600 font-black text-base">
                  {rate}
                </span>
                <span className="text-gray-400 text-xs ml-1">{pa}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Loan Rates */}
        <p className="text-gray-800 font-black text-base mb-3">Loan Rates</p>
        <div className="space-y-3 mb-5">
          {LOAN_RATES.map(({ icon: Icon, label, rate, tenure, color, bg, highlight }, i) => (
            <motion.button
              key={label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.06 }}
              className={`w-full bg-white rounded-3xl p-4 shadow-sm flex items-center gap-3 active:scale-95 transition-transform ${
                highlight ? "ring-2 ring-violet-300" : ""
              }`}
            >
              <div className={`w-11 h-11 ${bg} rounded-2xl flex items-center justify-center flex-shrink-0`}>
                <Icon className={`w-5 h-5 ${color}`} />
              </div>
              <div className="flex-1 text-left">
                <p className="text-gray-800 font-bold text-sm">{label}</p>
                <p className="text-gray-400 text-xs">{tenure}</p>
              </div>
              <div className="text-right">
                <p className={`font-black text-base ${color}`}>
                  {rate}
                </p>
                <p className="text-gray-400 text-xs">p.a.</p>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-300 flex-shrink-0" />
            </motion.button>
          ))}
        </div>

        {/* Forex Rates */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-3xl p-4 shadow-sm mb-4"
        >
          <div className="flex items-center gap-2 mb-4">
            <TrendingDown className="w-4 h-4 text-blue-500" />
            <p className="text-gray-800 font-black text-sm">
              Forex Rates (per ₹)
            </p>
          </div>
          <div className="grid grid-cols-3 text-xs text-gray-400 font-semibold pb-2 border-b border-gray-100">
            <span>Currency</span>
            <span className="text-center">Buy</span>
            <span className="text-right">Sell</span>
          </div>
          {FOREX_RATES.map(({ currency, flag, buy, sell }, i) => (
            <motion.div
              key={currency}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 + i * 0.05 }}
              className="grid grid-cols-3 py-2.5 border-b border-gray-50 last:border-0"
            >
              <span className="text-gray-700 font-semibold text-sm">
                {flag} {currency}
              </span>
              <span className="text-green-600 font-bold text-sm text-center">
                ₹{buy}
              </span>
              <span className="text-red-500 font-bold text-sm text-right">
                ₹{sell}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Disclaimer */}
        <div className="bg-blue-50 rounded-2xl p-3 flex gap-2">
          <Info className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
          <p className="text-blue-500 text-xs leading-relaxed">
            All rates are subject to change per RBI guidelines. Business credit
            interest is charged on the 1st of every month. T&C apply.
          </p>
        </div>

        <div className="h-6" />
      </div>
    </div>
  );
}
