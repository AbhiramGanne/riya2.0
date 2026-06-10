import { useState, useEffect } from "react";
import { Copy, Check, Terminal, Users, Database, FileCode, CheckCircle2, RefreshCw } from "lucide-react";
import { Lead } from "../types";

interface AdminLeadsProps {
  leads: Lead[];
  onRefresh: () => void;
  isLoading: boolean;
}

export default function AdminLeads({ leads, onRefresh, isLoading }: AdminLeadsProps) {
  const [copiedScript, setCopiedScript] = useState(false);

  // App Script for direct connection
  const googleAppsScriptCode = `/**
 * Google Sheets App Script - Automated Thank You Email & PDF Dispatcher
 * Instructions:
 * 1. Open your Google Sheet used for lead storage.
 * 2. Click Extensions -> Apps Script.
 * 3. Delete any default code and paste this script.
 * 4. Replace the "DRIVE_FILE_ID" with your uploaded Scam Prevention Guide PDF File ID.
 * 5. Replace "ADMIN_REPRESENTATIVE_EMAIL" with your team lead or intern coordinator email to log SLAs.
 * 6. Save and deploy as an "On Edit" or "Form Submit" trigger.
 */

const DRIVE_FILE_ID = "YOUR_GOOGLE_DRIVE_SCAM_GUIDE_FILE_ID"; // Replace with actual PDF File ID from Google Drive
const ADMIN_EMAIL = "${typeof window !== 'undefined' ? (window as any)._userEmail || 'ganneabhiram0576@gmail.com' : 'ganneabhiram0576@gmail.com'}"; // Lead notification agent

function onLeadCapturedRow(e) {
  try {
    // Assuming columns: A: Timestamp | B: Name | C: Phone | D: Email | E: Area of Interest | F: Consented
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const lastRow = sheet.getLastRow();
    
    const timestamp = sheet.getRange(lastRow, 1).getValue();
    const name = sheet.getRange(lastRow, 2).getValue();
    const phone = sheet.getRange(lastRow, 3).getValue();
    const email = sheet.getRange(lastRow, 4).getValue();
    const areaOfInterest = sheet.getRange(lastRow, 5).getValue();
    
    if (!email || !name) return;

    // 1. Fetch file from Google Drive as attachment
    const pdfFile = DriveApp.getFileById(DRIVE_FILE_ID);
    
    // 2. Draft the Thank You Email with Free Scam Awareness Guide PDF
    const emailSubject = "🎁 Your Free Scam Awareness Guide & Consultation - Happequity";
    
    const emailBody = \`Dear \${name},

Thank you for interacting with our chatbot, Riya, at Happequity! 

As requested, we have attached our exclusive "Scam Awareness & Financial Safety Guide" (PDF) to this email. Empowering yourself against fraudulent financial schemes is the first step toward secure wealth compounding.

What Happens Next?
Based on your logged interest in \${areaOfInterest}, our senior wealth representative is analyzing dynamic options matching your age and profile.
In accordance with our Client SLA, a Happiness Advisor from Happequity will reach out to you at \${phone} within the next 10 minutes to deliver customized quotes and answer any primary enquiries.

If you did not register this or need immediate support, reply directly to this email or visit our portal.

Wishing you a secure compounding journey,
Team Happequity
Investments & Finance Portal
"Secure Your Assets, Multiply Your Peace"\`;

    // Send the email with the attached PDF
    MailApp.sendEmail({
      to: email,
      subject: emailSubject,
      body: emailBody,
      attachments: [pdfFile.getAs(MimeType.PDF)]
    });

    // 3. Trigger 10-Minute Representative SLA Alert to Intern Lead Coordinator
    const slaSubject = "🚨 HOT LEAD SLA - 10 Min Callback Required: " + name;
    const slaBody = \`ALERT: New hot lead captured by Riya Chatbot campaign!
    
Lead Details:
- Name: \${name}
- Phone: \${phone}
- Email: \${email}
- Area of Interest: \${areaOfInterest}
- Time Logged: \${timestamp}

Representative SLA Action:
Please assign an active sumer intern to telephone \${name} at \${phone} within 10 minutes of lead capture for immediate assistance.\`;

    MailApp.sendEmail(ADMIN_EMAIL, slaSubject, slaBody);
    
    Logger.log("Email and SLA alerts executed successfully for " + email);
  } catch(error) {
    Logger.log("Error running automation script: " + error.toString());
  }
}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(googleAppsScriptCode);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 3000);
  };

  return (
    <div id="admin-portal" className="bg-slate-900 text-slate-100 rounded-2xl p-6 border border-slate-800 shadow-xl space-y-6">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-indigo-500/10 text-indigo-400 rounded-xl border border-indigo-500/20">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold tracking-tight text-white flex items-center gap-2">
              Intern Lead Gen Board
              <span className="text-[10px] uppercase tracking-wider bg-indigo-500/20 text-indigo-300 font-semibold px-2 py-0.5 rounded-full border border-indigo-400/20">
                Hot Leads Tracker
              </span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Campaign overview. Riya chatbot routes hot prospects here for interns calling.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onRefresh}
            disabled={isLoading}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white rounded-xl transition-all cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`} />
            Refresh Leads
          </button>
        </div>
      </div>

      {/* Grid: Lead Table + Apps Script instructions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Table */}
        <div className="lg:col-span-7 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Database className="w-4 h-4 text-indigo-400" />
              Live Lead Directory ({leads.length})
            </h4>
            <span className="text-[10px] text-slate-500">
              * Stored securely on Express Backend
            </span>
          </div>

          <div className="bg-slate-950/80 rounded-xl border border-slate-800/80 overflow-hidden min-h-[220px] flex flex-col justify-between">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-medium">
                    <th className="p-3">Name</th>
                    <th className="p-3">Phone</th>
                    <th className="p-3">Email</th>
                    <th className="p-3">Product Interest</th>
                    <th className="p-3 text-right">Captured</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-900/60 text-slate-300">
                  {leads.map((lead) => (
                    <tr key={lead.id || lead.timestamp} className="hover:bg-slate-900/40 transition-colors">
                      <td className="p-3 font-semibold text-white">{lead.name}</td>
                      <td className="p-3 font-mono text-indigo-400">{lead.phone}</td>
                      <td className="p-3 font-mono">{lead.email}</td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 bg-slate-800 text-slate-300 rounded text-[10px] uppercase font-medium">
                          {lead.areaOfInterest.replace("_", " ")}
                        </span>
                      </td>
                      <td className="p-3 text-right text-slate-500 font-mono text-[10px] whitespace-nowrap">
                        {lead.timestamp?.split(",")[1]?.trim() || "Just Now"}
                      </td>
                    </tr>
                  ))}
                  {leads.length === 0 && (
                    <tr>
                      <td colSpan={5} className="p-8 text-center text-slate-600 font-medium">
                        No prospect logs captured yet. Engage with Riya or complete the Popup to register.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="p-3.5 bg-slate-900/50 border-t border-slate-800/60 text-[11px] text-slate-400 leading-normal flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>
                These hot leads have simulated connection parameters ready to synchronize with a Spreadsheet database row.
              </span>
            </div>
          </div>
        </div>

        {/* Right: Apps Script */}
        <div className="lg:col-span-5 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <FileCode className="w-4 h-4 text-amber-500" />
              Google Apps Script Extension
            </h4>
            <button
              onClick={copyToClipboard}
              className="flex items-center gap-1 text-[10px] font-semibold text-indigo-400 hover:text-indigo-300 px-2 py-1 bg-indigo-500/10 rounded-lg border border-indigo-500/20 hover:bg-indigo-500/20 transition-all cursor-pointer"
            >
              {copiedScript ? (
                <>
                  <Check className="w-3 h-3 text-emerald-500" />
                  Copied Script!
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  Copy Script Code
                </>
              )}
            </button>
          </div>

          <div className="bg-slate-950/80 rounded-xl border border-slate-800/80 p-4 space-y-3 flex-1 flex flex-col justify-between">
            <div className="space-y-2 text-xs text-slate-400 leading-normal">
              <p>
                To automatically dump captured prospective numbers into your spreadsheet and trigger instant email replies:
              </p>
              <ol className="list-decimal pl-4 space-y-1.5">
                <li>Create your Google Sheet for lead storage.</li>
                <li>Go to <strong className="text-slate-200">Extensions &gt; Apps Script</strong>.</li>
                <li>Clear the default block and paste this fully automated script.</li>
                <li>Set up active triggers on <strong className="text-slate-200">Edit / Form Submit</strong> actions.</li>
              </ol>
            </div>

            <div className="mt-2 text-slate-500 bg-slate-900 p-2.5 rounded-lg border border-slate-800/60 flex items-center gap-2.5">
              <Terminal className="w-4 h-4 text-indigo-400 shrink-0 animate-pulse" />
              <div className="text-[10px] font-mono leading-tight">
                // Dispatches Free Scam PDF<br />
                // Enforces 10-Minute Lead SLAs
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
