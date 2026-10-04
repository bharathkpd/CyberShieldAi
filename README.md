# 🛡️ CyberShield AI — Scam & Cybercrime Defense Desk

> **Forensic-grade scam, phishing, and fraud detection web application engineered for the Indian threat landscape.**  
> Built with a bespoke **"Forensic Case File"** design system (Light Theme Only), Anthropic Claude 3.5 Sonnet analysis, URL & domain heuristics, one-tap family warning cards in Telugu/Hindi/English, and ready-to-file 1930 cybercrime complaints.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-D62828?style=for-the-badge&logo=github)](https://bharathkpd.github.io/CyberShieldAi/)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/bharathkpd/CyberShieldAi)

🌐 **Live GitHub Pages URL**: [https://bharathkpd.github.io/CyberShieldAi/](https://bharathkpd.github.io/CyberShieldAi/)

---

## 📋 Table of Contents
1. [Overview & Product Features](#-overview--product-features)
2. [Design System: Forensic Case File](#-design-system-forensic-case-file)
3. [Technology Stack](#-technology-stack)
4. [Forensic Detection Pipeline](#-forensic-detection-pipeline)
5. [Indian Cybercrime Ecosystem Integration](#-indian-cybercrime-ecosystem-integration)
6. [Supported Modus Operandi & Verification Samples](#-supported-modus-operandi--verification-samples)
7. [Installation & Setup](#-installation--setup)
8. [Vercel Deployment Guide](#-vercel-deployment-guide)
9. [Privacy & Security Guarantee](#-privacy--security-guarantee)

---

## 🔍 Overview & Product Features

CyberShield AI empowers citizens, elders, and small businesses to rapidly investigate suspicious digital interactions in seconds:

* **Multimodal Intake**: Inspect suspicious text messages, SMS alerts, payment URLs, screenshots, and payment QR codes (decoded client-side via `jsQR`).
* **Tactile Verdict Dossier**: Instant classification (`SAFE`, `SUSPICIOUS`, `DANGEROUS`) with an animated rubber stamp slam, screen shake physics, and a live horizontal ink threat gauge.
* **Exact Substring Evidence Highlighting**: Red flags are highlighted directly within the original message on ruled ledger paper, complete with hover/tap forensic rationales.
* **Family Protect Warning Cards**: Generates localized, high-contrast warning cards in English, Telugu (తెలుగు), and Hindi (हिन्दी) formatted for WhatsApp forwarding to protect non-technical parents and elders.
* **Statutory 1930 Complaint Generator**: Pre-fills official police incident complaints matching [cybercrime.gov.in](https://cybercrime.gov.in) fields and exports printable legal PDFs with case tracking numbers.
* **Threat Intelligence Dashboard**: Visualizes national scam distributions, 7-day incident trends, and state-by-state threat data using custom Forensic Case File styled Recharts.
* **Spot the Scam Training Lab**: 5-question interactive field drill awarding rubber-stamped certifications from Cadet Trainee to Chief Forensic Inspector.
* **Offline Fallback Resilience**: If Anthropic API keys are not supplied or if network calls time out, a rule-based forensic keyword and heuristics engine takes over so the demo never fails.

---

## 🎨 Design System: "Forensic Case File" (Light Only)

CyberShield AI is intentionally designed to evoke a vintage police case dossier, avoiding generic AI templates, dark modes, purple neon glows, or floating blobs:

* **Canvas & Surfaces**:
  * Paper Canvas: `#F5F0E6` (warm vintage document tone)
  * Section Contrast: `#EDE6D6`
  * Raised Case Card: `#FFFDF8`
  * Deep Carbon Ink: `#1B1B1B` (used for all primary text and structural borders)
  * Soft Secondary Ink: `#55524B`
* **Alert & Highlighter Tokens**:
  * Danger Red: `#D62828` | Highlight: `rgba(214, 40, 40, 0.25)`
  * Suspicious Amber: `#D98E04` | Highlight: `rgba(217, 142, 4, 0.30)`
  * Safe Green: `#2F7D4F` | Highlight: `rgba(47, 125, 79, 0.22)`
  * Neutral Olive: `#5B6B4A`
* **Typography**:
  * Headlines: **Fraunces** (600–800 serif weights)
  * Body: **DM Sans** with fallbacks for **Noto Sans Telugu** and **Noto Sans Devanagari**
  * Evidence & URLs: **IBM Plex Mono**
* **Tactile Physics & Details**:
  * Strict maximum border radius of **4px** (almost square, crisp corners)
  * Solid `2px #1B1B1B` ink borders
  * Offset hard drop shadow: `6px 6px 0px #1B1B1B`
  * Mechanical button press: translates `(3px, 3px)` on click
  * Masking-tape corner anchors (`.tape-top-left`, `.tape-top-right`)
  * Ruled ledger paper lines (`.ruled-paper`) and 4% SVG noise texture (`public/grain.svg`)
  * Rubber stamp borders (`.stamp-box`) with ink-bleed emulation.

---

## 💻 Technology Stack

* **Core Framework**: Next.js 14 (App Router) & React 18
* **Language**: TypeScript (Strict Mode)
* **Styling**: Tailwind CSS with custom Forensic Case File tokens
* **Animations**: Framer Motion (ease-out spring physics, accessible)
* **Visualizations**: Recharts (custom ink line & paper palette theme)
* **Iconography**: Lucide React (thin stroke, zero emoji icons)
* **Image Generation & Export**: `html-to-image` (PNG generation)
* **Legal PDF Export**: `jspdf` (Official complaint dossiers)
* **QR Decoding**: `jsqr` (Client-side camera / image decoding)
* **AI Analysis**: Anthropic Claude 3.5 Sonnet (`@anthropic-ai/sdk`)
* **Validation**: Zod runtime schema enforcement
* **Persistence**: Client-side `localStorage`

---

## ⚙️ Forensic Detection Pipeline

1. **Intake & Normalization**:
   The input is received via text, URL string, screenshot, or decoded QR code.
2. **URL Heuristics Scoring** (`lib/urlHeuristics.ts`):
   Evaluates 11 distinct attack markers:
   * Brand lookalikes & typosquatting (`sbi-kyc`, `paypa1`, `indlapost`, `amaz0n`)
   * Disposable high-risk TLDs (`.top`, `.xyz`, `.click`, `.live`, `.bid`, `.sbs`)
   * Raw IP addresses in hostnames
   * Credential injection (`@` in URL)
   * Missing HTTPS / Insecure HTTP
   * Excessive subdomain nesting (domain shadowing)
   * Punycode homograph attacks (`xn--`)
   * Shorteners masking destination (`bit.ly`, `tinyurl`)
   * High digit ratios and excessive lengths
3. **Anthropic Claude 3.5 Sonnet Assessment**:
   * Evaluates psychological pressure tactics (false deadlines, panic threats, arrest warnings).
   * Locates exact case-sensitive substrings in `redFlags` to render marker highlights.
   * Generates empathetic plain-language explanations in English, Telugu, and Hindi.
4. **Blended Risk Formula**:
   $$\text{Final URL Score} = 0.6 \times \text{Heuristic Score} + 0.4 \times \text{AI Score}$$
5. **Fallback Resilience Engine** (`lib/fallbackAnalyzer.ts`):
   Guarantees immediate zero-lag analysis if API keys are missing or offline.

---

## 🇮🇳 Indian Cybercrime Ecosystem Integration

* **Citizen Financial Cyber Fraud Reporting System (Helpline 1930)**:
  Prominently highlights the critical **"Golden Hour"** (first 2 hours) to freeze stolen funds before interstate mule dispersal.
* **National Cyber Crime Reporting Portal ([cybercrime.gov.in](https://cybercrime.gov.in))**:
  Formats complaint dossiers matching MHA required parameters (incident category, suspect identifiers, evidence excerpt, loss estimate).
* **Multilingual Vernacular Support**:
  Full interface and AI output translation for **English**, **Telugu (తెలుగు)**, and **Hindi (हिन्दी)**.

---

## 🧪 Supported Modus Operandi & Verification Samples

CyberShield AI includes 6 pre-loaded case files on the home screen for instant testing:

1. **Fake Bank KYC SMS**: Same-day account suspension threat with a lookalike domain (`http://sbi-pan-kyc.top/update`).
2. **Work-From-Home Job Scam**: Remote Amazon data entry offer demanding upfront UPI bond fees (`recruit-amazon@ybl`).
3. **Lottery & KBC Prize**: Amitabh Bachchan lucky draw demanding GST tax payments.
4. **Courier / India Post OTP Scam**: Consignment delivery failure baiting victims into a nominal Rs 5 fee on typosquatted `indlapost-track.xyz`.
5. **Telugu Scam SMS (తెలుగు బ్యాంక్ మోసం)**: Regional vernacular bank freeze phishing targeting AP & Telangana citizens.
6. **Legitimate Utility Receipt**: Authentic electricity payment receipt on state power portal (`tssouthernpower.com`) resulting in a verified `SAFE` verdict.

---

## 🚀 Installation & Setup

### Prerequisites
* Node.js 18.17+ or Node.js 20+
* npm or pnpm

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/your-username/cybershield-ai.git
cd cybershield-ai
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```
Add your Anthropic API key (optional for demo; fallback engine runs automatically if omitted):
```env
ANTHROPIC_API_KEY=sk-ant-api03-...
NEXT_PUBLIC_DEFAULT_REGION=IN
```

### 3. Start Development Server
```bash
npm run dev
```
Open **`http://localhost:3000`** in your browser.

### 4. Build for Production
```bash
npm run build
npm run start
```

---

## ☁️ Vercel Deployment Guide

1. Push your repository to GitHub.
2. Import the project into [Vercel](https://vercel.com).
3. Under **Environment Variables**, add:
   * `ANTHROPIC_API_KEY` (Your Claude API key)
   * `NEXT_PUBLIC_DEFAULT_REGION`: `IN`
4. Click **Deploy**. Vercel will automatically detect Next.js 14 and deploy the edge-ready application.

---

## 🔒 Privacy & Security Guarantee

* **Zero Server-Side Retention**: User evidence transcripts, phone numbers, and screenshots are never stored in databases.
* **Client-Side Storage**: Case histories reside strictly in your browser's `localStorage` and can be purged at any time.
* **100% Light Theme Constraint**: Zero dark mode or ambient dark backdrops to preserve high-contrast documentary legibility.

---

*CyberShield AI — Defending Digital India.*
