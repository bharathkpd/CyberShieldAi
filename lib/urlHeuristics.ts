export interface UrlHeuristicResult {
  score: number; // 0 to 100
  isSuspicious: boolean;
  reasons: string[];
  details: {
    hasBadTLD: boolean;
    isIPAddress: boolean;
    hasAtSymbol: boolean;
    isShortener: boolean;
    noHttps: boolean;
    subdomainCount: number;
    hasKeywords: boolean;
    hasLookalike: boolean;
    isPunycode: boolean;
    highDigitRatio: boolean;
    excessiveLength: boolean;
  };
}

const BAD_TLDS = [
  ".xyz",
  ".top",
  ".click",
  ".live",
  ".work",
  ".support",
  ".fit",
  ".monster",
  ".vip",
  ".link",
  ".icu",
  ".rest",
  ".bar",
  ".buzz",
  ".bid",
  ".trade",
  ".online",
  ".site",
  ".cfd",
  ".sbs",
  ".zip",
  ".mov",
];

const KNOWN_SHORTENERS = [
  "bit.ly",
  "tinyurl.com",
  "t.co",
  "cutt.ly",
  "rb.gy",
  "is.gd",
  "ow.ly",
  "buff.ly",
  "adf.ly",
  "shorturl.at",
];

const SUSPICIOUS_KEYWORDS = [
  "login",
  "verify",
  "kyc",
  "update",
  "claim",
  "bank",
  "secure",
  "account",
  "pan",
  "aadhaar",
  "reward",
  "lottery",
  "upi",
  "support",
  "refund",
  "re-delivery",
  "blocked",
  "auth",
  "portal",
  "wallet",
];

const LOOKALIKE_PATTERNS = [
  { pattern: /paypa[l1i]/i, legit: "paypal.com" },
  { pattern: /sbi[-_]?(?:kyc|update|pan|bank)/i, legit: "onlinesbi.sbi" },
  { pattern: /hdfc[-_]?(?:netbanking|kyc|verify)/i, legit: "hdfcbank.com" },
  { pattern: /icici[-_]?(?:bank|kyc|login)/i, legit: "icicibank.com" },
  { pattern: /ind[l1]apost/i, legit: "indiapost.gov.in" },
  { pattern: /amaz[0o]n/i, legit: "amazon.in" },
  { pattern: /flipk[a4]rt/i, legit: "flipkart.com" },
  { pattern: /airte[l1]/i, legit: "airtel.in" },
  { pattern: /j[i1][o0]/i, legit: "jio.com" },
  { pattern: /kbc[-_]?(?:lottery|lucky|winner)/i, legit: "sonyliv.com" },
];

