import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Send, 
  Bot, 
  HelpCircle, 
  Laptop, 
  PhoneCall, 
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  CheckCircle,
  FileText,
  Lock,
  LockOpen,
  Info
} from "lucide-react";
import SidebarProducts from "./components/SidebarProducts";
import LeadPopup from "./components/LeadPopup";
import AdminLeads from "./components/AdminLeads";
import { productsData } from "./productsData";
import { Message, Lead } from "./types";

export default function App() {
  // Chat state
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "init-1",
      sender: "riya",
      text: "Hello! I am riya, your financial education assistant from Happequity. I can compare insurance rates, describe high-growth Sanchay savings models, or check mutual fund risk scales with you.\n\nTo make our summer interns' campaigns easier and receive a Free Scam Prevention Guide PDF to your email, feel free to ask me questions, or click any of the custom product panels on the left!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messageCount, setMessageCount] = useState(0);

  // Selected Product for quick informative boards
  const [selectedCategoryId, setSelectedCategoryId] = useState("life_insurance");
  const [selectedCategoryName, setSelectedCategoryName] = useState("Life Insurance");

  // Leads state
  const [leads, setLeads] = useState<Lead[]>([]);
  const [leadsCount, setLeadsCount] = useState(0);
  const [isLeadsLoading, setIsLeadsLoading] = useState(false);

  // Layout UI Toggles
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom on chatbot updates
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // Fetch initial leads for the live directory
  const fetchLeads = async () => {
    setIsLeadsLoading(true);
    try {
      const res = await fetch("/api/leads");
      const data = await res.json();
      if (data.leads) {
        setLeads(data.leads);
        setLeadsCount(data.leads.length);
      }
    } catch (err) {
      console.warn("Failed to fetch leads list, operating in safe client-state mode.");
    } finally {
      setIsLeadsLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  // Send message API caller
  const handleSendMessage = async (customText?: string) => {
    const textToSend = customText ? customText.trim() : inputMessage.trim();
    if (!textToSend) return;

    if (!customText) {
      setInputMessage("");
    }

    const userMsgId = "msg-" + Date.now();
    const newUserMsg: Message = {
      id: userMsgId,
      sender: "user",
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, newUserMsg]);
    setIsTyping(true);
    setMessageCount((prev) => prev + 1);

    try {
      const chatPayload = [...messages, newUserMsg];
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: chatPayload })
      });

      const data = await response.json();
      
      const riyaMsg: Message = {
        id: "riya-" + Date.now(),
        sender: "riya",
        text: data.text || "Hello! I received your inquiry and I am looking up the proper Happequity quote for you.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, riyaMsg]);
    } catch (error) {
      console.error("Chat service connection issues:", error);
      const fallbackRiyaMsg: Message = {
        id: "riya-fb-" + Date.now(),
        sender: "riya",
        text: "I am having difficulty reaching my Happequity secure backchannel, but I am still available offline! Based on your target request, let us structure a custom callback. Simply fill out our secure Scam Prevention popup form below and our team will telephone you in under 10 minutes!",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, fallbackRiyaMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  // Product Selection handler
  const handleCategorySelection = (id: string, name: string) => {
    setSelectedCategoryId(id);
    setSelectedCategoryName(name);

    // Auto-chat on behalf of user to explain the topic
    const selectProverbs: Record<string, string> = {
      health_insurance: "Can you help me compare our Health Insurance partners like HDFC Ergo and Care Health?",
      motor_insurance: "What are the motor insurance benefits? Tell me about Acko direct rates versus Digit video claims.",
      life_insurance: "Explain Happequity's HDFC Sanchay Plus model and why income variants are 100% guaranteed.",
      mutual_funds: "Describe Happequity's Mutual Funds categories. What is the difference between AXIS small-cap risk scores and FDs?",
      tradinguru_course: "Tell me about the modules inside the Tradinguru course. How does the fake-out breakout strategy work?",
      demat_accounts: "How can I set up a Demat Account with Wealthy?",
      travel_insurance: "What transit risks does travel insurance cover for students moving abroad?",
      marine_insurance: "Outline ocean transit and cargo marine insurance coverage details."
    };

    const textInput = selectProverbs[id] || `Can you tell me more about ${name} services?`;
    handleSendMessage(textInput);
  };

  const handleLeadCaptured = (newLead: Lead) => {
    // Add to local state for instant list feedback
    setLeads((prev) => [newLead, ...prev]);
    setLeadsCount((prev) => prev + 1);

    // Add chatbot message confirming callback SLA
    setMessages((prev) => [
      ...prev,
      {
        id: "system-" + Date.now(),
        sender: "riya",
        text: `🎉 Thank you, ${newLead.name}! I have successfully transmitted your campaign metrics to our summer intern directory.\n\nYour Free Scam Awareness Guide PDF has been dispatched to ${newLead.email}. A certified Happequity advisor will reach you at ${newLead.phone} within 10 minutes to deliver exact quotation files!\n\nReference Category: ${newLead.areaOfInterest.replace("_", " ").toUpperCase()}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  const activeCategoryDetails = productsData[selectedCategoryId] || [];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans" id="app-root">
      
      {/* 1. PROFESSIONAL sapphire BRAND HEADER (Geometric Balance Theme) */}
      <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-6 sm:px-10 shrink-0 sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center shadow-md">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
            </svg>
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900">
              Riya <span className="text-indigo-600">Assistant</span>
            </h1>
            <p className="text-[9px] sm:text-xs text-slate-400 font-medium uppercase tracking-widest">Powered by Happequity</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right mr-2 hidden sm:block">
            <p className="text-sm font-semibold text-slate-800">Happequity</p>
            <p className="text-[10px] text-slate-400 uppercase tracking-wider">Empowering Wealth</p>
          </div>
          <div className="w-12 h-12 bg-white rounded-lg border border-slate-200/80 flex items-center justify-center p-0.5 overflow-hidden shrink-0 shadow-xs relative">
            <img 
              src="/assets/happequity_logo.svg" 
              alt="Happequity Logo" 
              className="w-full h-full object-contain"
              referrerPolicy="no-referrer"
            />
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></span>
          </div>
        </div>
      </header>

      {/* 2. THE THREE-PANEL MASTER WORKSPACE */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* PANEL A: PRODUCTS INTERACTIVE SIDEBAR & HELP INFO */}
        <section className="lg:col-span-4 flex flex-col gap-4">
          
          {/* Clickable side list */}
          <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs flex flex-col">
            <SidebarProducts 
              onSelectCategory={handleCategorySelection} 
              activeCategory={selectedCategoryId} 
            />
          </div>

          {/* Mini product spec sheet board */}
          <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
                <Info className="w-4 h-4 text-indigo-500" />
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                  {selectedCategoryName} Specs Catalog
                </h4>
              </div>

              <div id="product-details-content" className="mt-3 space-y-4 max-h-[300px] overflow-y-auto pr-1">
                {activeCategoryDetails.map((detail, index) => (
                  <div key={index} className="space-y-2 bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <div className="flex justify-between items-start gap-2">
                      <h5 className="font-bold text-xs text-slate-900 leading-tight">
                        {detail.title}
                      </h5>
                      {detail.links?.official && (
                        <a 
                          href={detail.links.official} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-[10px] text-indigo-600 hover:text-indigo-700 font-semibold flex items-center gap-0.5 whitespace-nowrap shrink-0"
                          title="View Official Portal"
                        >
                          Official <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      )}
                    </div>
                    
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      {detail.summary}
                    </p>

                    <div className="pt-2 space-y-1.5 border-t border-slate-200/60">
                      <span className="block text-[10px] font-bold text-slate-500 uppercase">
                        Key Parameters:
                      </span>
                      <ul className="list-disc pl-3 text-[10px] text-slate-500 space-y-1 leading-normal">
                        {detail.facts.slice(0, 4).map((f, i) => (
                          <li key={i}>{f}</li>
                        ))}
                      </ul>
                    </div>

                    {detail.suitableFor && detail.suitableFor.length > 0 && (
                      <p className="text-[10px] text-slate-500 mt-1 leading-relaxed">
                        🎯 <strong className="text-slate-600">Ideal for:</strong> {detail.suitableFor.join(", ")}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 mt-2 flex items-center gap-2">
              <PhoneCall className="w-3.5 h-3.5 text-indigo-600 animate-pulse" />
              <p className="text-[10px] text-slate-500 font-medium">
                Want custom quotes ready? Call SLA in 10 mins.
              </p>
            </div>
          </div>

        </section>

        {/* PANEL B: THE CORE CHAT CONVERTER */}
        <section className="lg:col-span-8 flex flex-col bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden min-h-[500px]">
          
          {/* Chat Header */}
          <div className="bg-slate-900 text-white px-5 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-500/10 text-indigo-400 rounded-lg border border-indigo-400/20">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm tracking-tight flex items-center gap-1.5 text-white">
                  riya
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                </h3>
                <p className="text-[10px] text-slate-400">
                  Securely connected with Google AI Studio API
                </p>
              </div>
            </div>

            {/* Admin toggle */}
            <button
              onClick={() => setIsAdminOpen(!isAdminOpen)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                isAdminOpen 
                  ? "bg-amber-500/20 text-amber-300 border border-amber-400/30" 
                  : "bg-slate-800 text-slate-300 hover:text-white border border-slate-700/60 hover:bg-slate-700"
              }`}
              id="admin-dashboard-toggle"
              title="Intern Campaign Leads Directory"
            >
              {isAdminOpen ? (
                <>
                  <LockOpen className="w-3.5 h-3.5 text-amber-400" />
                  Hide Intern Directory
                </>
              ) : (
                <>
                  <Lock className="w-3.5 h-3.5" />
                  Intern Campaign Portal
                </>
              )}
            </button>
          </div>

          {/* Active Screens router */}
          <div className="flex-1 flex flex-col min-h-0 relative">
            <AnimatePresence mode="wait">
              {isAdminOpen ? (
                <motion.div
                  key="admin"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="absolute inset-0 z-10 bg-slate-900 overflow-y-auto p-4"
                >
                  <AdminLeads leads={leads} onRefresh={fetchLeads} isLoading={isLeadsLoading} />
                </motion.div>
              ) : null}
            </AnimatePresence>

            {/* Chat Messages */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-5 space-y-4 bg-slate-50/50"
              id="chat-messages-box"
            >
              {messages.map((msg) => {
                const isRiya = msg.sender === "riya";
                return (
                  <div
                    key={msg.id}
                    className={`flex gap-3 max-w-[85%] ${
                      isRiya ? "mr-auto text-left" : "ml-auto flex-row-reverse text-right"
                    }`}
                  >
                    {isRiya && (
                      <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0 shadow-xs border border-indigo-200">
                        <Bot className="w-4 h-4" />
                      </div>
                    )}
                    <div className="space-y-1">
                      <div
                        className={`p-3 rounded-2xl text-xs leading-relaxed whitespace-pre-wrap ${
                          isRiya
                            ? "bg-white text-slate-800 rounded-tl-none border border-slate-200 shadow-xs"
                            : "bg-indigo-600 text-white rounded-tr-none shadow-sm"
                        }`}
                      >
                        {msg.text}
                      </div>
                      <span className="block text-[9px] text-slate-400 font-mono mt-0.5 px-1">
                        {msg.timestamp}
                      </span>
                    </div>
                  </div>
                );
              })}

              {isTyping && (
                <div className="flex gap-3 max-w-[80%] mr-auto">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0 border border-indigo-200">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-slate-200 shadow-xs">
                    <div className="flex gap-1.5 items-center justify-center py-1 px-2">
                      <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce delay-0"></span>
                      <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce delay-150"></span>
                      <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce delay-300"></span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Helper Suggestion Pills */}
            <div className="px-5 py-2.5 bg-white border-t border-slate-100/60 overflow-x-auto flex items-center gap-1.5 scrollbar-thin">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider shrink-0 mr-1">
                Quick Questions:
              </span>
              <button
                onClick={() => handleSendMessage("Is my money safe in HDFC Life Sanchay Plus? What are the returns?")}
                className="text-[10px] bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-800 border border-slate-100 px-3 py-1 rounded-full whitespace-nowrap"
              >
                Is Sanchay Plus safe?
              </button>
              <button
                onClick={() => handleSendMessage("Compare health insurance Claim Settlement Ratios for me.")}
                className="text-[10px] bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-800 border border-slate-100 px-3 py-1 rounded-full whitespace-nowrap"
              >
                Compare health CSRs
              </button>
              <button
                onClick={() => handleSendMessage("Which mutual funds are moderate risk according to Happequity score?")}
                className="text-[10px] bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-800 border border-slate-100 px-3 py-1 rounded-full whitespace-nowrap"
              >
                Moderate risk funds
              </button>
              <button
                onClick={() => handleSendMessage("Explain the Tradinguru Course modules and details.")}
                className="text-[10px] bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-800 border border-slate-100 px-3 py-1 rounded-full whitespace-nowrap"
              >
                Tradinguru modules
              </button>
            </div>

            {/* Chat Input */}
            <div className="p-4 bg-white border-t border-slate-200 flex items-center justify-between gap-3">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Ask riya about payouts, risk metrics, or campaign rates..."
                className="flex-1 bg-slate-50 text-slate-800 placeholder-slate-400 rounded-xl px-4 py-3 text-xs border border-slate-200 outline-none focus:ring-1 focus:ring-indigo-500 focus:bg-white transition-all"
                id="chat-input-field"
              />
              <button
                onClick={() => handleSendMessage()}
                id="chat-send-btn"
                className="p-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 hover:shadow-md transition-all shrink-0 cursor-pointer shadow-indigo-100"
                title="Send inquiries"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>

        </section>

      </main>

      {/* 3. PERSISTENT INTERACTIVE CRM POPUP (Starts small, expands triggerCount matches messages) */}
      <LeadPopup onLeadCaptured={handleLeadCaptured} triggerOpenCount={messageCount} />

      {/* 4. FOOTER */}
      <footer className="bg-slate-900 border-t border-slate-800/80 text-slate-500 text-xs px-6 py-6 text-center mt-auto" id="app-footer">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[11px] leading-relaxed">
            © 2026 Happequity Investments & Finance. Assisted by chatbot <strong>riya</strong>. All rights reserved. Registered summer interns campaign gateway.
          </p>
          <div className="flex items-center gap-4 text-[10px] font-semibold text-slate-400">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              100% Secure Gateway
            </span>
            <span>•</span>
            <span className="text-indigo-400 tracking-wider">
              10-MINUTE RECALL SLA ACTIVE
            </span>
          </div>
        </div>
      </footer>

    </div>
  );
}
