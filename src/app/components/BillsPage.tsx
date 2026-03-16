import { useState } from "react";
import { motion } from "motion/react";
import {
  Zap,
  Wifi,
  Smartphone,
  Tv,
  Droplets,
  Car,
  Home,
  GraduationCap,
  CheckCircle,
  ChevronRight,
} from "lucide-react";

const BILL_CATEGORIES = [
  { id: "electricity", icon: Zap, label: "Electricity", color: "text-yellow-500", bg: "bg-yellow-50", due: "₹1,240", date: "Mar 15" },
  { id: "mobile", icon: Smartphone, label: "Mobile", color: "text-blue-500", bg: "bg-blue-50", due: "₹599", date: "Mar 20" },
  { id: "broadband", icon: Wifi, label: "Broadband", color: "text-indigo-500", bg: "bg-indigo-50", due: "₹899", date: "Mar 18" },
  { id: "dth", icon: Tv, label: "DTH/Cable", color: "text-purple-500", bg: "bg-purple-50", due: "₹399", date: "Mar 25" },
  { id: "water", icon: Droplets, label: "Water", color: "text-cyan-500", bg: "bg-cyan-50", due: "₹320", date: "Mar 22" },
  { id: "fastag", icon: Car, label: "FASTag", color: "text-orange-500", bg: "bg-orange-50", due: null, date: null },
  { id: "rent", icon: Home, label: "Rent", color: "text-rose-500", bg: "bg-rose-50", due: "₹15,000", date: "Apr 1" },
  { id: "education", icon: GraduationCap, label: "Education", color: "text-green-600", bg: "bg-green-50", due: null, date: null },
];

const RECENT_TRANSACTIONS = [
  { id: 1, name: "BESCOM Electricity", amount: "₹1,180", date: "Feb 12", status: "paid", icon: Zap, color: "text-yellow-500", bg: "bg-yellow-50" },
  { id: 2, name: "Jio Postpaid", amount: "₹599", date: "Feb 18", status: "paid", icon: Smartphone, color: "text-blue-500", bg: "bg-blue-50" },
  { id: 3, name: "ACT Broadband", amount: "₹899", date: "Feb 15", status: "paid", icon: Wifi, color: "text-indigo-500", bg: "bg-indigo-50" },
  { id: 4, name: "Tata Sky DTH", amount: "₹399", date: "Jan 25", status: "paid", icon: Tv, color: "text-purple-500", bg: "bg-purple-50" },
];

