# Sentinel

**It knows you, so it protects you.**

Sentinel is an adaptive-friction fraud defense layer built for **HackX 6.0** in partnership with **Union Bank & ECX**. It stays completely invisible during routine banking, and steps in with a calm, plain-language explanation the instant a transaction looks like fraud.

> Built for NIBSS's highest-risk fraud demographic: banking customers aged 40+.

---

## The problem

Traditional fraud controls apply the same friction to every customer, every time — OTPs and lockouts on every transfer, regardless of whether it looks like you. That approach:

- Annoys customers on transactions that are obviously normal
- Still fails against social engineering, where the customer *willingly* hands over a valid OTP
- Gives no explanation when it does intervene, so customers can't tell a real hold from a glitch

₦25.85B was lost to fraud in Nigeria in 2025 (NIBSS), with social engineering as the #1 vector — and middle-aged Nigerians (40+) as the primary target.

## The solution: Adaptive Friction

Sentinel scores every transaction against each customer's own behavioral fingerprint, not a fixed rulebook shared across all users.

- **Matches your pattern** → the transaction completes instantly. No OTP, no PIN re-entry, no popup.
- **Breaks your pattern** → Sentinel holds the transfer and explains, in one plain sentence, exactly what looked wrong — then lets the customer decide.

## Features

| View | What it does |
|---|---|
| **Dashboard & Transfers** | A normal banking home screen. Routine transfers complete with zero added friction. |
| **The Shield (Fraud Intercept)** | Triggered when a transaction is held. Explains the anomaly in plain language and offers a simple "Yes, it's me" / "No, block this" choice — never an accusation. |
| **Scam Check** | Paste a suspicious text or WhatsApp message and get back a risk badge, the specific manipulation tactics used, and a concrete next step. |
| **Trust Panel** | Radical transparency. Shows exactly what behavioral signals make up your "Financial Fingerprint," with a live edit/delete control on every one. |
| **Demo Control Panel** | A floating widget (judges/team only) that swaps the app between a routine and a fraud scenario with one click, for a clean live demo. |

## Tech stack

- **Frontend:** React (Vite), [lucide-react](https://lucide.dev) for icons
- **Deterministic scoring engine:** Python / Flask — calculates Z-scores across 4 behavioral signals (amount, time, recipient, velocity)
- **Generative layer:** Gemini API — turns raw risk signals into plain-language explanations, and powers Scam Check analysis
- **Data layer:** pre-computed fingerprint cache, optimized for sub-millisecond scoring

## Getting started

```bash
git clone https://github.com/Shecodes-py/Sentinel-Frontend.git
cd sentinel-app
npm install
npm run dev
```

The app opens on the **landing page** by default. Click "See the demo" (or any of the other CTA buttons) to launch the interactive product demo.

### Project structure

```
src/
├── App.jsx        # Entry point — toggles between Landing and the demo
├── Landing.jsx     # Marketing/explainer landing page
├── landing.css     # Landing page styles
└── Sentinel.jsx    # The four-view product demo + Demo Control Panel
```

### Connecting the backend

The demo currently simulates backend responses locally. To wire it to a real Flask backend:

- `Sentinel.jsx` → point the transfer scoring logic at `POST /api/v1/transactions/score`
- `Sentinel.jsx` (Scam Check) → point `analyze()` at `POST /api/v1/scam-check`
- `Sentinel.jsx` (Trust Panel) → point card edit/delete actions at `POST /api/v1/trust-panel`

## Pitch materials

- `sentinel-landing.html` — standalone landing page (no build step required)
- `sentinel-pitch.pptx` — 10-slide pitch deck (editable in PowerPoint/Keynote)

## Roadmap

- Language support for Nigerian Pidgin, Yoruba, Hausa, and Igbo
- USSD-compatible layer for feature-phone users

## Team

Team Sentinel — Full-Stack Developer, AI/ML Engineer, CyberSec Specialist.

Built for **HackX 6.0**, in partnership with **Union Bank & ECX**.