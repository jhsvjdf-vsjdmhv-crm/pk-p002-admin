/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Copy, Check, Plus, Send, ExternalLink, ArrowLeft, 
  MessageSquare, Users, FileText, Settings, ShieldCheck, HelpCircle, AlertCircle
} from 'lucide-react';

interface RepaymentItem {
  repaidTime: string;
  method: string;
  type: string;
  amount: string;
  serialNo: string;
  collector: string;
}

interface MessageItem {
  id: string;
  time: string;
  sender: string;
  type: string;
  content: string;
  status: string;
}

interface ContactItem {
  name: string;
  relation: string;
  phone: string;
  status: string;
}

export default function App() {
  const [activeTab, setActiveTab] = useState<'order' | 'msg' | 'contact' | 'setup'>('order');
  const [copied, setCopied] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modals state
  const [showAddCollectionModal, setShowAddCollectionModal] = useState(false);
  const [showPartialModal, setShowPartialModal] = useState(false);
  const [showExtensionModal, setShowExtensionModal] = useState(false);

  // Repayments State
  const [repayments, setRepayments] = useState<RepaymentItem[]>([
    {
      repaidTime: '2023-04-19 11:02:40',
      method: 'InPay',
      type: 'Partial Payment Overdue',
      amount: '10,000.00',
      serialNo: 'I230419105522294386659172611037',
      collector: 'AP-S2-21'
    },
    {
      repaidTime: '2023-04-18 11:07:48',
      method: 'InPay',
      type: 'Partial Payment Overdue',
      amount: '19,000.00',
      serialNo: 'I230418110132133868904445700098',
      collector: 'AP-S2-21'
    }
  ]);

  // New Collection Record Form
  const [newAmount, setNewAmount] = useState('5000.00');
  const [newMethod, setNewMethod] = useState('InPay');
  const [newType, setNewType] = useState('Partial Payment');

  // Customer Messages mock data
  const [messages] = useState<MessageItem[]>([
    { id: '1', time: '2026-11-18 14:22:10', sender: 'System', type: 'SMS Reminder', content: 'Dear PRAJNA G, your Mast Loan of ₹16,900 is due on 19-Nov-2026. Please repay promptly to avoid late fees.', status: 'Delivered' },
    { id: '2', time: '2026-11-17 09:15:00', sender: 'Collection Agent AP-S2-21', type: 'Call Log', content: 'Customer promised settlement by evening.', status: 'Completed' },
    { id: '3', time: '2026-11-13 10:05:33', sender: 'System', type: 'Loan Approval', content: 'Mast Loan application approved. Amount Disbursed: ₹8,340.', status: 'Success' }
  ]);

  // Contact list mock data
  const [contacts] = useState<ContactItem[]>([
    { name: 'Ramesh G', relation: 'Father', phone: '9845123456', status: 'Verified' },
    { name: 'Suresh Kumar', relation: 'Colleague', phone: '9741234567', status: 'Active' },
    { name: 'Priya G', relation: 'Spouse', phone: '9448112233', status: 'Verified' }
  ]);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleCopyLink = () => {
    const link = 'https://mastloan.example.com/pay/no-9534973788293717-1';
    navigator.clipboard.writeText(link).then(() => {
      setCopied(true);
      triggerToast('Payment link copied to clipboard!');
      setTimeout(() => setCopied(false), 1500);
    }).catch(() => {
      triggerToast('Copied successfully!');
    });
  };

  const handleAddCollection = (e: React.FormEvent) => {
    e.preventDefault();
    const newRecord: RepaymentItem = {
      repaidTime: new Date().toISOString().replace('T', ' ').substring(0, 19),
      method: newMethod,
      type: newType,
      amount: newAmount,
      serialNo: 'I' + Date.now() + Math.floor(Math.random() * 1000),
      collector: 'AP-S2-21'
    };
    setRepayments([newRecord, ...repayments]);
    setShowAddCollectionModal(false);
    triggerToast('Collection record added successfully!');
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans antialiased pb-12">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-md shadow-lg text-sm flex items-center gap-2 animate-bounce">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <header className="h-[51px] flex items-center justify-between px-3 md:px-4 shadow-[0_1px_4px_rgba(0,0,0,0.15)] bg-white sticky top-0 z-40">
        <div className="flex items-center gap-1.5 text-[15px] font-medium text-slate-900">
          <span className="w-[19px] h-[19px] border-[1.5px] border-slate-900 rounded-full inline-flex items-center justify-center text-[11px] font-bold">¥</span>
          <span>PK-P002</span>
          <em className="text-xs italic text-slate-600 font-serif">Admin</em>
          <span>Management System</span>
          <small className="text-[10px] text-slate-500 ml-2 bg-slate-100 px-1.5 py-0.5 rounded">VERSION: 100.29-50</small>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <button 
            onClick={() => setActiveTab('setup')}
            className="hidden md:flex items-center gap-1.5 text-xs bg-blue-50 text-blue-700 hover:bg-blue-100 px-3 py-1.5 rounded font-medium transition-colors"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Local Setup Guide</span>
          </button>
          <div className="flex items-center gap-2">
            <div className="w-[23px] h-[23px] rounded-full bg-slate-900 relative inline-block">
              <div className="absolute left-[8px] top-[5px] w-[7px] h-[7px] rounded-full bg-white"></div>
              <div className="absolute left-[5px] top-[13px] w-[13px] h-[7px] rounded-t-[7px] bg-white"></div>
            </div>
            <span className="font-semibold text-xs">AP-S2-21</span>
            <div className="w-[13px] h-[13px] border-2 border-blue-600 rounded-full ml-1"></div>
          </div>
        </div>
      </header>

      {/* Tabs & Action Bar */}
      <div className="max-w-[1366px] mx-auto px-4 mt-4 flex flex-col lg:flex-row lg:items-end justify-between border-b border-slate-200 pb-2 gap-4">
        <nav className="flex items-center gap-1 overflow-x-auto">
          <button 
            onClick={() => setActiveTab('order')}
            className={`text-sm md:text-[15px] px-3.5 h-[38px] flex items-center transition-colors whitespace-nowrap ${activeTab === 'order' ? 'text-[#1a56c4] border-b-2 border-[#1a73e8] font-medium' : 'text-slate-700 hover:text-slate-900'}`}
          >
            Order Information
          </button>
          <button 
            onClick={() => setActiveTab('msg')}
            className={`text-sm md:text-[15px] px-3.5 h-[38px] flex items-center transition-colors whitespace-nowrap ${activeTab === 'msg' ? 'text-[#1a56c4] border-b-2 border-[#1a73e8] font-medium' : 'text-slate-700 hover:text-slate-900'}`}
          >
            Customer Message
          </button>
          <button 
            onClick={() => setActiveTab('contact')}
            className={`text-sm md:text-[15px] px-3.5 h-[38px] flex items-center transition-colors whitespace-nowrap ${activeTab === 'contact' ? 'text-[#1a56c4] border-b-2 border-[#1a73e8] font-medium' : 'text-slate-700 hover:text-slate-900'}`}
          >
            Contact List
          </button>
          <button 
            onClick={() => setActiveTab('setup')}
            className={`text-sm md:text-[15px] px-3.5 h-[38px] flex items-center transition-colors whitespace-nowrap ${activeTab === 'setup' ? 'text-[#1a56c4] border-b-2 border-[#1a73e8] font-medium' : 'text-slate-700 hover:text-slate-900'}`}
          >
            Local Dev Setup
          </button>
        </nav>

        <div className="flex flex-wrap items-center gap-2">
          <button 
            onClick={() => setShowAddCollectionModal(true)}
            className="bg-[#1a73e8] hover:bg-blue-700 text-white border-0 rounded px-3 h-[32px] text-xs font-medium cursor-pointer transition-colors flex items-center gap-1 shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Collection Record</span>
          </button>
          <button 
            onClick={() => {
              setShowPartialModal(true);
              triggerToast('Partial repayment dispatch panel opened');
            }}
            className="bg-[#1a73e8] hover:bg-blue-700 text-white border-0 rounded px-3 h-[32px] text-xs font-medium cursor-pointer transition-colors shadow-sm"
          >
            Send Partial Repayment
          </button>
          <button 
            onClick={() => {
              handleCopyLink();
              triggerToast('Repayment link generated and copied!');
            }}
            className="bg-[#1a73e8] hover:bg-blue-700 text-white border-0 rounded px-3 h-[32px] text-xs font-medium cursor-pointer transition-colors shadow-sm"
          >
            Send Repayment Links
          </button>
          <button 
            onClick={() => {
              setShowExtensionModal(true);
              triggerToast('Extension link panel opened');
            }}
            className="bg-[#1a73e8] hover:bg-blue-700 text-white border-0 rounded px-3 h-[32px] text-xs font-medium cursor-pointer transition-colors shadow-sm"
          >
            Send Extension links
          </button>
          <button 
            onClick={() => triggerToast('Returned to main queue')}
            className="bg-white text-slate-800 border border-slate-300 rounded-[3px_0_0_3px] px-3 h-[32px] text-xs font-medium cursor-pointer hover:bg-slate-50 transition-colors"
          >
            Back
          </button>
        </div>
      </div>

      <main className="max-w-[1366px] mx-auto px-4 mt-4">
        {activeTab === 'order' && (
          <>
            {/* Customer Basic Information Card */}
            <section className="border border-slate-200 rounded bg-white shadow-sm overflow-hidden">
              <h3 className="m-0 font-normal italic text-[15px] px-6 h-[46px] leading-[44px] bg-[#f5f6f8] border-b border-slate-200">
                Customer Basic Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[457px_455px_1fr] p-6 relative gap-y-3 lg:gap-y-0">
                <div className="space-y-3">
                  <div className="h-[39.5px] flex items-center text-sm"><span className="mr-5 text-slate-500 w-44">Order No.:</span><span className="font-medium">no-9534973788293717-1</span></div>
                  <div className="h-[39.5px] flex items-center text-sm"><span className="mr-5 text-slate-500 w-44">Name:</span><span className="font-bold">PRAJNA G</span></div>
                  <div className="h-[39.5px] flex items-center text-sm text-[#c0282d]"><span className="mr-5 text-slate-500 w-44">Regular User:</span><span style={{fontSize: '15px'}} className="font-bold">是</span></div>
                  <div className="h-[39.5px] flex items-center text-sm"><span className="mr-5 text-slate-500 w-44">Mobile No.:</span><span className="font-medium font-mono">8050029634</span></div>
                  <div className="h-[39.5px] flex items-center text-sm"><span className="mr-5 text-slate-500 w-44">Product Name:</span><b>MAST LOAN</b></div>
                  <div className="h-[39.5px] flex items-center text-sm"><span className="mr-5 text-slate-500 w-44">App Name:</span><b>MAST LOAN</b></div>
                  <div className="h-[39.5px] flex items-center text-sm"><span className="mr-5 text-slate-500 w-44">Loan Amount(₹s):</span><span>8,340</span>&nbsp;<b className="text-[#c0282d] ml-1">(Amount Received)</b></div>
                  <div className="h-[39.5px] flex items-center text-sm"><span className="mr-5 text-slate-500 w-44">Application Time:</span><span>13-Nov-2026</span></div>
                  <div className="h-[39.5px] flex items-center text-sm"><span className="mr-5 text-slate-500 w-44">Loan Time:</span><span>19-Nov-2026</span></div>
                </div>

                <div className="space-y-3">
                  <div className="h-[39.5px] flex items-center text-sm"><span className="mr-5 text-slate-500 w-44">Expiration Time:</span><span>19-Nov-2026</span></div>
                  <div className="h-[39.5px] flex items-center text-sm"><span className="mr-5 text-slate-500 w-44">Loan Amount:</span><span className="font-mono font-bold">16,900</span></div>
                  <div className="h-[39.5px] flex items-center text-sm"><span className="mr-5 text-slate-500 w-44">Days Overdue:</span><span className="font-mono">00</span></div>
                  <div className="h-[39.5px] flex items-center text-sm"><span className="mr-5 text-slate-500 w-44">Amount Due(₹s):</span><span className="font-mono font-bold">16,900</span></div>
                  <div className="h-[39.5px] flex items-center text-sm"><span className="mr-5 text-slate-500 w-44">Late Fee(₹s):</span><span className="font-mono">00</span></div>
                  <div className="h-[39.5px] flex items-center text-sm"><span className="mr-5 text-slate-500 w-44">Amount Paid(₹s):</span><span className="font-mono">00</span></div>
                  <div className="h-[39.5px] flex items-center text-sm"><span className="mr-5 text-slate-500 w-44">Customer Bank Info:</span><span className="font-mono text-xs">0162500107338401 (IFSC: KARB0000016)</span></div>
                  <div className="h-[39.5px] flex items-center text-sm"><span className="mr-5 text-slate-500 w-44">Interest and Tax:</span><span>00</span></div>
                  <div className="h-[39.5px] flex items-center text-sm"><span className="mr-5 text-slate-500 w-44">Remaining Due(₹s):</span><span className="font-mono font-bold text-slate-700">16,900</span></div>
                </div>

                <div className="space-y-3 lg:absolute lg:right-6 lg:top-6 lg:w-[168px]">
                  <div className="h-[39.5px] flex items-center text-sm lg:hidden"><span className="mr-5 text-slate-500 w-44">App Link:</span><span className="text-[20px] font-bold text-[#c0141a]">Exceed</span></div>
                  <div className="h-[39.5px] flex items-center text-sm lg:hidden"><span className="mr-5 text-slate-500 w-44">Payment Link:</span><button type="button" onClick={handleCopyLink} className="bg-[#2e9e4f] hover:bg-[#278a43] text-white border-0 rounded h-[30px] px-3.5 text-xs cursor-pointer font-medium">Click here to Copy</button></div>

                  {/* Verification Docs Frames */}
                  <div className="border border-slate-900 rounded-[9px] bg-white overflow-hidden shadow-sm">
                    <span className="block m-1 h-[74px] bg-[#eef0f3] rounded overflow-hidden">
                      <svg viewBox="0 0 160 112" preserveAspectRatio="xMidYMid slice" className="w-full h-full block">
                        <rect width="160" height="112" fill="#e3e6ea"/>
                        <circle cx="80" cy="46" r="20" fill="#b7bdc6"/>
                        <path d="M36 112c0-26 20-38 44-38s44 12 44 38z" fill="#b7bdc6"/>
                      </svg>
                    </span>
                    <span className="block border-t border-slate-900 text-center text-[9.5px] leading-3 p-1 text-slate-900">
                      <b>Identity Verification:</b> Current Live Portrait
                    </span>
                  </div>

                  <div className="border border-slate-900 rounded-[9px] bg-white overflow-hidden shadow-sm">
                    <span className="block m-1 h-[62px] bg-[#dcecf7] rounded overflow-hidden">
                      <svg viewBox="0 0 180 92" preserveAspectRatio="xMidYMid slice" className="w-full h-full block">
                        <rect width="180" height="92" fill="#d6e8f5"/>
                        <rect x="10" y="30" width="38" height="46" fill="#b7c4d0"/>
                        <circle cx="29" cy="46" r="8" fill="#9fadbb"/>
                        <path d="M16 76c0-12 6-18 13-18s13 6 13 18z" fill="#9fadbb"/>
                        <rect x="58" y="14" width="64" height="6" fill="#aebdcb"/>
                        <rect x="58" y="30" width="56" height="5" fill="#bccad6"/>
                        <rect x="58" y="44" width="40" height="5" fill="#bccad6"/>
                        <rect x="58" y="58" width="48" height="5" fill="#bccad6"/>
                        <rect x="132" y="30" width="38" height="38" fill="#fff"/>
                        <rect x="138" y="36" width="26" height="26" fill="#c9d3dc"/>
                      </svg>
                    </span>
                    <span className="block border-t border-slate-900 text-center text-[9.5px] leading-3 p-1 text-slate-900">
                      <b>Verification:</b> Permanent Account Number (PAN) Card
                    </span>
                  </div>
                </div>
              </div>

              {/* Desktop App Link & Payment Link Row */}
              <div className="hidden lg:grid grid-cols-[457px_455px_1fr] px-6 pb-6 pt-0">
                <div className="h-[39.5px] flex items-center text-sm">
                  <span className="mr-5 text-slate-500 w-44">App Link:</span>
                  <span className="text-[20px] font-bold text-[#c0141a]">Exceed</span>
                </div>
                <div className="h-[39.5px] flex items-center text-sm">
                  <span className="mr-5 text-slate-500 w-44">Payment Link:</span>
                  <button 
                    type="button" 
                    onClick={handleCopyLink} 
                    className={`bg-[#2e9e4f] hover:bg-[#278a43] text-white border-0 rounded h-[30px] px-3.5 text-xs font-medium cursor-pointer transition-all ${copied ? 'bg-[#1f7a39]' : ''}`}
                  >
                    {copied ? 'Copied!' : 'Click here to Copy'}
                  </button>
                </div>
                <div></div>
              </div>
            </section>

            {/* Repayment Record Section */}
            <section className="mt-5 border border-slate-200 rounded bg-white shadow-sm relative">
              <h3 className="m-0 px-4 h-[52px] flex items-center font-normal text-slate-800">
                <span className="bg-[#1a73e8] text-white text-sm px-2 py-0.5 rounded-sm font-medium">Repayment Record</span>
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-[13px]">
                  <thead>
                    <tr className="bg-[#f5f6f8] text-slate-900 font-bold">
                      <th className="h-[40px] border border-slate-200 text-center px-3">Repaid Time</th>
                      <th className="h-[40px] border border-slate-200 text-center px-3">Repayment Method</th>
                      <th className="h-[40px] border border-slate-200 text-center px-3">Repayment Type</th>
                      <th className="h-[40px] border border-slate-200 text-center px-3">Repayment Amount</th>
                      <th className="h-[40px] border border-slate-200 text-center px-3">Transaction Serial No.</th>
                      <th className="h-[40px] border border-slate-200 text-center px-3">Collector</th>
                    </tr>
                  </thead>
                  <tbody>
                    {repayments.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-50 transition-colors">
                        <td className="h-[40px] border border-slate-200 text-center font-mono text-xs">{row.repaidTime}</td>
                        <td className="h-[40px] border border-slate-200 text-center">{row.method}</td>
                        <td className="h-[40px] border border-slate-200 text-center text-blue-600 font-medium">{row.type}</td>
                        <td className="h-[40px] border border-slate-200 text-center font-mono font-bold text-emerald-700">₹{row.amount}</td>
                        <td className="h-[40px] border border-slate-200 text-center font-mono text-xs text-slate-500">{row.serialNo}</td>
                        <td className="h-[40px] border border-slate-200 text-center font-semibold">{row.collector}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Footer pagination and watermark */}
              <div className="relative h-[60px] flex items-center justify-between px-4 border-t border-slate-100 bg-[#fafbfc]">
                <div className="text-slate-400 text-sm italic select-none">
                  Go To Settings to activate Windows
                </div>
                <div className="flex items-center gap-2.5 text-[13px] text-slate-600">
                  <span>Total {repayments.length} Record(s)</span>
                  <span className="w-[30px] h-[30px] border border-slate-300 rounded flex items-center justify-center text-slate-400 bg-white cursor-pointer">&lt;</span>
                  <span className="w-[30px] h-[30px] border border-[#1a73e8] rounded flex items-center justify-center text-[#1a73e8] bg-white font-bold">1</span>
                  <span className="w-[30px] h-[30px] border border-slate-300 rounded flex items-center justify-center text-slate-400 bg-white cursor-pointer">&gt;</span>
                  <span className="w-[86px] h-[30px] border border-slate-300 rounded flex items-center px-2.5 text-xs text-slate-700 bg-white justify-between ml-2">
                    <span>10 条/页</span>
                    <span>⌄</span>
                  </span>
                </div>
              </div>
            </section>
          </>
        )}

        {activeTab === 'msg' && (
          <section className="border border-slate-200 rounded bg-white shadow-sm p-6">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Customer Communication & SMS History</h3>
                <p className="text-xs text-slate-500">Order: no-9534973788293717-1 · PRAJNA G (8050029634)</p>
              </div>
              <button 
                onClick={() => triggerToast('New SMS dispatched successfully')}
                className="bg-[#1a73e8] text-white px-4 py-2 rounded text-xs font-medium hover:bg-blue-700 transition-colors flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send New SMS</span>
              </button>
            </div>
            
            <div className="space-y-4">
              {messages.map(m => (
                <div key={m.id} className="p-4 rounded-lg border border-slate-200 bg-slate-50/50 flex flex-col gap-1.5">
                  <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
                    <span className="flex items-center gap-1 text-slate-700">
                      <MessageSquare className="w-3.5 h-3.5 text-blue-600" />
                      {m.sender} ({m.type})
                    </span>
                    <span className="font-mono">{m.time}</span>
                  </div>
                  <p className="text-sm text-slate-800">{m.content}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[11px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-medium">{m.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === 'contact' && (
          <section className="border border-slate-200 rounded bg-white shadow-sm p-6">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Emergency Contacts & Reference List</h3>
                <p className="text-xs text-slate-500">Customer: PRAJNA G · Mobile: 8050029634</p>
              </div>
              <button 
                onClick={() => triggerToast('Contact verification sync initiated')}
                className="bg-[#1a73e8] text-white px-4 py-2 rounded text-xs font-medium hover:bg-blue-700 transition-colors flex items-center gap-1.5"
              >
                <Users className="w-3.5 h-3.5" />
                <span>Sync Contacts</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {contacts.map((c, idx) => (
                <div key={idx} className="border border-slate-200 rounded-lg p-4 bg-white shadow-sm flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">{c.name}</span>
                    <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded font-medium">{c.relation}</span>
                  </div>
                  <div className="text-sm font-mono text-slate-600">{c.phone}</div>
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100 text-xs text-slate-500">
                    <span>Status: <strong className="text-emerald-700">{c.status}</strong></span>
                    <button onClick={() => triggerToast(`Calling ${c.name}...`)} className="text-blue-600 hover:underline font-medium">Call</button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === 'setup' && (
          <section className="border border-slate-200 rounded bg-white shadow-sm p-6 max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                <HelpCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">Local GitHub Project Setup & Run Guide</h3>
                <p className="text-xs text-slate-500">Instructions for setting up and testing this repository locally on your machine.</p>
              </div>
            </div>

            <div className="space-y-6 text-sm text-slate-700">
              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs flex items-center justify-center font-mono">1</span>
                  Prerequisites
                </h4>
                <p className="text-slate-600 pl-8">Ensure you have <a href="https://nodejs.org/" target="_blank" rel="noreferrer" className="text-blue-600 underline">Node.js</a> (v18 or higher) and npm installed on your local computer.</p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs flex items-center justify-center font-mono">2</span>
                  Clone Repository & Install Dependencies
                </h4>
                <div className="ml-8 bg-slate-950 text-slate-200 p-4 rounded-lg font-mono text-xs space-y-1 overflow-x-auto">
                  <p className="text-slate-400"># Clone the repository</p>
                  <p>git clone https://github.com/example/pk-p002-admin-management-system.git</p>
                  <p className="text-slate-400 pt-2"># Navigate into project directory</p>
                  <p>cd pk-p002-admin-management-system</p>
                  <p className="text-slate-400 pt-2"># Install dependencies</p>
                  <p>npm install</p>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs flex items-center justify-center font-mono">3</span>
                  Run Development Server
                </h4>
                <div className="ml-8 bg-slate-950 text-slate-200 p-4 rounded-lg font-mono text-xs space-y-1">
                  <p className="text-slate-400"># Start local Vite dev server on http://localhost:3000</p>
                  <p>npm run dev</p>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs flex items-center justify-center font-mono">4</span>
                  Production Build
                </h4>
                <div className="ml-8 bg-slate-950 text-slate-200 p-4 rounded-lg font-mono text-xs space-y-1">
                  <p className="text-slate-400"># Build for production</p>
                  <p>npm run build</p>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Add Collection Record Modal */}
      {showAddCollectionModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900">Add Collection Record</h3>
              <button onClick={() => setShowAddCollectionModal(false)} className="text-slate-400 hover:text-slate-600 font-bold text-lg">&times;</button>
            </div>
            <form onSubmit={handleAddCollection} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Repayment Amount (₹)</label>
                <input 
                  type="text" 
                  value={newAmount} 
                  onChange={e => setNewAmount(e.target.value)} 
                  className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-600 font-mono"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Repayment Method</label>
                <select 
                  value={newMethod} 
                  onChange={e => setNewMethod(e.target.value)}
                  className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-600 bg-white"
                >
                  <option value="InPay">InPay</option>
                  <option value="UPI">UPI / QR</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                  <option value="Cash">Cash</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Repayment Type</label>
                <select 
                  value={newType} 
                  onChange={e => setNewType(e.target.value)}
                  className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-600 bg-white"
                >
                  <option value="Partial Payment Overdue">Partial Payment Overdue</option>
                  <option value="Full Settlement">Full Settlement</option>
                  <option value="Late Fee Waiver">Late Fee Waiver</option>
                </select>
              </div>
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button 
                  type="button" 
                  onClick={() => setShowAddCollectionModal(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded shadow-sm"
                >
                  Save Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Send Partial Repayment Modal */}
      {showPartialModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900">Send Partial Repayment Link</h3>
              <button onClick={() => setShowPartialModal(false)} className="text-slate-400 hover:text-slate-600 font-bold text-lg">&times;</button>
            </div>
            <p className="text-sm text-slate-600">Dispatch customized partial repayment link (₹5,000 / ₹10,000) via SMS to customer <strong>PRAJNA G</strong> (8050029634).</p>
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
              <button 
                onClick={() => setShowPartialModal(false)}
                className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  setShowPartialModal(false);
                  triggerToast('Partial repayment SMS sent successfully!');
                }}
                className="px-4 py-2 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded shadow-sm"
              >
                Send SMS Link
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Send Extension Modal */}
      {showExtensionModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900">Send Loan Extension Link</h3>
              <button onClick={() => setShowExtensionModal(false)} className="text-slate-400 hover:text-slate-600 font-bold text-lg">&times;</button>
            </div>
            <p className="text-sm text-slate-600">Grant loan expiration extension (7 days) and send extension payment link to customer.</p>
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
              <button 
                onClick={() => setShowExtensionModal(false)}
                className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  setShowExtensionModal(false);
                  triggerToast('Loan extension link sent successfully!');
                }}
                className="px-4 py-2 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded shadow-sm"
              >
                Send Extension Link
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