export function analyzeUrlHeuristics(inputUrl: string): UrlHeuristicResult {
  let score = 0;
  const reasons: string[] = [];

  let normalized = inputUrl.trim();
  if (!normalized.startsWith("http://") && !normalized.startsWith("https://")) {
    normalized = "http://" + normalized;
  }

  let parsed: URL | null = null;
  try {
    parsed = new URL(normalized);
  } catch {
    return {
      score: 85,
      isSuspicious: true,
      reasons: ["Malformed or deceptive URL structure"],
      details: {
        hasBadTLD: false,
        isIPAddress: false,
        hasAtSymbol: false,
        isShortener: false,
        noHttps: true,
        subdomainCount: 0,
        hasKeywords: false,
        hasLookalike: false,
        isPunycode: false,
        highDigitRatio: false,
        excessiveLength: false,
      },
    };
  }

  const hostname = parsed.hostname.toLowerCase();
  const fullUrl = parsed.href.toLowerCase();

  // 1. Insecure HTTP (no HTTPS)
  const noHttps = parsed.protocol === "http:";
  if (noHttps) {
    score += 15;
    reasons.push("Insecure HTTP protocol used instead of encrypted HTTPS");
  }

  // 2. IP Address directly in URL
  const ipRegex = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/;
  const isIPAddress = ipRegex.test(hostname);
  if (isIPAddress) {
    score += 35;
    reasons.push("Raw IP address used in place of a verifiable domain name");
  }

  // 3. Userinfo '@' in URL (credential injection deception)
  const hasAtSymbol = inputUrl.includes("@");
  if (hasAtSymbol) {
    score += 40;
    reasons.push("Deceptive '@' symbol hides destination host from victims");
  }

  // 4. Bad / Disposable TLD check
  const hasBadTLD = BAD_TLDS.some((tld) => hostname.endsWith(tld));
  if (hasBadTLD) {
    score += 30;
    reasons.push(`High-risk, disposable top-level domain frequently used in phishing campaigns`);
  }

  // 5. URL Shortener hiding destination
  const isShortener = KNOWN_SHORTENERS.some((short) => hostname.includes(short));
  if (isShortener) {
    score += 25;
    reasons.push("Shortened redirect link masking true target destination");
  }

  // 6. Punycode / IDN homograph attack
  const isPunycode = hostname.includes("xn--");
  if (isPunycode) {
    score += 35;
    reasons.push("Punycode (xn--) homograph obfuscation detected in domain");
  }

  // 7. Lookalike / Brand Typosquatting
  let hasLookalike = false;
  for (const { pattern, legit } of LOOKALIKE_PATTERNS) {
    if (pattern.test(hostname) && !hostname.endsWith(legit)) {
      hasLookalike = true;
      score += 45;
      reasons.push(`Domain mimics legitimate entity (${legit}) using typosquatting/impersonation`);
      break;
    }
  }

  // 8. Suspicious Keywords in Path or Subdomain
  const matchedKeywords = SUSPICIOUS_KEYWORDS.filter(
    (kw) => hostname.includes(kw) || parsed?.pathname.includes(kw) || parsed?.search.includes(kw)
  );
  const hasKeywords = matchedKeywords.length > 0;
  if (hasKeywords) {
    score += Math.min(25, matchedKeywords.length * 10);
    reasons.push(`Contains high-risk trigger keywords: ${matchedKeywords.slice(0, 3).join(", ")}`);
  }

  // 9. Excessive Subdomains (Domain shadowing)
  const subdomains = hostname.split(".").filter(Boolean);
  const subdomainCount = subdomains.length;
  if (subdomainCount > 3) {
    score += 20;
    reasons.push(`Unusual subdomain nesting (${subdomainCount} levels) attempting to confuse victims`);
  }

  // 10. Digit ratio in hostname
  const digits = (hostname.match(/\d/g) || []).length;
  const highDigitRatio = digits / Math.max(hostname.length, 1) > 0.25;
  if (highDigitRatio) {
    score += 20;
    reasons.push("High density of random numerical digits in hostname");
  }

  // 11. Excessive URL Length
  const excessiveLength = fullUrl.length > 80;
  if (excessiveLength) {
    score += 10;
    reasons.push("Unusually long URL structure designed to overflow mobile address bars");
  }

  // Clamp score between 0 and 100
  const finalScore = Math.min(100, Math.max(0, score));

  return {
    score: finalScore,
    isSuspicious: finalScore >= 35,
    reasons: reasons.length > 0 ? reasons : ["No anomalous domain markers detected"],
    details: {
      hasBadTLD,
      isIPAddress,
      hasAtSymbol,
      isShortener,
      noHttps,
      subdomainCount,
      hasKeywords,
      hasLookalike,
      isPunycode,
      highDigitRatio,
      excessiveLength,
    },
  };
}

/**
 * Checks if raw text contains a UPI payment request (collect or intent)
 */
export function analyzeUPIString(input: string): { isUPI: boolean; isCollect: boolean; pa?: string; am?: string; note?: string } {
  if (!input.toLowerCase().startsWith("upi://pay")) {
    // Check if it has upi VPA format (e.g., example@okaxis, recruit@ybl)
    const vpaRegex = /[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}/;
    const match = input.match(vpaRegex);
    return {
      isUPI: !!match,
      isCollect: false,
      pa: match ? match[0] : undefined,
    };
  }

  try {
    const url = new URL(input);
    const pa = url.searchParams.get("pa") || "";
    const am = url.searchParams.get("am") || "";
    const note = url.searchParams.get("tn") || "";
    // If it asks for money to receive money, or has collect pattern
    const isCollect = url.searchParams.get("mode") === "02" || !!am;
    return {
      isUPI: true,
      isCollect,
      pa,
      am,
      note,
    };
  } catch {
    return { isUPI: true, isCollect: false };
  }
}
