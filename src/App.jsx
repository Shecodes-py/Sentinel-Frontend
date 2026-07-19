import { useState } from "react";
import {
  Home, Send, ShieldCheck, MessageSquareWarning, Fingerprint,
  ArrowRight, ArrowLeft, X, Check, Clock, Wallet, Eye, EyeOff,
  Trash2, Pencil, AlertTriangle, ShieldAlert, ShieldQuestion,
  Radio, ChevronRight, Sparkles, Lock
} from "lucide-react";

/* ---------------------------------------------------------
   SENTINEL — Union Bank x ECX
   Design tokens
   bg      #F6F4EE  (warm bone, not the AI-cream default — pulled cooler/greyer)
   surface #FFFFFF
   ink     #14211F  (near-black teal-cast)
   inkSoft #52645F
   line    #DEDCD1
   teal900 #0D2E2C
   teal700 #14514C
   teal500 #1F7A70
   mint    #E8F3EE
   amber700 #8A5A1E
   amber500 #C9862F
   amberBg  #FBF0DE
   Display face: "Fraunces" (banking-with-warmth serif) — restrained, used only for
   balances / hero numbers / view titles. Body + UI: "Inter". Data/mono: "IBM Plex Mono".
--------------------------------------------------------- */

const FONT_IMPORT = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap');
`;

const ROUTINE = {
  name: "Amina",
  amount: "8,000",
  recipient: "Chidi's Kitchen (saved)",
  bank: "GTBank",
  time: "12:41 PM",
  risk: "low",
};

const FRAUD = {
  name: "Amina",
  amount: "350,000",
  recipient: "Unknown — 0041 2298 771",
  bank: "Zenith Bank",
  time: "1:47 AM",
  risk: "held",
};

export default function Sentinel() {
  const [tab, setTab] = useState("dashboard");
  const [scenario, setScenario] = useState(ROUTINE);
  const [demoOpen, setDemoOpen] = useState(true);
  const [txState, setTxState] = useState("form"); // form | success | intercept | verifying | verified | blocked

  function loadScenario(s) {
    setScenario(s);
    setTxState("form");
    setTab("dashboard");
  }

  function submitTransfer() {
    if (scenario.risk === "held") {
      setTxState("intercept");
    } else {
      setTxState("success");
    }
  }

  return (
    <div
      className="min-h-screen w-full"
      style={{ background: "#F6F4EE", color: "#14211F", fontFamily: "Inter, sans-serif" }}
    >
      <style>{FONT_IMPORT}</style>

      <TopBar tab={tab} setTab={setTab} />

      <main className="max-w-3xl mx-auto px-4 pb-28 pt-6">
        {tab === "dashboard" && (
          <Dashboard
            scenario={scenario}
            txState={txState}
            setTxState={setTxState}
            submitTransfer={submitTransfer}
          />
        )}
        {tab === "scam" && <ScamCheck />}
        {tab === "trust" && <TrustPanel />}
      </main>

      {txState === "intercept" && (
        <FraudIntercept
          scenario={scenario}
          onConfirm={() => setTxState("verifying")}
          onBlock={() => setTxState("blocked")}
        />
      )}
      {txState === "verifying" && (
        <VerifyStep onDone={() => setTxState("verified")} />
      )}
      {txState === "verified" && (
        <ResultCard
          tone="mint"
          icon={<ShieldCheck size={28} />}
          title="Identity confirmed"
          body="Thanks — the transfer is on its way. We'll keep watching so you don't have to."
          onClose={() => setTxState("form")}
        />
      )}
      {txState === "blocked" && (
        <ResultCard
          tone="amber"
          icon={<Lock size={28} />}
          title="Money movement frozen"
          body="No funds have left your account. Your card, transfers, and password are locked until you confirm this was you at the branch or via the number on the back of your card."
          onClose={() => setTxState("form")}
        />
      )}

      <DemoControlPanel
        open={demoOpen}
        setOpen={setDemoOpen}
        onRoutine={() => loadScenario(ROUTINE)}
        onFraud={() => loadScenario(FRAUD)}
        active={scenario.risk}
      />
    </div>
  );
}

/* ---------------- Top nav ---------------- */
function TopBar({ tab, setTab }) {
  const items = [
    { id: "dashboard", label: "Home", icon: Home },
    { id: "scam", label: "Scam Check", icon: MessageSquareWarning },
    { id: "trust", label: "Trust Panel", icon: Fingerprint },
  ];
  return (
    <header
      className="sticky top-0 z-30 border-b"
      style={{ background: "#F6F4EE", borderColor: "#DEDCD1" }}
    >
      <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ background: "#0D2E2C" }}
          >
            <ShieldCheck size={16} color="#E8F3EE" />
          </div>
          <span
            style={{ fontFamily: "Fraunces, serif", fontWeight: 600, fontSize: "1.15rem" }}
          >
            Sentinel
          </span>
          <span
            className="ml-1 text-[10px] px-1.5 py-0.5 rounded-full tracking-wide"
            style={{ background: "#E8F3EE", color: "#14514C" }}
          >
            UNION BANK
          </span>
        </div>
        <nav className="hidden sm:flex items-center gap-1">
          {items.map((it) => {
            const Icon = it.icon;
            const activeTab = tab === it.id;
            return (
              <button
                key={it.id}
                onClick={() => setTab(it.id)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-full text-sm transition-colors"
                style={{
                  background: activeTab ? "#0D2E2C" : "transparent",
                  color: activeTab ? "#F6F4EE" : "#52645F",
                  fontWeight: 500,
                }}
              >
                <Icon size={15} />
                {it.label}
              </button>
            );
          })}
        </nav>
      </div>
      {/* mobile nav */}
      <nav
        className="sm:hidden flex items-center justify-around border-t"
        style={{ borderColor: "#DEDCD1" }}
      >
        {items.map((it) => {
          const Icon = it.icon;
          const activeTab = tab === it.id;
          return (
            <button
              key={it.id}
              onClick={() => setTab(it.id)}
              className="flex flex-col items-center gap-0.5 py-2 flex-1 text-[11px]"
              style={{ color: activeTab ? "#0D2E2C" : "#8A968F", fontWeight: activeTab ? 600 : 500 }}
            >
              <Icon size={16} />
              {it.label}
            </button>
          );
        })}
      </nav>
    </header>
  );
}

/* ---------------- VIEW A: Dashboard ---------------- */
function Dashboard({ scenario, txState, setTxState, submitTransfer }) {
  const recents = [
    { name: "Chidi's Kitchen", amt: "-₦8,000", time: "Yesterday", tone: "out" },
    { name: "Salary — Flexisaf", amt: "+₦420,000", time: "Mon", tone: "in" },
    { name: "IKEDC Prepaid", amt: "-₦15,000", time: "Mon", tone: "out" },
    { name: "Ada Uche", amt: "-₦5,000", time: "Sun", tone: "out" },
  ];

  if (txState === "success") {
    return (
      <div className="pt-10 flex flex-col items-center text-center gap-4">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center"
          style={{ background: "#E8F3EE" }}
        >
          <Check size={30} color="#14514C" />
        </div>
        <div>
          <h2 style={{ fontFamily: "Fraunces, serif", fontSize: "1.6rem", fontWeight: 600 }}>
            Sent, no questions asked
          </h2>
          <p className="mt-1 max-w-xs" style={{ color: "#52645F" }}>
            ₦{scenario.amount} to {scenario.recipient}. This looked exactly like you —
            so nothing stood in the way.
          </p>
        </div>
        <button
          onClick={() => setTxState("form")}
          className="mt-2 px-5 py-2.5 rounded-full text-sm font-medium"
          style={{ background: "#0D2E2C", color: "#F6F4EE" }}
        >
          Back to dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* balance hero */}
      <section
        className="rounded-3xl p-6 relative overflow-hidden"
        style={{ background: "#0D2E2C", color: "#F6F4EE" }}
      >
        <p className="text-xs tracking-wide uppercase" style={{ color: "#9FC2BB" }}>
          Available balance
        </p>
        <p
          className="mt-1"
          style={{ fontFamily: "Fraunces, serif", fontWeight: 500, fontSize: "2.5rem", lineHeight: 1 }}
        >
          ₦612,480<span style={{ fontSize: "1.2rem", color: "#9FC2BB" }}>.50</span>
        </p>
        <p className="mt-3 text-xs" style={{ color: "#9FC2BB" }}>
          Union Savings •••• 4471
        </p>
        <ShieldCheck size={110} style={{ position: "absolute", right: -20, bottom: -25, opacity: 0.08 }} />
      </section>

      {/* transfer form */}
      <section className="rounded-2xl p-5 border" style={{ background: "#FFFFFF", borderColor: "#DEDCD1" }}>
        <div className="flex items-center gap-2 mb-4">
          <Send size={16} color="#14514C" />
          <h3 className="text-sm font-semibold">Send money</h3>
        </div>
        <div className="grid grid-cols-1 gap-3">
          <Field label="Amount">
            <div className="flex items-center gap-1">
              <span style={{ color: "#52645F" }}>₦</span>
              <input
                readOnly
                value={scenario.amount}
                className="w-full bg-transparent outline-none text-lg"
                style={{ fontFamily: "IBM Plex Mono, monospace" }}
              />
            </div>
          </Field>
          <Field label="Recipient account">
            <input readOnly value={scenario.recipient} className="w-full bg-transparent outline-none text-sm" />
          </Field>
          <Field label="Bank">
            <input readOnly value={scenario.bank} className="w-full bg-transparent outline-none text-sm" />
          </Field>
          <div className="flex items-center gap-1.5 text-xs" style={{ color: "#8A968F" }}>
            <Clock size={12} /> Initiating at {scenario.time}
          </div>
        </div>
        <button
          onClick={submitTransfer}
          className="mt-4 w-full py-3 rounded-full text-sm font-semibold flex items-center justify-center gap-2"
          style={{ background: "#1F7A70", color: "#F6F4EE" }}
        >
          Send ₦{scenario.amount} <ArrowRight size={15} />
        </button>
      </section>

      {/* recent activity */}
      <section>
        <h3 className="text-sm font-semibold mb-2 flex items-center gap-1.5">
          <Wallet size={15} color="#14514C" /> Recent activity
        </h3>
        <div className="rounded-2xl border divide-y" style={{ borderColor: "#DEDCD1", background: "#FFFFFF" }}>
          {recents.map((r) => (
            <div key={r.name} className="flex items-center justify-between px-4 py-3">
              <div>
                <p className="text-sm font-medium">{r.name}</p>
                <p className="text-xs" style={{ color: "#8A968F" }}>{r.time}</p>
              </div>
              <span
                className="text-sm font-medium"
                style={{ fontFamily: "IBM Plex Mono, monospace", color: r.tone === "in" ? "#14514C" : "#14211F" }}
              >
                {r.amt}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="text-[11px] uppercase tracking-wide" style={{ color: "#8A968F" }}>{label}</span>
      <div className="mt-1 border-b py-1.5" style={{ borderColor: "#DEDCD1" }}>{children}</div>
    </label>
  );
}

/* ---------------- VIEW B: Fraud Intercept ---------------- */
function FraudIntercept({ scenario, onConfirm, onBlock }) {
  return (
    <div
      className="fixed inset-0 z-40 flex items-end sm:items-center justify-center px-3 pb-3 sm:pb-3"
      style={{ background: "rgba(13,46,44,0.45)" }}
    >
      <div
        className="w-full max-w-md rounded-3xl p-6 border"
        style={{ background: "#FBF0DE", borderColor: "#E9CB98" }}
      >
        <div className="flex items-center gap-2 mb-3">
          <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "#C9862F" }}>
            <ShieldQuestion size={18} color="#FBF0DE" />
          </div>
          <span className="text-xs font-semibold tracking-wide uppercase" style={{ color: "#8A5A1E" }}>
            We paused this one
          </span>
        </div>
        <h2 style={{ fontFamily: "Fraunces, serif", fontWeight: 600, fontSize: "1.35rem" }}>
          Is this really you, {scenario.name}?
        </h2>
        <p className="mt-2 text-sm leading-relaxed" style={{ color: "#5C4522" }}>
          We noticed a transfer of ₦{scenario.amount} at {scenario.time} to an account
          you've never sent to before. It's a large amount, at an unusual hour, and it
          doesn't match how you usually bank — so we're checking with you first.
        </p>

        <div className="mt-4 rounded-xl p-3 text-xs space-y-1" style={{ background: "#F6E4C2", color: "#5C4522" }}>
          <p>₦{scenario.amount} → {scenario.recipient}</p>
          <p>{scenario.bank} • {scenario.time}</p>
        </div>

        <div className="mt-5 flex flex-col gap-2">
          <button
            onClick={onConfirm}
            className="w-full py-3 rounded-full text-sm font-semibold flex items-center justify-center gap-2"
            style={{ background: "#0D2E2C", color: "#F6F4EE" }}
          >
            <Fingerprint size={16} /> Yes, it's me
          </button>
          <button
            onClick={onBlock}
            className="w-full py-3 rounded-full text-sm font-semibold border flex items-center justify-center gap-2"
            style={{ borderColor: "#8A5A1E", color: "#8A5A1E", background: "transparent" }}
          >
            No, block this!
          </button>
        </div>
      </div>
    </div>
  );
}

function VerifyStep({ onDone }) {
  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center px-3"
      style={{ background: "rgba(13,46,44,0.45)" }}
    >
      <div className="w-full max-w-sm rounded-3xl p-8 flex flex-col items-center text-center gap-4" style={{ background: "#FFFFFF" }}>
        <div className="w-16 h-16 rounded-full flex items-center justify-center animate-pulse" style={{ background: "#E8F3EE" }}>
          <Fingerprint size={30} color="#14514C" />
        </div>
        <p className="text-sm" style={{ color: "#52645F" }}>Confirming it's you…</p>
        <button
          onClick={onDone}
          className="text-xs px-4 py-2 rounded-full font-medium"
          style={{ background: "#0D2E2C", color: "#F6F4EE" }}
        >
          Simulate biometric match
        </button>
      </div>
    </div>
  );
}

function ResultCard({ tone, icon, title, body, onClose }) {
  const bg = tone === "mint" ? "#E8F3EE" : "#FBF0DE";
  const fg = tone === "mint" ? "#14514C" : "#8A5A1E";
  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center px-3"
      style={{ background: "rgba(13,46,44,0.45)" }}
    >
      <div className="w-full max-w-sm rounded-3xl p-7 flex flex-col items-center text-center gap-3" style={{ background: "#FFFFFF" }}>
        <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ background: bg, color: fg }}>
          {icon}
        </div>
        <h3 style={{ fontFamily: "Fraunces, serif", fontWeight: 600, fontSize: "1.2rem" }}>{title}</h3>
        <p className="text-sm" style={{ color: "#52645F" }}>{body}</p>
        <button
          onClick={onClose}
          className="mt-2 px-5 py-2.5 rounded-full text-sm font-medium"
          style={{ background: "#0D2E2C", color: "#F6F4EE" }}
        >
          Done
        </button>
      </div>
    </div>
  );
}

/* ---------------- VIEW C: Scam Check ---------------- */
function ScamCheck() {
  const [text, setText] = useState("");
  const [state, setState] = useState("idle"); // idle | loading | result
  const [result, setResult] = useState(null);

  function analyze() {
    if (!text.trim()) return;
    setState("loading");
    // simulated call to /api/v1/scam-check
    setTimeout(() => {
      setResult({
        risk: "high",
        tactics: [
          { label: "False urgency", detail: "Pressures you to act within minutes, before you can think it through." },
          { label: "Identity impersonation", detail: "Poses as Union Bank support using an official-sounding name." },
          { label: "Unusual request channel", detail: "Asks for a card token over SMS — banks never do this." },
        ],
        action: "Do not click the link or reply. Your bank will never ask for your card token, PIN, or OTP over SMS or WhatsApp.",
      });
      setState("result");
    }, 900);
  }

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h2 style={{ fontFamily: "Fraunces, serif", fontWeight: 600, fontSize: "1.5rem" }}>Scam Check</h2>
        <p className="text-sm mt-1" style={{ color: "#52645F" }}>
          Received a fishy text or WhatsApp message? Paste it here to verify safely.
        </p>
      </div>

      <div className="rounded-2xl border p-4" style={{ borderColor: "#DEDCD1", background: "#FFFFFF" }}>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="e.g. 'URGENT: Your Union Bank account will be suspended. Verify now: bit.ly/xyz...'"
          rows={5}
          className="w-full bg-transparent outline-none text-sm resize-none placeholder:opacity-60"
        />
        <button
          onClick={analyze}
          disabled={!text.trim() || state === "loading"}
          className="mt-3 px-5 py-2.5 rounded-full text-sm font-semibold flex items-center gap-2 disabled:opacity-40"
          style={{ background: "#0D2E2C", color: "#F6F4EE" }}
        >
          {state === "loading" ? "Checking…" : "Check this message"} <ArrowRight size={14} />
        </button>
      </div>

      {state === "result" && result && (
        <div className="rounded-2xl border p-5" style={{ borderColor: "#E9CB98", background: "#FBF0DE" }}>
          <div className="flex items-center gap-2">
            <ShieldAlert size={18} color="#8A5A1E" />
            <span className="text-xs font-bold tracking-wide uppercase px-2 py-1 rounded-full" style={{ background: "#C9862F", color: "#FBF0DE" }}>
              High risk
            </span>
          </div>
          <p className="mt-3 text-xs uppercase tracking-wide font-semibold" style={{ color: "#8A5A1E" }}>
            What we found
          </p>
          <div className="mt-2 flex flex-col gap-2">
            {result.tactics.map((t) => (
              <div key={t.label} className="flex items-start gap-2 text-sm">
                <AlertTriangle size={14} className="mt-0.5 shrink-0" color="#8A5A1E" />
                <p style={{ color: "#5C4522" }}>
                  <span className="font-semibold">{t.label}.</span> {t.detail}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t text-sm" style={{ borderColor: "#E9CB98", color: "#5C4522" }}>
            <span className="font-semibold">What to do: </span>{result.action}
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------------- VIEW D: Trust Panel ---------------- */
function TrustPanel() {
  const [cards, setCards] = useState([
    { id: 1, icon: "🕒", label: "Your active hours", value: "6:00 AM – 10:00 PM", editing: false },
    { id: 2, icon: "💰", label: "Typical spending volume", value: "₦5,000 – ₦40,000 per transfer", editing: false },
    { id: 3, icon: "📍", label: "Places you usually bank from", value: "Lagos, Ibadan", editing: false },
    { id: 4, icon: "👥", label: "People you send money to often", value: "6 saved recipients", editing: false },
    { id: 5, icon: "📱", label: "Devices we recognize", value: "1 phone, 1 tablet", editing: false },
  ]);

  function remove(id) {
    setCards((c) => c.filter((x) => x.id !== id));
  }
  function toggleEdit(id) {
    setCards((c) => c.map((x) => (x.id === id ? { ...x, editing: !x.editing } : x)));
  }

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h2 style={{ fontFamily: "Fraunces, serif", fontWeight: 600, fontSize: "1.5rem" }}>Your Financial Fingerprint</h2>
        <p className="text-sm mt-1" style={{ color: "#52645F" }}>
          This is exactly what Sentinel watches to keep your account safe — nothing hidden.
          Edit or remove anything you don't want us tracking.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {cards.map((c) => (
          <div key={c.id} className="rounded-2xl border p-4 flex items-start justify-between gap-3" style={{ borderColor: "#DEDCD1", background: "#FFFFFF" }}>
            <div className="flex items-start gap-3">
              <span className="text-lg">{c.icon}</span>
              <div>
                <p className="text-xs uppercase tracking-wide" style={{ color: "#8A968F" }}>{c.label}</p>
                {c.editing ? (
                  <input
                    defaultValue={c.value}
                    className="mt-1 text-sm bg-transparent outline-none border-b"
                    style={{ borderColor: "#DEDCD1" }}
                  />
                ) : (
                  <p className="mt-0.5 text-sm font-medium">{c.value}</p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <button onClick={() => toggleEdit(c.id)} className="p-2 rounded-full" style={{ background: "#F6F4EE" }} aria-label="Edit">
                <Pencil size={13} color="#52645F" />
              </button>
              <button onClick={() => remove(c.id)} className="p-2 rounded-full" style={{ background: "#F6F4EE" }} aria-label="Delete from profile">
                <Trash2 size={13} color="#8A5A1E" />
              </button>
            </div>
          </div>
        ))}
        {cards.length === 0 && (
          <div className="rounded-2xl border border-dashed p-6 text-center text-sm" style={{ borderColor: "#DEDCD1", color: "#8A968F" }}>
            You've cleared your fingerprint. Sentinel will rebuild it quietly as you bank —
            or add signals back anytime.
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------------- Demo Control Panel ---------------- */
function DemoControlPanel({ open, setOpen, onRoutine, onFraud, active }) {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2">
      {open && (
        <div
          className="w-64 rounded-2xl border p-4 shadow-lg"
          style={{ background: "#0D2E2C", borderColor: "#14514C", color: "#F6F4EE" }}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1.5 text-xs font-semibold tracking-wide uppercase" style={{ color: "#9FC2BB" }}>
              <Radio size={12} /> Demo control
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close">
              <X size={14} color="#9FC2BB" />
            </button>
          </div>
          <div className="flex flex-col gap-2">
            <button
              onClick={onRoutine}
              className="w-full text-left px-3 py-2.5 rounded-xl text-xs flex items-center justify-between"
              style={{ background: active === "low" ? "#1F7A70" : "#14514C" }}
            >
              <span>Load routine scenario</span>
              <ChevronRight size={13} />
            </button>
            <button
              onClick={onFraud}
              className="w-full text-left px-3 py-2.5 rounded-xl text-xs flex items-center justify-between"
              style={{ background: active === "held" ? "#C9862F" : "#14514C" }}
            >
              <span>Load fraud scenario</span>
              <ChevronRight size={13} />
            </button>
          </div>
          <p className="mt-3 text-[10px] leading-snug" style={{ color: "#6E948C" }}>
            Judges/team only — pre-fills the transfer form and flags backend context.
          </p>
        </div>
      )}
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-11 h-11 rounded-full flex items-center justify-center shadow-lg"
        style={{ background: "#0D2E2C", color: "#F6F4EE" }}
        aria-label="Toggle demo control panel"
      >
        <Sparkles size={17} />
      </button>
    </div>
  );
}
