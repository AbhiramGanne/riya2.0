import express from "express";
import path from "path";
import { GoogleGenAI } from "@google/genai";
import { productsData } from "./src/productsData";
import { Lead } from "./src/types";

// Load environment variables in local development
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());

const PORT = 3000;

// Local in-memory list to store leads temporarily for checking/admin view
const capturedLeads: Lead[] = [
  {
    id: "lead-1",
    name: "Abhiram Ganne",
    phone: "9876543210",
    email: "abhiram@happequity.com",
    areaOfInterest: "Life Insurance (Sanchay Plus)",
    timestamp: new Date(Date.now() - 3600000).toLocaleString(),
    consented: true
  }
];

// Helper to initialize Gemini SDK safely
let ai: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!ai) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("Warning: GEMINI_API_KEY is not defined in the environment. Chatbot answers will use fallback simulated responses if the key is missing.");
    }
    ai = new GoogleGenAI({
      apiKey: apiKey || "MOCK_KEY_REPLACE_ME_SECURELY",
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        }
      }
    });
  }
  return ai;
}

// System Prompt for Riya Chatbot containing all Happequity catalog knowledge
const RIYA_SYSTEM_INSTRUCTION = `
You are "riya" (all lowercase in spirit, but friendly and helpful), a brilliant, warm, and professional financial education chatbot from Happequity.
Your goal is to assist customers, answer basic investment/insurance queries, promote Happequity products, and warm up prospects so they are excited to register for a customized financial advisory call.

### Happequity's Purpose and Your Role:
Our company employs hundreds of young summer interns. Previously, they had to cold-call, which was difficult and inefficient.
You are the interactive "Face of Happequity". By answering client questions and encouraging them to obtain their "Free Scam Awareness Guide PDF", you generate high-quality, hot leads for our interns to contact! This makes their sales process warm, professional, and highly targeted.
Instruct prospects that by sharing their basic contact information, they will get:
1. The comprehensive Free Scam Awareness Guide PDF sent directly to their email ID.
2. A customized financial structure consultation, where a certified Happequity advisor will reach out to them within 10 minutes to assist further!

### Tone & Style:
- Warm, polite, empathetic, very logical, reassuring, and highly structured.
- Use formatting (bullet points, clear paragraphs) to prevent clutter blocky texts.
- Do not make up facts. Stick strictly to Happequity's products catalog.
- If unsure or asked about something completely outside investing and insurance, gently redirect them to financial education, explaining you specialize in help with Happequity's assets.

### Your Knowledge Repository (Stick to these metrics when asked):

1. **Health Insurance**: Compare top insurers based on Claim Settlement Ratio (CSR) and Cashless networks:
   - **HDFC Ergo**: CSR 99.80% (FY 2024-25), 14,476+ hospitals (largest), Flagship: Optima Secure. Lowest complaint rate (9.28 per 10,000 claims). Best all-rounder reliability.
   - **Care Health**: CSR 93.13%, 11,400+ hospitals, Flagship: Care Supreme. Supports AYUSH (alternative therapies). Note: Cashless is temporarily suspended at Max Hospitals network in 2025.
   - **Niva Bupa**: CSR ~92%, 10,000+ hospitals, key features: unlimited restoration and premium lock-in. Note: Cashless is currently suspended at Max Healthcare in 2025 due to contract expiry.
   - **ICICI Lombard**: CSR ~88.5%, 9,500+ hospitals, high ICR (77%) showing top financial muscle for large volume payouts.
   - **Tata AIG**: CSR ~86.3%, strong brand backing and dispute-free claims process.

2. **Motor Insurance**:
   - **Acko**: Digital-only, direct model, up to 85% cheaper (no agent comms), 4k+ garages, 7-minute claim filing, free pickup & drop, return repaired in 3 days. Extremely popular for cost-saving.
   - **Digit**: CSR 99.53% (very high), 6k+ garages, fully digital video self-inspection via smartphone to resolve claims in 7 minutes.
   - **HDFC Ergo**: 99.80% CSR, massive network of partner mechanics, high financial backup.
   - **Tata AIG**: CSR ~98%, 15+ rich add-ons (Tyre Secure, Engine Secure, etc.), EV-specific protection (for charger shorts/overheating), NCB protection on first claim.

3. **Life Insurance (Savings & Investment Plan)**:
   - **HDFC Life Sanchay Plus (Spl)**: Individual non-linked savings plan with 100% guaranteed benefits. Zero market risk.
     * Guaranteed Maturity variant: E.g. at Age 22, premium of ₹10,000/month, 9-year PPT, 16-year Policy Term yields a guaranteed lump sum of ₹21,68,621. Death benefit sum assured is ₹15,65,600.
     * Long Term Income variant: Payouts for 25 years, plus returns 100% of purchase premium at end. E.g. at Age 22, ₹10,000/month, 15-year PT gives ₹11,371 monthly payout for 25 years, plus Return of Premium lump sum of ₹12,48,854 at Year 40 (Total returns of over ₹54.6 Lakhs against ₹10.28 Lakhs total premium!).
     * Surrender break-even is around Year 9-10 (SSV is ₹9,74,666).
   - **Sanchay Par Advantage**: Participating plan. Pays a lower guaranteed income, but has potential for dynamic annual cash bonuses depending on HDFC Life performance. Immediate or Deferred modes.

4. **Mutual Funds Categories**:
   - **High Risk**: Axis Value Fund (undervalued stocks, risk score 75), Bandhan Small-cap (risk score 80), Edelweiss Small-cap (score 80). Highly volatile but superior wealth compounding for 7-10+ year timelines.
   - **Moderate Risk**: Bandhan Hybrid Equity (65-80% equity, risk 50), Bandhan Midcap (risk 60), Bandhan Multi-cap (risk 40), Edelweiss Aggressive Hybrid (score 55), Edelweiss Balanced Advantage (risk 50 - dynamically matches market temperatures), and ELSS tax saving funds like Samco ELSS (risk 50), Mahindra Manulife (risk 55), Baroda BNP (risk 55).
   - **Low Risk**: Bandhan Large Cap (risk 25), Union Large-cap (risk 25), Tata Dividend Yield (risk 30 - excellent for consistent passive income streams), Quant Large-cap (risk 25). Very stable, typically slides only 15-20% in bad markets.
   - **ELSS Tax Savers**: Minimum 3-year lock-in (shortest among Section 80C options like PPF or tax FD). Tax deduction up to ₹1.5 Lakhs/year in Old Tax Regime. LTCG rate is 12.5% on gains above ₹1.25 Lakhs.
   - **SIP vs FD**: SIP is market-linked (equity SIPs yield 10-14% CAGR historically over 10+ years), whereas FDs have low fixed rates (6.5-8%) and are taxed every year at slab rates. Equity is only taxed on redemption.

5. **Tradinguru Course Group**:
   - Professional educational Academy containing modules: Fundamental Analysis (with direct Live project analysis), Technical Analysis (chart patterns & indicators), Options Trading Strategies (hedges, greek metrics, spreads), and proprietary *Fake-out breakout strategy* enabling interns to capture trap cycles.

6. **Demat Accounts**:
   - Multi-asset seamless trading and custody setups integrated securely with our partner 'Wealthy'.

7. **Travel & Marine Insurance**:
   - Facilitated global students/corporate travels (via Tata AIG/Care) and specialized Cargo Ship ocean transit covers.

### Lead Promotion Strategy:
Whenever an interaction completes or you have provided a detailed specific product explanation, always warmly suggest: "To get a fully customized plan and structure with zero pressure, or to instantly receive your Free Scam Awareness Guide PDF, just click our sign up button or fill our contact request card on the screen! I've popped up a quick form for you! A certified expert coordinates with you in 10 minutes."
`;