function PayModal({
  bill,
  onClose,
}: {
  bill: (typeof BILL_CATEGORIES)[0];
  onClose: () => void;
}) {
  const [paid, setPaid] = useState(false);
  const Icon = bill.icon;
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
        className="bg-bg-surface rounded-t-3xl p-6 w-full max-w-sm text-text-primary"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-10 h-1 bg-bg-base rounded-full mx-auto mb-5 rim-light" />
        {!paid ? (
          <>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-bg-base rim-light">
                <Icon className={`w-6 h-6 text-accent-yellow`} />
              </div>
              <div>
                <h3 className="text-text-primary font-black">{bill.label} Bill</h3>
                {bill.due && (
                  <p className="text-text-secondary text-xs">
                    Due {bill.date} · {bill.due}
                  </p>
                )}
              </div>
            </div>
            <label className="text-xs text-text-secondary font-semibold">Consumer/Account ID</label>
            <input
              className="mt-1 mb-3 w-full border border-border rounded-2xl px-4 py-3 text-sm bg-bg-base text-text-primary placeholder:text-text-secondary/60 focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/60"
              placeholder="Enter Consumer Number"
            />
            <label className="text-xs text-text-secondary font-semibold">Amount (₹)</label>
            <input
              className="mt-1 mb-4 w-full border border-border rounded-2xl px-4 py-3 text-sm bg-bg-base text-text-primary placeholder:text-text-secondary/60 focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/60"
              placeholder={bill.due || "Enter amount"}
              defaultValue={bill.due?.replace("₹", "")}
            />
            <button
              onClick={() => setPaid(true)}
              className="w-full bg-gradient-to-r from-brand-blue to-indigo-600 text-white rounded-2xl py-3.5 font-bold text-sm"
            >
              Pay {bill.due || "Bill"}
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center py-4">
            <div className="w-16 h-16 rounded-full bg-bg-base flex items-center justify-center mb-3 rim-light">
              <CheckCircle className="w-8 h-8 text-status-success" />
            </div>
            <h3 className="text-text-primary font-black text-lg">Payment Successful!</h3>
            <p className="text-text-secondary text-sm mt-1">
              {bill.label} bill paid successfully
            </p>
            <button
              onClick={onClose}
              className="mt-5 w-full bg-bg-base rounded-2xl py-3 text-text-secondary font-semibold text-sm rim-light"
            >
              Done
            </button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

export function BillsPage() {
  const [activeBill, setActiveBill] = useState<(typeof BILL_CATEGORIES)[0] | null>(null);

  return (
    <div className="min-h-screen bg-bg-base text-text-primary">
      {activeBill && <PayModal bill={activeBill} onClose={() => setActiveBill(null)} />}

      {/* Header */}
      <div className="bg-bg-base pt-12 pb-4 px-5">
        <div className="max-w-sm mx-auto">
          <h1 className="text-text-primary font-black text-xl">Bill Payments</h1>
          <p className="text-text-secondary text-xs mt-0.5">
            Quick luminous view of all dues
          </p>
        </div>
      </div>

      <div className="max-w-sm mx-auto px-4 py-5 pb-24">
        {/* Upcoming Bills */}
        <div className="tp-card p-4 mb-4">
          <p className="text-text-secondary text-xs font-semibold uppercase tracking-wider mb-3">
            Upcoming Bills
          </p>
          {BILL_CATEGORIES.filter((b) => b.due).map((bill, i) => {
            const Icon = bill.icon;
            return (
              <motion.button
                key={bill.id}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setActiveBill(bill)}
                className="w-full flex items-center gap-3 py-3 border-b border-white/5 last:border-0"
              >
                <div className="w-10 h-10 rounded-2xl rim-light bg-bg-base flex items-center justify-center">
                  <Icon className="w-5 h-5 text-accent-yellow" />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-text-primary font-semibold text-sm">{bill.label}</p>
                  <p className="text-text-secondary text-xs">Due: {bill.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-text-primary font-black text-sm font-mono">
                    {bill.due}
                  </p>
                  <p className="text-accent-pink text-xs">Pending</p>
                </div>
                <ChevronRight className="w-4 h-4 text-text-secondary/60" />
              </motion.button>
            );
          })}
        </div>

        {/* All Categories */}
        <p className="text-text-primary font-black text-base mb-3">All Categories</p>
        <div className="grid grid-cols-4 gap-3 mb-5">
          {BILL_CATEGORIES.map(({ id, icon: Icon, label, bg, color }, i) => (
            <motion.button
              key={id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.04 }}
              onClick={() =>
                setActiveBill(BILL_CATEGORIES.find((b) => b.id === id)!)
              }
              className="flex flex-col items-center gap-2 active:scale-95 transition-transform"
            >
              <div className="w-14 h-14 rounded-2xl rim-light bg-bg-surface flex items-center justify-center">
                <Icon className="w-6 h-6 text-brand-blue" />
              </div>
              <span className="text-text-secondary text-[11px] font-semibold text-center leading-tight">
                {label}
              </span>
            </motion.button>
          ))}
        </div>

        {/* Recent Transactions */}
        <p className="text-text-primary font-black text-base mb-3">
          Payment History
        </p>
        <div className="tp-card p-4">
          {RECENT_TRANSACTIONS.map(({ id, name, amount, date, icon: Icon, color, bg }, i) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="flex items-center gap-3 py-3 border-b border-white/5 last:border-0"
            >
              <div className="w-10 h-10 rounded-2xl rim-light bg-bg-base flex items-center justify-center">
                <Icon className="w-5 h-5 text-status-success" />
              </div>
              <div className="flex-1">
                <p className="text-text-primary font-semibold text-sm">{name}</p>
                <p className="text-text-secondary text-xs">{date}</p>
              </div>
              <div className="text-right">
                <p className="text-text-primary font-black text-sm font-mono">
                  {amount}
                </p>
                <p className="text-status-success text-xs">Paid</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
