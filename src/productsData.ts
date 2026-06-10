import { ProductDetail } from "./types";

export const productsData: Record<string, ProductDetail[]> = {
  health_insurance: [
    {
      title: "HDFC Ergo Health Insurance",
      category: "health_insurance",
      summary: "Consistently ranked as the best all-rounder in Indian health insurance, HDFC Ergo is highly recommended for families wanting the most reliable, low-complaint coverage.",
      facts: [
        "Claim Settlement Ratio (CSR): 99.80% (FY 2024-25), one of the highest in India.",
        "Cashless Hospital Network: 14,476+ hospitals - the largest network among Happequity's partners.",
        "Flagship Products: Optima Secure & Optima Restore (known for no room-rent sub-limits and zero co-pay in top variants).",
        "Complaint Volume: Extremely low, at approximately 9.28 complaints per 10,000 claims.",
        "Issued over 1.5 crore policies.",
        "Cashless Approval Speed: Typically within 1-2 hours."
      ],
      suitableFor: ["Families wanting best-in-class reliability", "Customers who prioritize high CSR over lowest premium"],
      links: { official: "https://www.hdfcergo.com/health-insurance" }
    },
    {
      title: "Care Health Insurance",
      category: "health_insurance",
      summary: "Formerly known as Religare Health Insurance, Care is one of India's largest standalone health insurers, known for wide hospital access and strong claim performance.",
      facts: [
        "Claim Settlement Ratio (CSR): 93.13% (FY 2022-25 average, IRDAI data).",
        "Cashless Hospital Network: 11,400+ hospitals across India.",
        "Flagship Product: Care Supreme (comprehensive coverage with restoration benefits and no room-rent sub-limit in higher sum insured variants).",
        "Alternative Treatments: AYUSH coverage (Ayurveda, Yoga, Unani, Siddha, Homeopathy) is included in most plans.",
        "Cashless Pre-authorisation: Typically approved within 2 hours.",
        "Note: Cashless is temporarily suspended at Max Hospital network in 2025; verify current status on purchase."
      ],
      suitableFor: ["Families wanting wide hospital access", "Budget-conscious buyers", "Those wanting sum insured restoration"],
      links: { official: "https://www.careinsurance.com" }
    },
    {
      title: "Niva Bupa Health Insurance",
      category: "health_insurance",
      summary: "Formerly Max Bupa, Niva Bupa is a standalone health insurer famous for innovation, competitive pricing, and premium lock-in benefits.",
      facts: [
        "Claim Settlement Ratio: Approximately 92% (IRDAI FY 2023-24 data).",
        "Cashless Hospital Network: 10,000+ hospitals across India.",
        "Unique Features: Unlimited reinstatement (restoration) of sum insured, and locked-in premiums for long-term policyholders.",
        "Cashless Claim Approval Speed: Fast clearance (30 minutes to 2 hours for emergencies).",
        "Waiting Period for Pre-existing Diseases (PED): 24 to 36 months depending on the plan.",
        "Important Note: Suspended cashless at all 22 Max Healthcare hospitals from August 2025 following contract expiry. Reimbursement must be used there."
      ],
      suitableFor: ["Customers seeking unlimited restoration", "Long-term buyers looking for locked-in premiums"],
      links: { official: "https://www.nivabupa.com" }
    },
    {
      title: "ICICI Lombard Health Insurance",
      category: "health_insurance",
      summary: "One of India's largest private general insurers with over 21 years of experience, offering solid health coverage, financial strength, and fast cashless approvals.",
      facts: [
        "Claim Settlement Ratio: Approximately 88.53% (health, IRDAI FY 2023-24).",
        "Cashless Hospital Network: 9,500+ hospitals across India.",
        "Scale: Settled over 68 lakh claims - among the highest volumes in India.",
        "High Incurred Claim Ratio (ICR): Approximately 77%, indicating high financial stability to settle large claims.",
        "Cashless Approval Speed: 30 minutes to 2 hours depending on case complexity."
      ],
      suitableFor: ["Customers wanting a financially strong, large-scale insurer", "Those with existing ICICI bank relationships"],
      links: { official: "https://www.icicilombard.com/health-insurance" }
    },
    {
      title: "Tata AIG Health Insurance",
      category: "health_insurance",
      summary: "A joint venture between Tata Group and AIG, rated in the top 5 for balanced claim performance, financial stability, and clean, dispute-free claim processes.",
      facts: [
        "Claim Settlement Ratio: Approximately 86.28% (health, IRDAI FY 2023-24) with a strong ICR of 78.33%.",
        "Settled around 37 lakh health claims.",
        "AYUSH Cover: Covers AYUSH treatments (Ayurveda, Homeopathy, etc.) in most health plans.",
        "Reputation: Highly transparent claim process with extremely limited disputes.",
        "Stability: IRDAI-rated strong for both CSR and financial health - a safe, brand-backed choice."
      ],
      suitableFor: ["Customers seeking a brand-backed insurer for maximum trust", "Those valuing financial stability & reliable claims"],
      links: { official: "https://www.tataaig.com/health-insurance" }
    }
  ],
  motor_insurance: [
    {
      title: "Acko Motor Insurance",
      category: "motor_insurance",
      summary: "India's leading digital-only motor insurer. Sells directly to customers, cutting out middleman commissions to offer extremely low premiums.",
      facts: [
        "Claim Settlement Ratio: 99.10% (FY 2023-24).",
        "Cashless Garages: 4,000+ across major cities.",
        "Pricing: Up to 85% cheaper than traditional motor insurers.",
        "Speedy Claims: Claims process is fully digital, completed in ~7 minutes on the app. Free vehicle pickup/drop-off for repairs at partner garages.",
        "Delivery: Delivery of repaired vehicle within 3 working days.",
        "Add-ons: Zero Depreciation, Engine Cover, NCB Protection, Roadside Assistance, Personal Accident ₹15 lakh."
      ],
      suitableFor: ["Tech-savvy customers looking for direct-to-customer low rates", "Quick claim turnarounds"],
      links: { official: "https://www.acko.com/car-insurance/" }
    },
    {
      title: "Digit Motor Insurance",
      category: "motor_insurance",
      summary: "Go Digit is a highly-rated, user-friendly insurer known for its advanced smartphone-enabled claim inspection, zero physical paperwork, and stellar ratings.",
      facts: [
        "Claim Settlement Ratio: 99.53% (FY 2023-24) - top tier for auto insurance.",
        "Cashless Garages: 6,000+ across India.",
        "Self-Inspection: Unique smartphone-enabled video/photo self-inspection to complete claims in 7 minutes.",
        "Strong Coverage: Fully optimized for both cars and two-wheelers.",
        "Add-ons: Zero Depreciation, Engine Protection, Roadside Assistance, Return to Invoice, Key Protection."
      ],
      suitableFor: ["Smart-phone users who hate paperwork", "Fast digital payouts"],
      links: { official: "https://www.godigit.com/motor-insurance/car-insurance" }
    },
    {
      title: "HDFC Ergo Motor Insurance",
      category: "motor_insurance",
      summary: "A premium, top-tier automotive package backed by HDFC Group, bringing massive garage networks and reliable dispute resolution.",
      facts: [
        "Claim Settlement Ratio (CSR): Consistent top performer with a 99.80% CSR.",
        "Cashless network: One of the largest partner mechanics and cashless garage networks in India.",
        "Add-ons: Zero Depreciation, Engine Cover, Return to Invoice, Roadside Assistance.",
        "Stability: Supported by massive financial reserves (HDFC Group + Munich Re)."
      ],
      suitableFor: ["Those seeking widest garage network coverage", "Maximum peace of mind"],
      links: { official: "https://www.hdfcergo.com/motor-insurance/car-insurance" }
    },
    {
      title: "Tata AIG Motor Insurance",
      category: "motor_insurance",
      summary: "Backed by the trusted Tata brand, this package offers extensive custom add-ons and premium 24x7 roadside support.",
      facts: [
        "Claim Settlement Ratio (CSR): ~98% with clean historical audits.",
        "Support: 24x7 emergency roadside assistance and towing included in select plans.",
        "Customization: Over 15 specialized add-ons like Tyre Secure, Engine Secure, Return to Invoice, and NCB Protection (keep your discount even after 1 claim).",
        "EV Add-on: EV-specific coverage covering electrical charging damage, short circuits, and self-heating."
      ],
      suitableFor: ["Electric Vehicle (EV) owners", "Those needing numerous specialized protective riders"],
      links: { official: "https://www.tataaig.com/motor-insurance/car-insurance" }
    }
  ],
  life_insurance: [
    {
      title: "HDFC Life Sanchay Plus (Spl)",
      category: "life_insurance",
      summary: "An individual, non-participating, non-linked savings life insurance plan. Highly robust, stable, and brings zero market risk. All benefits are 100% guaranteed.",
      facts: [
        "Entry Age: 5 to 60 years. Premium Modes: Monthly, Quarterly, Half-yearly, Annual.",
        "Tax benefits: Eligible for Section 80C benefits (up to ₹1.5 lakh/year) and tax-exempt payouts under Section 10(10D).",
        "Guaranteed Maturity Variant: Pays a guaranteed lump sum. E.g., Age 22, premium of ₹10,000/month, 9-year pay term, 16-year policy term gives ₹21,68,621 guaranteed maturity amount.",
        "Long Term Income Variant: Pays a guaranteed fixed income for 25 or 30 years after the policy term, plus returns 100% of the premium paid as a lump sum at the end. E.g., Age 22, ₹10,000/month premium, 15-year policy term gives ₹11,371 monthly payout for 25 years. Final payout at Year 40 is ₹12,48,854. Total payout is ₹54.6 lakhs against ₹10.28 lakhs premium.",
        "Surrender Value: Eligible for Guaranteed Surrender Value (GSV) or Special Surrender Value (SSV). Year 1: ₹59,828 | Year 5: ₹4,02,262 | Year 9: ₹9,74,666 (close to break-even)."
      ],
      suitableFor: ["Risk-averse savers", "Parents planning for education", "Pension/Retirement planning seeking market-insulated returns"],
      links: { official: "https://www.hdfclife.com/savings-plans/sanchay-plus" }
    },
    {
      title: "HDFC Life Sanchay Par Advantage",
      category: "life_insurance",
      summary: "A participating savings plan. Unlike Sanchay Plus, it can pay additional non-guaranteed cash bonuses in addition to the guaranteed income, based on HDFC Life's performances.",
      facts: [
        "Types: Offers Immediate Income and Deferred Income payout structures.",
        "Bonus element: Cash bonuses (if declared) can significantly boost overall yields.",
        "Life Cover: Includes standard life insurance cover along with growth options."
      ],
      suitableFor: ["Investors okay with slight returns variability for higher upside"],
      links: { official: "https://www.hdfclife.com/savings-plans/sanchay-par-advantage" }
    }
  ],
  mutual_funds: [
    {
      title: "High Risk - High Returns",
      category: "mutual_funds",
      summary: "Happequity's High Risk portfolio is optimized for long-term aggressive wealth accumulation, focusing on Small Cap and Value funds for investors with 7-10+ year horizons.",
      facts: [
        "Axis Value Fund (Risk Score 75): Value investing strategy to buy undervalued companies. Fits 7-10 yr horizon.",
        "Bandhan Small-cap Fund (Risk Score 80): Invests deep into growing small-cap enterprises. Highly volatile but exponential potential score.",
        "Edelweiss Small-cap Fund (Risk Score 80): Diversified, agile small-cap portfolio matching Bandhan Small-Cap.",
        "SEBI regulation: Regulated by SEBI, NAV calculated daily.",
        "Caution: Small-cap and specialized sector funds can slide 40-50% in short bear cycles."
      ],
      suitableFor: ["Young investors (20-35 years) with aggressive timelines", "High risk tolerance"],
    },
    {
      title: "Moderate Risk - Moderate Returns",
      category: "mutual_funds",
      summary: "These funds strike a harmonious balance between capital preservation and steady equity upside, using hybrids, mid-caps, and ELSS plans.",
      facts: [
        "Bandhan Hybrid Equity Fund (Risk Score 50): Keeps 65% to 80% in equities and the rest in safe bonds to shield against volatility.",
        "Bandhan Midcap Fund (Risk Score 60): Directs assets to mid-sized giants for high performance with less volatility than small-caps.",
        "Bandhan Multi-cap Fund (Risk Score 40): Highly diversified across large, mid, and small stocks in a balanced ratio.",
        "Edelweiss Aggressive Hybrid (Risk Score 55): Target ~50% in blue-chip equities plus active debt.",
        "Edelweiss Balanced Advantage Funds (Risk Score 50): Dynamically rebalances equity and debt depending on current market heat.",
        "ELSS Tax Savers: Samco ELSS (Risk 50), Mahindra Manulife ELSS (Risk 55), and Baroda BNP Paribas ELSS (Risk 55) which qualify for Section 80C deductions."
      ],
      suitableFor: ["Investors with 5-7 year horizons", "Moderate portfolios seeking beats over fixed deposits (FD) with lower risk than small-caps"]
    },
    {
      title: "Low Risk - Low Returns",
      category: "mutual_funds",
      summary: "Focuses on massive, highly stable Blue-chip (Large Cap) corporations and high-yield dividend-paying setups, emphasizing security and passive dividend payouts.",
      facts: [
        "Bandhan Large Cap Fund (Risk Score 25): Invests directly in the top 100 Indian companies by market capitalization. Most stable.",
        "Union Large-cap Fund (Risk Score 25): Conservative equity growth focus.",
        "Tata Dividend Yield Fund (Risk Score 30): Focuses on companies with stable, heavy dividend track records for passive dividend inflows.",
        "Quant Large-cap (Risk Score 25): A quantitative-driven portfolio of large-cap blue-chips.",
        "Market slide: Much less volatile than mid/small cap; typically drops only 15-20% in sharp bear markets."
      ],
      suitableFor: ["Conservative investors seeking stable equity exposure", "Those nearing retirement wanting capital security"]
    },
    {
      title: "ELSS (Equity Linked Savings Schemes) & Tax-Regime Benefits",
      category: "mutual_funds",
      summary: "Tax saving mutual funds that carry a mandatory 3-year lock-in per instalment (the shortest of any tax-saving route).",
      facts: [
        "Provides tax deductions of up to ₹1.5 Lakhs per year under Section 80C (Old Tax Regime). Not applicable to New Tax Regime.",
        "Shortest lock-in: Only 3 years, compared to 5 years for tax FDs, or 15 years for PPF.",
        "LTCG Taxation: 12.5% taxation on long-term capital gains exceeding ₹1.25 Lakhs per year (as per newest FY 2024-25 Union Budget rules). High liquidity post lock-in."
      ],
      suitableFor: ["Tax-savers in the Old Tax Regime", "Investors targeting tax relief with equity growth potential"]
    },
    {
      title: "SIP versus Fixed Deposit (FD) Comparisons",
      category: "mutual_funds",
      summary: "Systematic Investment Plans (SIP) and Fixed Deposits (FD) serve different financial purposes. SIPS emphasize wealth compounding, while FDs guarantee liquidity and nominal safety.",
      facts: [
        "Returns: SIP returns are market-linked (historically returning 10-14% CAGR over 10+ years), whereas FDs are fixed (typically 6.5-8% p.a. depending on tenure).",
        "Taxation: FD interest is taxed every single year at your regular tax slab rate. Equity SIP gains are only taxed as LTCG (12.5%) when actually redeemed.",
        "Compounding Example: A ₹5,000/month SIP over 10 years at a 12% CAGR produces approximately ₹11.6 Lakhs. The same ₹5,000/month in a 7% FD yields ~₹8.7 Lakhs."
      ],
      suitableFor: ["Emergency fund reserves belong in FDs (1-3 yr timeline)", "Wealth building lives in SIPs (5+ yr timeline)"]
    }
  ],
  tradinguru_course: [
    {
      title: "Tradinguru Course Modules",
      category: "tradinguru_course",
      summary: "Happequity's flag-ship training curricula designed to teach beginners and intermediates professional trading tactics.",
      facts: [
        "Module 1: Fundamental Analysis: Involves a live real-time analysis project studying company sheets, statements, and management credentials.",
        "Module 2: Technical Analysis: Covering advanced chart patterns, trend lines, volume analysis, moving averages, and indicators.",
        "Module 3: Option Strategy: Involves teaching options metrics (greeks), hedging, buying/selling, spreads, and butterfly setups.",
        "Module 4: Fake-out Strategy: Special proprietary module teaching interns and clients how to identify false breakouts, entrapments, and institutional manipulations to secure trades."
      ],
      suitableFor: ["Aspiring trading professionals", "College interns looking to master market mechanics"]
    }
  ],
  demat_accounts: [
    {
      title: "Demat Accounts (via Wealthy)",
      category: "demat_accounts",
      summary: "Premium trading and custody accounts setup facilitated through Happequity's partner 'Wealthy', giving immediate access to all asset types.",
      facts: [
        "Seamless digital account setup handled via Wealthy partnership.",
        "Access: Allows investments into equities, mutual funds, gold, and debt bonds under a single master sign-in.",
        "Analytics: Features professional dashboard trackers, portfolio suggestions, and automated rebalancing warnings.",
        "Cost-effective brokerages with transparent charges and no secret fees."
      ],
      suitableFor: ["Any prospect looking to start investing", "Interns setting up accounts for friends & family"]
    }
  ],
  travel_insurance: [
    {
      title: "Travel Insurance Partnerships",
      category: "travel_insurance",
      summary: "Happequity facilitates global travel insurance through top partnerships: Tata AIG and Care Travel insurance.",
      facts: [
        "Coverage: Emergency medical evacuations, baggage losses, flight delays, passport thefts, and dental emergency payouts.",
        "Customized plans for students studying internationally or corporate teams flying globally.",
        "Cash-less medical claims on-ground in foreign nations."
      ],
      suitableFor: ["Students studying abroad", "Frequent flyers", "Corporate group travels"]
    }
  ],
  marine_insurance: [
    {
      title: "Marine & Cargo Commercial Insurance",
      category: "marine_insurance",
      summary: "Commercial protection covering transit damage, terminal loss, and oceanic transport container incidents.",
      facts: [
        "Protects freight from the moment of dispatch up to final custom receipts (warehouse-to-warehouse).",
        "Includes protection for physical Hull and Machinery, Cargo damage, and Freight liability.",
        "Advisory available directly via Happequity advisors to calculate precise freight risks."
      ],
      suitableFor: ["Exporters, Importers, and Logistic operators", "Manufacturing clients"]
    }
  ]
};