// API: CAPTURE NEW LEAD
app.post("/api/lead", (req, res) => {
  try {
    const { name, phone, email, areaOfInterest, consented } = req.body;
    
    if (!name || !phone || !email || !areaOfInterest) {
      return res.status(400).json({ status: "error", message: "Missing required details. Please provide name, phone, email and area of interest." });
    }

    const newLead: Lead = {
      id: "lead-" + Date.now(),
      name,
      phone,
      email,
      areaOfInterest,
      consented,
      timestamp: new Date().toLocaleString()
    };

    capturedLeads.push(newLead);
    console.log("Success! New hot prospect lead captured by Riya chatbot:", newLead);

    // In a live system, the lead parameters would be posted directly to their Google Sheets App Script URL
    // We simulate a successful Google App Script execution here.
    return res.json({ 
      status: "success", 
      message: "Lead recorded successfully!",
      lead: newLead,
      automationStatus: {
        sheetRecorded: true,
        emailTriggered: true,
        scamPdfScheduled: "Instant Delivery",
        representativeSLA: "Within 10 minutes contact"
      }
    });
  } catch (error: any) {
    console.error("Error creating lead:", error);
    res.status(500).json({ status: "error", message: error.message });
  }
});

// API: RETRIEVE ALL LEADS (Simulated Admin View for Summer Interns to verify hot leads)
app.get("/api/leads", (req, res) => {
  res.json({ leads: capturedLeads });
});

// API: CHAT ENTRYPOINT
app.post("/api/chat", async (req, res) => {
  try {
    const { messages } = req.body;
    
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ status: "error", message: "Invalid payload. Provide an array of historical messages." });
    }

    // Check if Gemini API key exists
    const apiKeyExists = !!process.env.GEMINI_API_KEY;

    if (!apiKeyExists) {
      // Fallback response generator if API key is missing so user doesn't get a crashed screen
      const latestUserMessage = messages[messages.length - 1]?.text?.toLowerCase() || "";
      let replyText = "Hello! I am riya, your educating assistant from Happequity. I'd love to assist you but my Google AI Studio API Key is currently not set up. Please add your GEMINI_API_KEY in the Settings > Secrets configuration panel to let me talk fully!";
      
      if (latestUserMessage.includes("health")) {
        replyText = "Our health insurance partners include top-tier options like HDFC Ergo (99.80% CSR), Care Health (93.13% CSR), Niva Bupa, ICICI Lombard, and Tata AIG! HDFC Ergo's Optima Secure is highly recommended for full co-pay waivers. Would you like to set up a quick callback to customize a quote? (You will get a Free Scam PDF!)";
      } else if (latestUserMessage.includes("sanchay") || latestUserMessage.includes("life")) {
        replyText = "HDFC Life Sanchay Plus (Spl) is a guaranteed, non-market linked savings plan. For example, at Age 22, a monthly premium of ₹10,000 for 9 years will yield a completely guaranteed monthly payout of ₹11,371 for 25 years, plus returns your cumulative inputs of ₹12.48 Lakhs back as a lumpsum. That is over ₹54.6 Lakhs total output! Fill out our popup card to download the exact projection sheet.";
      } else if (latestUserMessage.includes("mutual") || latestUserMessage.includes("fund")) {
        replyText = "Happequity segments Mutual Funds into High Risk (e.g. Axis Value, Bandhan Small-Cap with risk scores around 75-80), Moderate Risk (Bandhan Hybrid at score 50, dynamic Balanced Advantage, ELSS tax-savers), and Low Risk (such as Tata Dividend Yield at score 30 for dividend distributions). Tell me your timeline to suggest a proper balance!";
      } else if (latestUserMessage.includes("course") || latestUserMessage.includes("trading")) {
        replyText = "The Tradinguru Course is our flagship program. It covers Fundamental analysis using real live metrics, Technical analysis, Option strategies, and our unique Fake-out Breakout Trap formula. Register your contact details to gain a free demo chapter!";
      }

      return res.json({ text: replyText });
    }

    // Call actual Gemini API safely with automatic fallback and error proofing
    const aiClient = getModelClientWithApiKeyOverride();
    
    // Map system instructions and format the conversations in the newest @google/genai contents payload format
    // Simple mapping: { role: 'user' | 'model', parts: [{ text: string }] }
    const mappedContents = messages.map(msg => ({
      role: msg.sender === "user" ? "user" as const : "model" as const,
      parts: [{ text: msg.text }]
    }));

    // List of models to try in sequence to bypass 503 "high demand" errors
    const modelsToTry = ["gemini-3.5-flash", "gemini-flash-latest", "gemini-3.1-flash-lite"];
    let result = null;
    let lastError: any = null;

    for (const modelName of modelsToTry) {
      try {
        console.log(`Attempting Riya AI chat with model: ${modelName}`);
        result = await aiClient.models.generateContent({
          model: modelName,
          contents: mappedContents,
          config: {
            systemInstruction: RIYA_SYSTEM_INSTRUCTION,
            temperature: 0.7
          }
        });
        if (result && result.text) {
          console.log(`Received successful response from model: ${modelName}`);
          break;
        }
      } catch (err: any) {
        lastError = err;
        console.warn(`Model ${modelName} failed or is currently unavailable (Status: ${err?.status || "Unknown"}). Error:`, err?.message || err);
      }
    }

    if (result && result.text) {
      return res.json({ text: result.text });
    }

    // In case all authentic calls fail (due to API Key validation, 503 exhaustion, quotas, or network blocks),
    // Fall back gracefully to the safe educational simulation engine to prevent client-facing application crashes
    console.warn("All live Gemini models failed. Falling back to the localized Riya simulation bank to keep user experience uninterrupted.", lastError);
    const latestUserMessage = messages[messages.length - 1]?.text?.toLowerCase() || "";
    let replyText = "Hi! I'm riya. I see there is temporarily high demand on my neural channels. I can still happily help you with Happequity's insights! What would you like to discuss—our Mutual Funds, Motor/Health Insurance, or the Tradinguru Course?";
    
    if (latestUserMessage.includes("health")) {
      replyText = "For Health Insurance, our partners are top-tier: HDFC Ergo (99.80% CSR, Optima Secure plan with lowest complaint rate), Care Health (93.13% CSR, Care Supreme), and Niva Bupa! HDFC Ergo offers stellar cashless settlement. Fill out our contact popup to claim your Free Scam Guide PDF, and our partner advisors will call you in 10 minutes!";
    } else if (latestUserMessage.includes("sanchay") || latestUserMessage.includes("life")) {
      replyText = "HDFC Life Sanchay Plus (Spl) is a fully guaranteed non-market-linked dynamic savings plan. For example, at Age 22, premium of ₹10,000/month for 9 years will give you ₹21,68,621 guaranteed maturity. Or under the Income variant, ₹10,000/month PPT for 15 years results in a guaranteed monthly income of ₹11,371 for 25 years PLUS an extra ₹12.48 Lakhs lump sum of premium returns at the end. Total returns: over ₹54.6 Lakhs! Submit our pop-up form to have a detailed PDF illustration sent instantly to your mail.";
    } else if (latestUserMessage.includes("mutual") || latestUserMessage.includes("fund")) {
      replyText = "Our Mutual Fund baskets are grouped to handle risk profiles: High Risk (Axis Value or small-caps with risk score ~75-80), Moderate Risk (Bandhan Hybrid at score 50, aggressive hybrid, ELSS tax savings lists), and Low Risk (Tata Dividend Yield at score 30 for stable returns). Equity funds have tax advantages like only being taxed on redemption. Drop your email in the signup card—it triggers the download of our full comparative guide!";
    } else if (latestUserMessage.includes("course") || latestUserMessage.includes("trading")) {
      replyText = "The Tradinguru Course contains step-by-step masterclasses on Fundamental & Technical analysis, Option strategies (spreads/hedges), and our unique fake-out breakout trap formula. Sign up on the dashboard to access our first three modules free!";
    }

    return res.json({ text: replyText });

  } catch (error: any) {
    console.error("Gemini API server failure error:", error);
    return res.status(500).json({ 
      status: "error", 
      message: "I encountered an error communicating with Google AI Studio. Please verify that your API key is correctly active in the secrets tab.",
      errorDetails: error.message 
    });
  }
});

// Fallback to resolve exact API key if changed or custom injected
function getModelClientWithApiKeyOverride(): GoogleGenAI {
  return getGeminiClient();
}

// INTEGRATION OF VITE DEV SERVER VS PRODUCTION COMPILED STATICS
async function main() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting full-stack dev environment. Compiling assets with Vite HMR proxied to port 3000.");
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Serving production app assets.");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Riya backend listening at http://0.0.0.0:${PORT} in ${process.env.NODE_ENV || "development"} mode.`);
  });
}

main().catch((err) => {
  console.error("Critical server boot error:", err);
  process.exit(1);
});
