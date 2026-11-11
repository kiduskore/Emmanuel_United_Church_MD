import React, { useState, useMemo } from 'react';
import {
  CHMS_CAMPUSES,
  INITIAL_CHMS_MEMBERS,
  INITIAL_SERVICE_PLAN,
  INITIAL_GIVING_METRICS,
  INITIAL_TRANSACTIONS,
  INITIAL_EVENT_BOOKINGS,
  INITIAL_SAFETY_CHECKS,
  INITIAL_COMMUNICATIONS,
  INITIAL_WORKFLOWS
} from '../data/chmsMockData';
import {
  Member,
  ServicePlan,
  ServiceLiturgyItem,
  VolunteerAssignment,
  Transaction,
  EventBooking,
  SafetyCheck,
  CommunicationMessage,
  WorkflowAutomation
} from '../types/chms';

type ActiveModuleId =
  | 'overview'
  | 'people'
  | 'services'
  | 'giving'
  | 'calendar'
  | 'safety'
  | 'communications'
  | 'settings';

export const ChmsDashboardApp: React.FC = () => {
  // Global Shell State
  const [activeModule, setActiveModule] = useState<ActiveModuleId>('overview');
  const [selectedCampusId, setSelectedCampusId] = useState<string>('silver-spring-main');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [globalSearchTerm, setGlobalSearchTerm] = useState<string>('');
  const [isQuickSearchOpen, setIsQuickSearchOpen] = useState<boolean>(false);

  // Module Data States
  const [members, setMembers] = useState<Member[]>(INITIAL_CHMS_MEMBERS);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [memberSearchQuery, setMemberSearchQuery] = useState<string>('');
  const [memberTagFilter, setMemberTagFilter] = useState<string>('all');
  const [selectedMemberIds, setSelectedMemberIds] = useState<string[]>([]);

  // Services State
  const [servicePlan, setServicePlan] = useState<ServicePlan>(INITIAL_SERVICE_PLAN);
  const [activeServiceTab, setActiveServiceTab] = useState<'run_of_service' | 'volunteer_roster'>('run_of_service');

  // Giving State
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [givingFundFilter, setGivingFundFilter] = useState<string>('all');

  // Calendar State
  const [bookings, setBookings] = useState<EventBooking[]>(INITIAL_EVENT_BOOKINGS);
  const [calendarViewMode, setCalendarViewMode] = useState<'week' | 'month' | 'facility'>('week');

  // Safety State
  const [safetyRecords, setSafetyRecords] = useState<SafetyCheck[]>(INITIAL_SAFETY_CHECKS);
  const [safetyStatusFilter, setSafetyStatusFilter] = useState<string>('all');

  // Communications State
  const [messages, setMessages] = useState<CommunicationMessage[]>(INITIAL_COMMUNICATIONS);
  const [workflows, setWorkflows] = useState<WorkflowAutomation[]>(INITIAL_WORKFLOWS);
  const [composerChannel, setComposerChannel] = useState<'email' | 'sms'>('sms');
  const [composerAudience, setComposerAudience] = useState<string>('First-Time Guests');
  const [composerSubject, setComposerSubject] = useState<string>('');
  const [composerBody, setComposerBody] = useState<string>('Hi {{first_name}}, we are praying for your week ahead!');
  const [composerSentNotice, setComposerSentNotice] = useState<string | null>(null);

  // Active Campus Object
  const currentCampus = useMemo(() => {
    return CHMS_CAMPUSES.find(c => c.id === selectedCampusId) || CHMS_CAMPUSES[0];
  }, [selectedCampusId]);

  // Filtered Members
  const filteredMembers = useMemo(() => {
    return members.filter(m => {
      const matchesSearch =
        m.fullName.toLowerCase().includes(memberSearchQuery.toLowerCase()) ||
        m.email.toLowerCase().includes(memberSearchQuery.toLowerCase()) ||
        m.phone.includes(memberSearchQuery);
      const matchesTag =
        memberTagFilter === 'all' || m.tags.includes(memberTagFilter);
      return matchesSearch && matchesTag;
    });
  }, [members, memberSearchQuery, memberTagFilter]);

  // Filtered Transactions
  const filteredTransactions = useMemo(() => {
    return transactions.filter(tx => {
      return givingFundFilter === 'all' || tx.fund === givingFundFilter;
    });
  }, [transactions, givingFundFilter]);

  // Filtered Safety Records
  const filteredSafety = useMemo(() => {
    return safetyRecords.filter(s => {
      return safetyStatusFilter === 'all' || s.status === safetyStatusFilter;
    });
  }, [safetyRecords, safetyStatusFilter]);

  // Roster status toggle helper
  const handleToggleVolunteerStatus = (volId: string) => {
    setServicePlan(prev => ({
      ...prev,
      volunteerRoster: prev.volunteerRoster.map(v => {
        if (v.id === volId) {
          const nextStatus = v.status === 'accepted' ? 'pending' : v.status === 'pending' ? 'declined' : 'accepted';
          return { ...v, status: nextStatus };
        }
        return v;
      })
    }));
  };

  // Dispatch Communication Message
  const handleDispatchMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!composerBody.trim()) return;

    const newMsg: CommunicationMessage = {
      id: `comm-${Date.now()}`,
      channel: composerChannel,
      sender: composerChannel === 'sms' ? 'Pastoral Care ((240) 716-2246)' : 'emmanuelchurch.maryland@gmail.com',
      recipientsCount: composerAudience === 'First-Time Guests' ? 42 : 380,
      audienceSegment: composerAudience,
      subject: composerChannel === 'email' ? composerSubject : undefined,
      body: composerBody,
      status: 'sent',
      sentAt: 'Just now'
    };

    setMessages([newMsg, ...messages]);
    setComposerSentNotice(`Successfully dispatched ${composerChannel.toUpperCase()} broadcast to ${newMsg.recipientsCount} recipients!`);
    setTimeout(() => setComposerSentNotice(null), 4000);
  };

  return (
    <div className="min-h-screen bg-[#060d1d] text-slate-100 flex font-sans antialiased selection:bg-sky-500/30 selection:text-white">
      
      {/* ======================================================== */}
      {/* 1. COLLAPSIBLE SIDEBAR SHELL (Celestial Azure Glass)    */}
      {/* ======================================================== */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 bg-[#0a1428]/90 backdrop-blur-2xl border-r border-sky-400/20 transition-all duration-300 flex flex-col ${
          isSidebarCollapsed ? 'w-20' : 'w-72'
        } ${isMobileMenuOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full lg:translate-x-0'}`}
      >
        {/* Brand & Campus Switcher */}
        <div className="p-4 border-b border-sky-400/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-400 to-blue-600 text-white font-black flex items-center justify-center shrink-0 shadow-lg shadow-sky-500/30 border border-sky-300/40">
                EUC
              </div>
              {!isSidebarCollapsed && (
                <div className="min-w-0">
                  <h1 className="text-sm font-black tracking-tight text-white truncate">
                    Emmanuel ChMS
                  </h1>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-sky-300 block">
                    Maryland Enterprise
                  </span>
                </div>
              )}
            </div>

            <button
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              aria-label="Toggle sidebar width"
              className="hidden lg:flex w-7 h-7 rounded-lg border border-sky-400/25 text-sky-300 hover:text-white hover:bg-sky-500/20 items-center justify-center text-xs transition-colors"
            >
              {isSidebarCollapsed ? '→' : '←'}
            </button>
          </div>

          {/* Active Campus Dropdown */}
          {!isSidebarCollapsed && (
            <div className="mt-3.5">
              <label className="block text-[10px] font-extrabold uppercase tracking-wider text-sky-300/80 mb-1">
                Active Campus
              </label>
              <select
                value={selectedCampusId}
                onChange={e => setSelectedCampusId(e.target.value)}
                className="w-full text-xs font-semibold bg-[#060d1d] border border-sky-400/30 rounded-lg p-2 text-sky-100 focus:outline-none focus:ring-1 focus:ring-cyan-400 cursor-pointer"
              >
                {CHMS_CAMPUSES.map(camp => (
                  <option key={camp.id} value={camp.id}>
                    {camp.name}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Global Quick Search Shortcut */}
        {!isSidebarCollapsed && (
          <div className="px-4 pt-3 pb-1">
            <button
              onClick={() => setIsQuickSearchOpen(true)}
              className="w-full flex items-center justify-between px-3 py-2 text-xs text-sky-200/70 bg-white/[0.05] hover:bg-white/[0.09] border border-sky-400/20 rounded-lg transition-colors"
            >
              <span className="flex items-center gap-2">
                <span>🔍</span>
                <span>Quick search...</span>
              </span>
              <kbd className="px-1.5 py-0.5 rounded bg-sky-950/60 border border-sky-400/30 text-[10px] font-mono text-cyan-300 shadow-2xs">
                ⌘K
              </kbd>
            </button>
          </div>
        )}

        {/* Navigation Modules (Strict 10 Modules) */}
        <nav className="flex-1 px-3 py-3 space-y-1 overflow-y-auto">
          {[
            { id: 'overview', label: 'Overview', icon: '📊', badge: 'Live' },
            { id: 'people', label: 'People & Directory', icon: '👥', badge: `${members.length}` },
            { id: 'services', label: 'Service Planning', icon: '⛪', badge: 'Sunday' },
            { id: 'giving', label: 'Giving & Finance', icon: '💳', badge: 'Tithe.ly' },
            { id: 'calendar', label: 'Events & Calendar', icon: '📅', badge: '2 Sites' },
            { id: 'safety', label: 'Safety & Compliance', icon: '🛡️', badge: 'Alerts' },
            { id: 'communications', label: 'Communications', icon: '✉️', badge: 'SMS Hub' }
          ].map(item => {
            const isActive = activeModule === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveModule(item.id as ActiveModuleId);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-sky-600 to-cyan-500 text-white shadow-lg shadow-sky-500/25 border border-sky-300/30'
                    : 'text-zinc-300 hover:text-white hover:bg-sky-500/10'
                }`}
                title={item.label}
              >
                <div className="flex items-center gap-3 truncate">
                  <span className="text-base">{item.icon}</span>
                  {!isSidebarCollapsed && <span className="truncate">{item.label}</span>}
                </div>
                {!isSidebarCollapsed && (
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-extrabold ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : 'bg-white/[0.06] text-sky-300 border border-sky-400/20'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Footer: User Profile & Role Lockup */}
        <div className="p-3 border-t border-sky-400/20 bg-[#060d1d]/60">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-sky-500 to-cyan-400 text-white font-bold flex items-center justify-center shrink-0 shadow-md text-xs border border-white/30">
              BF
            </div>
            {!isSidebarCollapsed && (
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-white truncate leading-tight">
                  Dr. Bezalem Fisseha
                </p>
                <span className="inline-block text-[10px] font-extrabold text-cyan-300 bg-sky-500/20 border border-sky-400/30 px-1.5 py-0.2 rounded uppercase tracking-wider mt-0.5">
                  Super Admin
                </span>
              </div>
            )}
          </div>
          {!isSidebarCollapsed && (
            <div className="mt-2.5 flex items-center justify-between text-[11px] text-sky-300/70 pt-2 border-t border-sky-400/15">
              <a href="/" className="hover:text-cyan-300 flex items-center gap-1 font-semibold transition-colors">
                <span>&larr; Public Site</span>
              </a>
              <span className="font-mono text-[10px] text-sky-400/60">v4.2 EUC</span>
            </div>
          )}
        </div>
      </aside>

      {/* Mobile Drawer Backdrop */}
      {isMobileMenuOpen && (
        <div
          onClick={() => setIsMobileMenuOpen(false)}
          className="fixed inset-0 z-30 bg-slate-900/60 backdrop-blur-xs lg:hidden"
        />
      )}

      {/* ======================================================== */}
      {/* 2. MAIN VIEWPORT & HEADER BAR */}
      {/* ======================================================== */}
      <div className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${isSidebarCollapsed ? 'lg:ml-20' : 'lg:ml-72'}`}>
        
        {/* Top Operational Bar */}
        <header className="sticky top-0 z-20 bg-[#0a1428]/85 backdrop-blur-2xl border-b border-sky-400/20 px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4 text-white">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg border border-sky-400/25 text-sky-300 hover:bg-sky-500/10"
              aria-label="Open mobile navigation drawer"
            >
              ☰
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase tracking-wider text-cyan-400">
                  {currentCampus.name}
                </span>
                <span className="text-sky-400/40">/</span>
                <h2 className="text-base font-black text-white capitalize tracking-wide">
                  {activeModule.replace('_', ' ')}
                </h2>
              </div>
              <p className="text-[11px] text-sky-200/60 hidden sm:block">
                Silver Spring, Maryland &bull; Wholistic Development for Wholistic Mission
              </p>
            </div>
          </div>

          {/* Quick Actions & Live Sunday Countdown */}
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-sky-950/60 border border-sky-400/30 text-sky-200 text-xs font-bold">
              <span className="inline-block w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>Next Service: Sunday 10:30 AM EST</span>
            </div>

            <button
              onClick={() => {
                setActiveModule('communications');
                setComposerChannel('sms');
              }}
              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-sky-400 to-cyan-400 hover:from-sky-300 hover:to-cyan-300 text-slate-950 font-black text-xs shadow-[0_0_15px_rgba(0,229,255,0.4)] transition-all flex items-center gap-1.5"
            >
              <span>+</span>
              <span>Send SMS Broadcast</span>
            </button>

            <a
              href="https://give.tithe.ly/?locationId=295024a2-a73b-4cc2-a7bf-ecb211a8eadd&giveButtonText=Give%20Online%20Now"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex px-3 py-1.5 rounded-xl bg-slate-900/60 border border-sky-400/30 hover:bg-sky-900/40 text-sky-200 font-bold text-xs transition-colors items-center gap-1.5"
            >
              <span>Tithe.ly Live</span>
              <span className="text-[10px] text-cyan-400">&nearr;</span>
            </a>
          </div>
        </header>

        {/* Content Container */}
        <main className="flex-1 p-4 sm:p-8 space-y-8 max-w-7xl w-full mx-auto">
          
          {/* ======================================================== */}
          {/* MODULE A: EXECUTIVE COMMAND DASHBOARD (/overview) */}
          {/* ======================================================== */}
          {activeModule === 'overview' && (
            <div className="space-y-8 animate-fade-in">
              
              {/* Top 4 KPI Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                
                {/* 1. Active Membership */}
                <div className="azure-glass-shell p-5 rounded-2xl border border-sky-400/25 relative overflow-hidden group hover:border-sky-400/50 transition-all">
                  <div className="flex items-center justify-between text-sky-300/80 text-xs font-bold uppercase tracking-wider">
                    <span>Active Membership</span>
                    <span className="p-2 rounded-xl bg-sky-500/15 border border-sky-400/30 text-cyan-300">👥</span>
                  </div>
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="text-3xl font-black text-white group-hover:text-cyan-300 transition-colors">482</span>
                    <span className="text-xs font-bold text-cyan-400 flex items-center">
                      &uarr; 4.8%
                    </span>
                  </div>
                  <div className="mt-2 text-[11px] text-sky-200/60 flex items-center justify-between border-t border-sky-400/15 pt-2">
                    <span>Weekly Retention</span>
                    <strong className="text-sky-100 font-bold">94.2%</strong>
                  </div>
                </div>

                {/* 2. This Week's Giving */}
                <div className="azure-glass-shell p-5 rounded-2xl border border-sky-400/25 relative overflow-hidden group hover:border-sky-400/50 transition-all">
                  <div className="flex items-center justify-between text-sky-300/80 text-xs font-bold uppercase tracking-wider">
                    <span>This Week's Giving</span>
                    <span className="p-2 rounded-xl bg-sky-500/15 border border-sky-400/30 text-amber-300">💳</span>
                  </div>
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="text-3xl font-black text-white group-hover:text-cyan-300 transition-colors">${INITIAL_GIVING_METRICS.thisWeekGross.toLocaleString()}</span>
                    <span className="text-xs font-bold text-cyan-400">
                      112% Target
                    </span>
                  </div>
                  <div className="mt-2 text-[11px] text-sky-200/60 flex items-center justify-between border-t border-sky-400/15 pt-2">
                    <span>Recurring Gift Ratio</span>
                    <strong className="text-sky-100 font-bold">{INITIAL_GIVING_METRICS.recurringDonationPercentage}%</strong>
                  </div>
                </div>

                {/* 3. Weekend Attendance & RSVPs */}
                <div className="azure-glass-shell p-5 rounded-2xl border border-sky-400/25 relative overflow-hidden group hover:border-sky-400/50 transition-all">
                  <div className="flex items-center justify-between text-sky-300/80 text-xs font-bold uppercase tracking-wider">
                    <span>Sunday RSVPs</span>
                    <span className="p-2 rounded-xl bg-sky-500/15 border border-sky-400/30 text-cyan-300">⛪</span>
                  </div>
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="text-3xl font-black text-white group-hover:text-cyan-300 transition-colors">314</span>
                    <span className="text-xs font-medium text-sky-300/60">
                      cap 450
                    </span>
                  </div>
                  <div className="mt-2 text-[11px] text-sky-200/60 flex items-center justify-between border-t border-sky-400/15 pt-2">
                    <span>Volunteer Fill Rate</span>
                    <strong className="text-cyan-400 font-bold">80% (4/5)</strong>
                  </div>
                </div>

                {/* 4. Safety & Approvals */}
                <div className="azure-glass-shell p-5 rounded-2xl border border-sky-400/25 relative overflow-hidden group hover:border-sky-400/50 transition-all">
                  <div className="flex items-center justify-between text-sky-300/80 text-xs font-bold uppercase tracking-wider">
                    <span>Safety & Clearances</span>
                    <span className="p-2 rounded-xl bg-sky-500/15 border border-sky-400/30 text-emerald-300">🛡️</span>
                  </div>
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="text-3xl font-black text-white group-hover:text-cyan-300 transition-colors">2</span>
                    <span className="text-xs font-bold text-amber-300 bg-amber-500/20 border border-amber-400/30 px-2 py-0.5 rounded-full">
                      Action Needed
                    </span>
                  </div>
                  <div className="mt-2 text-[11px] text-sky-200/60 flex items-center justify-between border-t border-sky-400/15 pt-2">
                    <span>Minor Safety Rate</span>
                    <strong className="text-sky-100 font-bold">96.8% Compliant</strong>
                  </div>
                </div>

              </div>

              {/* Bento Grid Layout (Upcoming Rundown + Live Giving + Tasks) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                {/* 1. Upcoming Sunday Rundown (7 cols) */}
                <div className="lg:col-span-7 azure-glass-shell rounded-2xl border border-sky-400/25 p-6 space-y-4">
                  <div className="flex items-center justify-between border-b border-sky-400/20 pb-3">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-cyan-400">
                        Upcoming Sunday Rundown &bull; Nov 8, 2026
                      </span>
                      <h3 className="text-base font-black text-white mt-0.5">
                        {servicePlan.serviceTitle}
                      </h3>
                      <p className="text-xs text-sky-200/70">
                        {servicePlan.sermonSpeaker} &bull; {servicePlan.serviceTimes.join(', ')}
                      </p>
                    </div>
                    <button
                      onClick={() => setActiveModule('services')}
                      className="text-xs font-black text-cyan-400 hover:text-cyan-300 transition-colors"
                    >
                      View Matrix &rarr;
                    </button>
                  </div>

                  {/* Run of service progress timeline */}
                  <div className="space-y-3">
                    {servicePlan.runOfService.slice(0, 5).map((item, idx) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between p-3 rounded-xl bg-[#0a1428]/70 border border-sky-400/20 hover:border-sky-400/40 transition-all text-xs"
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 rounded-lg bg-sky-500/20 border border-sky-400/30 text-cyan-300 font-bold flex items-center justify-center text-[10px]">
                            {idx + 1}
                          </span>
                          <div>
                            <span className="font-bold text-white block">{item.title}</span>
                            <span className="text-[11px] text-sky-200/60">Lead: {item.itemLead} &bull; Preset: {item.lightingPreset}</span>
                          </div>
                        </div>
                        <span className="font-mono text-cyan-300 font-bold text-xs">
                          {item.durationMinutes}m
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Volunteer Roster Bar */}
                  <div className="p-3.5 rounded-xl bg-sky-950/70 border border-sky-400/30 text-xs flex items-center justify-between">
                    <div>
                      <strong className="text-sky-100 font-bold">Volunteer Positions Filled:</strong>{' '}
                      <span className="text-cyan-300">4 of 5 confirmed</span>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-[10px] font-bold">
                      1 Position Pending
                    </span>
                  </div>
                </div>

                {/* 2. Live Giving Stream & Ministry Tasks (5 cols) */}
                <div className="lg:col-span-5 space-y-6">
                  
                  {/* Live Giving Mini Feed */}
                  <div className="azure-glass-shell rounded-2xl border border-sky-400/25 p-5 space-y-3">
                    <div className="flex items-center justify-between border-b border-sky-400/20 pb-2.5">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
                        <h4 className="text-xs font-black uppercase tracking-wider text-white">
                          Live Giving Stream
                        </h4>
                      </div>
                      <button
                        onClick={() => setActiveModule('giving')}
                        className="text-[11px] font-bold text-cyan-400 hover:underline"
                      >
                        Ledger
                      </button>
                    </div>

                    <div className="divide-y divide-sky-400/15">
                      {transactions.slice(0, 4).map(tx => (
                        <div key={tx.id} className="py-2.5 flex items-center justify-between text-xs">
                          <div>
                            <span className="font-bold text-white block">{tx.donorName}</span>
                            <span className="text-[10px] text-sky-200/60">
                              {tx.fundLabel} &bull; <span className="uppercase">{tx.paymentMethod}</span>
                            </span>
                          </div>
                          <div className="text-right">
                            <strong className="text-emerald-400 font-bold font-mono block">
                              +${tx.amount.toFixed(2)}
                            </strong>
                            <span className="text-[9px] text-sky-300/40">{tx.timestamp.split(' ')[0]}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* SIGNATURE IMAGE WIDGET: "Assigned to me" task card from image_29354439.png */}
                  <div className="azure-glass-shell rounded-2xl border border-sky-400/30 p-5 space-y-4 relative overflow-hidden shadow-2xl">
                    <div className="diamond-glint -top-4 -right-4 pointer-events-none" />
                    
                    <div className="flex items-center justify-between">
                      <h4 className="text-base font-black text-white tracking-wide">
                        Assigned to me
                      </h4>
                      <button className="text-sky-300/60 hover:text-white text-lg p-1" aria-label="Menu">
                        &vellip;
                      </button>
                    </div>

                    {/* Task Card 1: Create detailed wireframes */}
                    <div className="azure-inner-card rounded-2xl p-4 border border-sky-400/25 space-y-3">
                      <div className="flex items-start justify-between gap-3">
                        <span className="font-bold text-white text-sm">
                          Create detailed wireframes
                        </span>
                        <div className="flex -space-x-2 shrink-0">
                          <img
                            src="/assets/aistudio/485151948_1067548775400928_6282613185091891205_n_db5e663e.jpg"
                            alt="Volunteer 1"
                            className="w-6 h-6 rounded-full border-2 border-[#0a1428] object-cover"
                          />
                          <img
                            src="/assets/aistudio/668522396_1382859160536553_2419448380390787819_n_c696cc18.jpg"
                            alt="Volunteer 2"
                            className="w-6 h-6 rounded-full border-2 border-[#0a1428] object-cover"
                          />
                          <img
                            src="/assets/aistudio/669727217_1382859173869885_7702698326695477048_n_6bc2552a.jpg"
                            alt="Volunteer 3"
                            className="w-6 h-6 rounded-full border-2 border-[#0a1428] object-cover"
                          />
                        </div>
                      </div>

                      <div className="flex items-center gap-3 text-xs text-sky-200/70 pt-1">
                        <div className="flex items-center gap-1 font-mono text-[11px] text-sky-300">
                          <span>&#10003;</span>
                          <span>2/10</span>
                        </div>
                        <div className="flex-1 cyan-progress-track">
                          <div className="cyan-progress-fill" style={{ width: '32%' }} />
                        </div>
                        <span className="font-mono text-cyan-300 text-xs font-bold">32%</span>
                      </div>
                    </div>

                    {/* Task Card 2: Onboarding flow for a new feature */}
                    <div className="azure-inner-card rounded-2xl p-4 border border-sky-400/25 space-y-3 relative">
                      <div className="diamond-glint -right-2 top-10 pointer-events-none" />
                      
                      <div className="flex items-center justify-between">
                        <span className="px-2 py-0.5 rounded-md border border-sky-400/30 bg-sky-950/70 text-[10px] font-bold text-cyan-300 uppercase tracking-wider">
                          In progress
                        </span>
                      </div>

                      <div>
                        <h5 className="font-bold text-white text-sm">
                          Onboarding flow for a new feature
                        </h5>
                        <p className="text-[11px] text-sky-200/70 mt-1 leading-relaxed">
                          Design and implement an intuitive onboarding flow for a new user to introduce key features, set up... <button className="text-cyan-300 underline font-semibold">Read more</button>
                        </p>
                      </div>

                      {/* Time & progress pill */}
                      <div className="p-2.5 rounded-xl bg-[#060d1d]/80 border border-sky-400/20 space-y-1.5">
                        <div className="flex items-center justify-between text-xs text-sky-200">
                          <span className="font-mono font-bold text-white">12h 35m</span>
                          <span className="font-mono text-cyan-300 font-bold">48%</span>
                        </div>
                        <div className="cyan-progress-track">
                          <div className="cyan-progress-fill" style={{ width: '48%' }} />
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-xs text-sky-300/80 pt-1">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1 font-mono text-[11px]">
                            <span>&#10003;</span>
                            <span>1/4</span>
                          </div>
                          <div className="flex items-center gap-1 text-[11px]">
                            <span>💬</span>
                            <span>5</span>
                          </div>
                        </div>

                        <div className="flex -space-x-2 shrink-0">
                          <img
                            src="/assets/aistudio/486056033_1067548748734264_7322107188669003734_n_184e0a0b.jpg"
                            alt="Volunteer 1"
                            className="w-6 h-6 rounded-full border-2 border-[#0a1428] object-cover"
                          />
                          <img
                            src="/assets/aistudio/764907043_1483870080435460_8898126455633256962_n_fa7c8f93.jpg"
                            alt="Volunteer 2"
                            className="w-6 h-6 rounded-full border-2 border-[#0a1428] object-cover"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Footer Row: 2/8 tasks & Completed toggle */}
                    <div className="flex items-center justify-between text-xs text-sky-200/80 pt-2 border-t border-sky-400/20">
                      <span className="font-bold text-sky-300">2/8 tasks</span>
                      <label className="flex items-center gap-2 cursor-pointer select-none">
                        <div className="relative inline-block w-9 h-5">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-9 h-5 bg-slate-800 rounded-full peer peer-checked:bg-gradient-to-r peer-checked:from-sky-500 peer-checked:to-cyan-400 transition-colors" />
                          <div className="absolute left-0.5 top-0.5 bg-white w-4 h-4 rounded-full transition-transform peer-checked:translate-x-4 shadow-sm" />
                        </div>
                        <span className="font-bold text-white text-xs">Completed</span>
                      </label>
                    </div>

                  </div>

                </div>

              </div>

            </div>
          )}

          {/* ======================================================== */}
          {/* MODULE B: PEOPLE DIRECTORY & SMART TAGGING (/people) */}
          {/* ======================================================== */}
          {activeModule === 'people' && (
            <div className="space-y-6 animate-fade-in">
              
              {/* Toolbar */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1 flex flex-wrap items-center gap-3">
                  {/* Search box */}
                  <div className="relative flex-1 min-w-[240px]">
                    <span className="absolute left-3 top-2.5 text-slate-400 text-xs">🔍</span>
                    <input
                      type="text"
                      value={memberSearchQuery}
                      onChange={e => setMemberSearchQuery(e.target.value)}
                      placeholder="Search by name, email, phone..."
                      className="w-full pl-8 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-blue-600"
                    />
                  </div>

                  {/* Filter by Tag */}
                  <select
                    value={memberTagFilter}
                    onChange={e => setMemberTagFilter(e.target.value)}
                    className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700 font-semibold focus:outline-none"
                  >
                    <option value="all">All Tags & Groups</option>
                    <option value="#WorshipBand">#WorshipBand</option>
                    <option value="#YouthLeader">#YouthLeader</option>
                    <option value="#FirstTimeVisitor">#FirstTimeVisitor</option>
                    <option value="#ChildrenMinistry">#ChildrenMinistry</option>
                  </select>
                </div>

                {/* Bulk Actions Toolbar */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setActiveModule('communications');
                      setComposerChannel('sms');
                      setComposerAudience('Selected Directory Members');
                    }}
                    className="px-3.5 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-colors flex items-center gap-1.5"
                  >
                    <span>Send SMS</span>
                  </button>
                  <button
                    onClick={() => {
                      const csvContent =
                        'data:text/csv;charset=utf-8,ID,Name,Email,Phone,Role,Status\n' +
                        members
                          .map(m => `"${m.id}","${m.fullName}","${m.email}","${m.phone}","${m.membershipStatus}","${m.safetyClearanceStatus}"`)
                          .join('\n');
                      const encodedUri = encodeURI(csvContent);
                      const link = document.createElement('a');
                      link.setAttribute('href', encodedUri);
                      link.setAttribute('download', 'EUC_Members_Directory.csv');
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                    }}
                    className="px-3.5 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs transition-colors"
                  >
                    Export CSV
                  </button>
                </div>
              </div>

              {/* Members Data Table */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-700">
                    <thead className="bg-slate-50 border-b border-slate-200 text-[10px] font-extrabold uppercase tracking-wider text-slate-500">
                      <tr>
                        <th className="p-4 w-8">
                          <input
                            type="checkbox"
                            checked={selectedMemberIds.length === filteredMembers.length && filteredMembers.length > 0}
                            onChange={e => {
                              if (e.target.checked) setSelectedMemberIds(filteredMembers.map(m => m.id));
                              else setSelectedMemberIds([]);
                            }}
                            className="rounded border-slate-300"
                          />
                        </th>
                        <th className="p-4">Member Name</th>
                        <th className="p-4">Household & Role</th>
                        <th className="p-4">Status</th>
                        <th className="p-4">Active Tags</th>
                        <th className="p-4">Last Attendance</th>
                        <th className="p-4">Safety</th>
                        <th className="p-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-sans">
                      {filteredMembers.map(member => (
                        <tr
                          key={member.id}
                          className="hover:bg-slate-50/80 transition-colors cursor-pointer"
                          onClick={() => setSelectedMember(member)}
                        >
                          <td className="p-4" onClick={e => e.stopPropagation()}>
                            <input
                              type="checkbox"
                              checked={selectedMemberIds.includes(member.id)}
                              onChange={e => {
                                if (e.target.checked) setSelectedMemberIds([...selectedMemberIds, member.id]);
                                else setSelectedMemberIds(selectedMemberIds.filter(id => id !== member.id));
                              }}
                              className="rounded border-slate-300"
                            />
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <img
                                src={member.avatarUrl}
                                alt={member.fullName}
                                className="w-9 h-9 rounded-full object-cover border border-slate-200"
                              />
                              <div>
                                <strong className="font-bold text-slate-900 block">{member.fullName}</strong>
                                <span className="text-[11px] text-slate-500">{member.email}</span>
                              </div>
                            </div>
                          </td>
                          <td className="p-4">
                            <span className="font-semibold text-slate-800 block">{member.householdName}</span>
                            <span className="text-[10px] text-slate-400 capitalize">{member.householdRole}</span>
                          </td>
                          <td className="p-4">
                            <span
                              className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold capitalize ${
                                member.membershipStatus === 'staff'
                                  ? 'bg-purple-100 text-purple-800'
                                  : member.membershipStatus === 'leader'
                                  ? 'bg-blue-100 text-blue-800'
                                  : member.membershipStatus === 'first_time_guest'
                                  ? 'bg-amber-100 text-amber-800'
                                  : 'bg-slate-100 text-slate-700'
                              }`}
                            >
                              {member.membershipStatus.replace('_', ' ')}
                            </span>
                          </td>
                          <td className="p-4">
                            <div className="flex flex-wrap gap-1 max-w-xs">
                              {member.tags.slice(0, 2).map(tag => (
                                <span
                                  key={tag}
                                  className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-semibold text-[10px]"
                                >
                                  {tag}
                                </span>
                              ))}
                              {member.tags.length > 2 && (
                                <span className="text-[10px] text-slate-400">+{member.tags.length - 2}</span>
                              )}
                            </div>
                          </td>
                          <td className="p-4 text-slate-600">
                            {member.lastAttendance}
                          </td>
                          <td className="p-4">
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                member.safetyClearanceStatus === 'approved'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : member.safetyClearanceStatus === 'pending'
                                  ? 'bg-amber-100 text-amber-800'
                                  : 'bg-slate-100 text-slate-500'
                              }`}
                            >
                              {member.safetyClearanceStatus}
                            </span>
                          </td>
                          <td className="p-4 text-right" onClick={e => e.stopPropagation()}>
                            <button
                              onClick={() => setSelectedMember(member)}
                              className="px-2.5 py-1 rounded-lg border border-slate-200 hover:bg-slate-100 font-bold text-slate-600 text-xs"
                            >
                              Profile &rarr;
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Member Detail Slide-Over Drawer */}
              {selectedMember && (
                <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/50 backdrop-blur-xs flex justify-end">
                  <div className="w-full max-w-xl bg-white h-full shadow-2xl flex flex-col overflow-y-auto p-6 sm:p-8 space-y-6">
                    <div className="flex items-start justify-between border-b border-slate-200 pb-4">
                      <div className="flex items-center gap-4">
                        <img
                          src={selectedMember.avatarUrl}
                          alt={selectedMember.fullName}
                          className="w-14 h-14 rounded-2xl object-cover border border-slate-200 shadow-sm"
                        />
                        <div>
                          <h3 className="text-xl font-black text-slate-900">
                            {selectedMember.fullName}
                          </h3>
                          <span className="text-xs text-slate-500">
                            Member since {selectedMember.firstVisitDate} &bull; {selectedMember.phone}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => setSelectedMember(null)}
                        className="text-slate-400 hover:text-slate-700 text-xl font-bold p-1"
                      >
                        &times;
                      </button>
                    </div>

                    {/* Household Tree View */}
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black uppercase tracking-wider text-slate-900">
                          Household: {selectedMember.householdName}
                        </span>
                        <span className="text-[10px] text-blue-600 font-bold capitalize">
                          Role: {selectedMember.householdRole}
                        </span>
                      </div>
                      <div className="space-y-2">
                        {selectedMember.familyMembers.length > 0 ? (
                          selectedMember.familyMembers.map(fm => (
                            <div
                              key={fm.memberId}
                              className="flex items-center justify-between p-2 rounded-lg bg-white border border-slate-200 text-xs"
                            >
                              <span className="font-bold text-slate-800">{fm.fullName}</span>
                              <span className="text-slate-500 text-[11px]">{fm.relationship}</span>
                            </div>
                          ))
                        ) : (
                          <p className="text-xs text-slate-400">Single individual household record.</p>
                        )}
                      </div>
                    </div>

                    {/* Dynamic Tags Manager */}
                    <div className="space-y-2">
                      <span className="text-xs font-black uppercase tracking-wider text-slate-900 block">
                        Assigned Ministry Tags
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedMember.tags.map(tag => (
                          <span
                            key={tag}
                            className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-800 border border-blue-200 text-xs font-bold"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Activity Timeline */}
                    <div className="space-y-3">
                      <span className="text-xs font-black uppercase tracking-wider text-slate-900 block">
                        Activity Timeline & Logs
                      </span>
                      <div className="space-y-2.5">
                        {selectedMember.activityTimeline.map(log => (
                          <div
                            key={log.id}
                            className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs space-y-0.5"
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-slate-900">{log.title}</span>
                              <span className="text-[10px] text-slate-400">{log.timestamp}</span>
                            </div>
                            <p className="text-slate-600 text-[11px]">{log.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-200 flex justify-end gap-3 mt-auto">
                      <button
                        onClick={() => setSelectedMember(null)}
                        className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* ======================================================== */}
          {/* MODULE C: SERVICE PLANNING & WORSHIP ENGINE (/services) */}
          {/* ======================================================== */}
          {activeModule === 'services' && (
            <div className="space-y-6 animate-fade-in">
              
              {/* Service Header Info */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 block">
                    Sunday Service Orchestration &bull; Nov 8, 2026
                  </span>
                  <h3 className="text-2xl font-black text-slate-900 mt-1">
                    {servicePlan.serviceTitle}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Scripture: <strong>{servicePlan.scriptureReference}</strong> &bull; Speaker: {servicePlan.sermonSpeaker}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <div className="bg-slate-100 p-1 rounded-xl flex items-center text-xs font-bold">
                    <button
                      onClick={() => setActiveServiceTab('run_of_service')}
                      className={`px-3 py-1.5 rounded-lg transition-all ${
                        activeServiceTab === 'run_of_service'
                          ? 'bg-white text-slate-900 shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Run of Service Matrix
                    </button>
                    <button
                      onClick={() => setActiveServiceTab('volunteer_roster')}
                      className={`px-3 py-1.5 rounded-lg transition-all ${
                        activeServiceTab === 'volunteer_roster'
                          ? 'bg-white text-slate-900 shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Volunteer Rostering Grid
                    </button>
                  </div>
                </div>
              </div>

              {/* Tab 1: Run of Service Matrix */}
              {activeServiceTab === 'run_of_service' && (
                <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
                  <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-700">Liturgy Order & Production Cues</span>
                    <span className="font-mono text-slate-500 font-bold">
                      Total Runtime: {servicePlan.runOfService.reduce((acc, i) => acc + i.durationMinutes, 0)} Minutes
                    </span>
                  </div>

                  <div className="divide-y divide-slate-100">
                    {servicePlan.runOfService.map((item, index) => (
                      <div key={item.id} className="p-4 sm:p-5 hover:bg-slate-50/70 transition-colors">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div className="flex items-start gap-4">
                            <span className="w-8 h-8 rounded-xl bg-slate-900 text-white font-black flex items-center justify-center shrink-0 text-xs shadow-xs">
                              {index + 1}
                            </span>
                            <div>
                              <div className="flex items-center gap-2 flex-wrap">
                                <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
                                <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-extrabold uppercase">
                                  {item.type.replace('_', ' ')}
                                </span>
                                {item.songKey && (
                                  <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[10px] font-bold">
                                    Key: {item.songKey} &bull; {item.bpm} BPM
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-slate-500 mt-1">
                                <strong className="text-slate-700">Lead:</strong> {item.itemLead} &bull; <strong className="text-slate-700">Lighting:</strong> {item.lightingPreset}
                              </p>
                              <p className="text-xs text-blue-700 bg-blue-50/70 p-2 rounded-lg mt-2 border border-blue-100 font-mono text-[11px]">
                                <strong>A/V Cue:</strong> {item.avCues}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 sm:self-center shrink-0">
                            <span className="text-xs font-mono font-black text-slate-800 bg-slate-100 px-2.5 py-1 rounded-lg">
                              {item.durationMinutes} min
                            </span>
                            {item.attachments.length > 0 && (
                              <span className="text-[11px] font-bold text-blue-600 flex items-center gap-1">
                                📎 {item.attachments.length} file
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab 2: Volunteer Rostering Grid */}
              {activeServiceTab === 'volunteer_roster' && (
                <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div>
                      <h4 className="text-sm font-black text-slate-900 uppercase tracking-wider">
                        Sunday Volunteer Assignments & Confirmation Status
                      </h4>
                      <p className="text-xs text-slate-500">
                        Click on any status pill to cycle states (Accepted &rarr; Pending &rarr; Declined)
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {servicePlan.volunteerRoster.map(vol => (
                      <div
                        key={vol.id}
                        className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
                              {vol.department}
                            </span>
                            <h5 className="font-bold text-slate-900 text-xs mt-0.5">
                              {vol.roleTitle}
                            </h5>
                          </div>
                          <button
                            onClick={() => handleToggleVolunteerStatus(vol.id)}
                            className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider cursor-pointer ${
                              vol.status === 'accepted'
                                ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                                : vol.status === 'pending'
                                ? 'bg-amber-100 text-amber-800 border border-amber-200'
                                : 'bg-red-100 text-red-800 border border-red-200'
                            }`}
                          >
                            {vol.status} &circlearrowright;
                          </button>
                        </div>

                        <div className="text-xs text-slate-700">
                          <strong>Assigned to:</strong> {vol.assignedMemberName}
                          {vol.notes && (
                            <p className="text-[11px] text-amber-700 mt-1">{vol.notes}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          )}

          {/* ======================================================== */}
          {/* MODULE D: GIVING & FINANCIAL INTELLIGENCE (/giving) */}
          {/* ======================================================== */}
          {activeModule === 'giving' && (
            <div className="space-y-6 animate-fade-in">
              
              {/* Financial Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Year-to-Date Volume</span>
                  <div className="text-3xl font-black text-slate-900 mt-2 font-mono">
                    ${INITIAL_GIVING_METRICS.yearToDateTotal.toLocaleString()}
                  </div>
                  <span className="text-[11px] text-emerald-600 font-bold mt-1 block">
                    +14.2% vs Previous Fiscal Year
                  </span>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Average Gift Size</span>
                  <div className="text-3xl font-black text-slate-900 mt-2 font-mono">
                    ${INITIAL_GIVING_METRICS.averageGiftSize}
                  </div>
                  <span className="text-[11px] text-slate-500 mt-1 block">Across card, ACH, & Zelle</span>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Recurring Donation %</span>
                  <div className="text-3xl font-black text-blue-600 mt-2 font-mono">
                    {INITIAL_GIVING_METRICS.recurringDonationPercentage}%
                  </div>
                  <span className="text-[11px] text-slate-500 mt-1 block">Predictable operating floor</span>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Donor Retention Rate</span>
                  <div className="text-3xl font-black text-emerald-600 mt-2 font-mono">
                    {INITIAL_GIVING_METRICS.donorRetentionRate}%
                  </div>
                  <span className="text-[11px] text-slate-500 mt-1 block">Annual active givers</span>
                </div>
              </div>

              {/* Fund Allocation Visual Breakdown */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-900">
                  Fund Allocation & Capital Allocations
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {INITIAL_GIVING_METRICS.fundBreakdown.map(fund => (
                    <div key={fund.fund} className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="text-xs text-slate-600 font-bold block">{fund.label}</span>
                      <strong className="text-xl font-black text-slate-900 font-mono mt-1 block">
                        ${fund.amount.toLocaleString()}
                      </strong>
                      <div className="w-full h-1.5 rounded-full bg-slate-200 mt-2 overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${(fund.amount / INITIAL_GIVING_METRICS.yearToDateTotal) * 100}%`,
                            backgroundColor: fund.colorHex
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Transaction Ledger */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden space-y-4 p-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-900">
                    Contribution Ledger & Tax Audit Records
                  </h4>
                  <div className="flex items-center gap-2">
                    <select
                      value={givingFundFilter}
                      onChange={e => setGivingFundFilter(e.target.value)}
                      className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-700"
                    >
                      <option value="all">All Funds</option>
                      <option value="tithe_general">General Operating & Tithes</option>
                      <option value="building_project">Sanctuary Building Fund</option>
                      <option value="global_missions">Ethiopia & Global Missions</option>
                      <option value="youth_benevolence">Young Adults & Benevolence</option>
                    </select>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-700">
                    <thead className="bg-slate-50 border-b border-slate-200 text-[10px] font-extrabold uppercase tracking-wider text-slate-500">
                      <tr>
                        <th className="p-3">Receipt #</th>
                        <th className="p-3">Donor</th>
                        <th className="p-3">Fund</th>
                        <th className="p-3">Gateway & Method</th>
                        <th className="p-3">Date</th>
                        <th className="p-3 text-right">Gross Amount</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredTransactions.map(tx => (
                        <tr key={tx.id} className="hover:bg-slate-50/70">
                          <td className="p-3 font-mono font-bold text-slate-600">{tx.receiptNumber}</td>
                          <td className="p-3">
                            <strong className="text-slate-900 block">{tx.donorName}</strong>
                            <span className="text-[11px] text-slate-500">{tx.donorEmail}</span>
                          </td>
                          <td className="p-3">
                            <span className="font-semibold text-slate-800">{tx.fundLabel}</span>
                          </td>
                          <td className="p-3">
                            <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-bold uppercase text-[10px]">
                              {tx.paymentMethod} &bull; {tx.gateway}
                            </span>
                          </td>
                          <td className="p-3 text-slate-500 text-[11px]">{tx.timestamp}</td>
                          <td className="p-3 text-right font-mono font-black text-emerald-600 text-sm">
                            ${tx.amount.toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* ======================================================== */}
          {/* MODULE E: CALENDAR, ROOM & RESOURCE SCHEDULING (/calendar) */}
          {/* ======================================================== */}
          {activeModule === 'calendar' && (
            <div className="space-y-6 animate-fade-in">
              
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-black text-slate-900">
                    Facility Logistics & Asset Scheduling
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Two-level booking workflow: Event Timing + Room & Equipment Asset Allocation
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <div className="bg-slate-100 p-1 rounded-xl text-xs font-bold flex">
                    <button
                      onClick={() => setCalendarViewMode('week')}
                      className={`px-3 py-1.5 rounded-lg ${calendarViewMode === 'week' ? 'bg-white shadow-xs text-slate-900' : 'text-slate-600'}`}
                    >
                      Week Grid
                    </button>
                    <button
                      onClick={() => setCalendarViewMode('facility')}
                      className={`px-3 py-1.5 rounded-lg ${calendarViewMode === 'facility' ? 'bg-white shadow-xs text-slate-900' : 'text-slate-600'}`}
                    >
                      Facility Assets
                    </button>
                  </div>
                </div>
              </div>

              {/* Bookings List with Conflict Visual Flag */}
              <div className="grid grid-cols-1 gap-4">
                {bookings.map(booking => (
                  <div
                    key={booking.id}
                    className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-base font-bold text-slate-900">{booking.title}</h4>
                          <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase">
                            {booking.status}
                          </span>
                        </div>
                        <span className="text-xs text-slate-500">
                          {booking.ministryDepartment} &bull; Organizer: {booking.organizerName}
                        </span>
                      </div>
                      <span className="text-xs font-mono font-bold text-slate-700 bg-slate-100 px-3 py-1 rounded-lg">
                        {booking.startDateTime} &rarr; {booking.endDateTime.split(' ')[1]}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                        <strong className="text-slate-900 block mb-1">Allocated Rooms ({booking.roomsAllocated.length}):</strong>
                        <ul className="space-y-1 text-slate-600">
                          {booking.roomsAllocated.map(r => (
                            <li key={r.id}>&bull; {r.name} (Cap: {r.capacity})</li>
                          ))}
                        </ul>
                      </div>

                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                        <strong className="text-slate-900 block mb-1">Allocated Assets & Consoles ({booking.assetsAllocated.length}):</strong>
                        <ul className="space-y-1 text-slate-600">
                          {booking.assetsAllocated.map(a => (
                            <li key={a.id}>&bull; {a.name}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* ======================================================== */}
          {/* MODULE F: CHURCH SAFETY & COMPLIANCE (/safety) */}
          {/* ======================================================== */}
          {activeModule === 'safety' && (
            <div className="space-y-6 animate-fade-in">
              
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-black text-slate-900">
                    Child Safety & Minor Clearance Verification Hub
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Third-party integration state with MinistrySafe and ProtectMyMinistry
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={safetyStatusFilter}
                    onChange={e => setSafetyStatusFilter(e.target.value)}
                    className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700"
                  >
                    <option value="all">All Clearance States</option>
                    <option value="approved">Approved & Cleared</option>
                    <option value="pending_review">Pending Review</option>
                    <option value="expired_renewal_needed">Expired / Needs Renewal</option>
                  </select>
                </div>
              </div>

              {/* Status Table */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
                <table className="w-full text-left text-xs text-slate-700">
                  <thead className="bg-slate-50 border-b border-slate-200 text-[10px] font-extrabold uppercase tracking-wider text-slate-500">
                    <tr>
                      <th className="p-4">Volunteer</th>
                      <th className="p-4">Department & Role</th>
                      <th className="p-4">Provider</th>
                      <th className="p-4">Status</th>
                      <th className="p-4">Clearance Level</th>
                      <th className="p-4">Expiration / Warning</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredSafety.map(item => (
                      <tr key={item.id} className="hover:bg-slate-50/70">
                        <td className="p-4">
                          <strong className="text-slate-900 block">{item.memberName}</strong>
                          <span className="text-[11px] text-slate-500">{item.memberEmail}</span>
                        </td>
                        <td className="p-4">
                          <span className="font-semibold text-slate-800 block">{item.assignedDepartment}</span>
                          <span className="text-[11px] text-slate-500">{item.roleDescription}</span>
                        </td>
                        <td className="p-4 font-mono font-bold text-slate-600">{item.provider}</td>
                        <td className="p-4">
                          <span
                            className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase ${
                              item.status === 'approved'
                                ? 'bg-emerald-100 text-emerald-800'
                                : item.status === 'pending_review'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {item.status.replace(/_/g, ' ')}
                          </span>
                        </td>
                        <td className="p-4 capitalize text-slate-600">
                          {item.clearanceLevel.replace(/_/g, ' ')}
                        </td>
                        <td className="p-4">
                          <span
                            className={`font-mono text-xs font-bold ${
                              item.daysUntilExpiration < 0
                                ? 'text-red-600'
                                : item.daysUntilExpiration < 30
                                ? 'text-amber-600'
                                : 'text-slate-600'
                            }`}
                          >
                            {item.daysUntilExpiration < 0
                              ? `Expired (${Math.abs(item.daysUntilExpiration)}d ago)`
                              : `${item.daysUntilExpiration} days remaining`}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>
          )}

          {/* ======================================================== */}
          {/* MODULE G: SMART COMMUNICATIONS & WORKFLOWS (/communications) */}
          {/* ======================================================== */}
          {activeModule === 'communications' && (
            <div className="space-y-8 animate-fade-in">
              
              {composerSentNotice && (
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center justify-between">
                  <span>✓ {composerSentNotice}</span>
                  <button onClick={() => setComposerSentNotice(null)} className="text-emerald-900 font-bold">&times;</button>
                </div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left: Broadcast Composer (7 cols) */}
                <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-5">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div>
                      <h3 className="text-base font-black text-slate-900">
                        Dispatch Communication Broadcast
                      </h3>
                      <p className="text-xs text-slate-500">
                        Multi-channel two-way SMS hub and rich-text email broadcast
                      </p>
                    </div>

                    <div className="bg-slate-100 p-1 rounded-xl text-xs font-bold flex">
                      <button
                        onClick={() => setComposerChannel('sms')}
                        className={`px-3 py-1 rounded-lg ${composerChannel === 'sms' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'}`}
                      >
                        SMS (160c)
                      </button>
                      <button
                        onClick={() => setComposerChannel('email')}
                        className={`px-3 py-1 rounded-lg ${composerChannel === 'email' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'}`}
                      >
                        Email
                      </button>
                    </div>
                  </div>

                  <form onSubmit={handleDispatchMessage} className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-500 mb-1">
                        Target Audience Segment
                      </label>
                      <select
                        value={composerAudience}
                        onChange={e => setComposerAudience(e.target.value)}
                        className="w-full text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800"
                      >
                        <option value="First-Time Guests">First-Time Guests (Last 30 Days)</option>
                        <option value="Active Members">Active Members & Tithers</option>
                        <option value="Worship & Audio Volunteers">Worship & Audio Volunteers</option>
                        <option value="All Church Family">All Church Family Directory</option>
                      </select>
                    </div>

                    {composerChannel === 'email' && (
                      <div>
                        <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-500 mb-1">
                          Email Subject Line
                        </label>
                        <input
                          type="text"
                          value={composerSubject}
                          onChange={e => setComposerSubject(e.target.value)}
                          placeholder="e.g. This Sunday: Arise & Build (Neh. 2:20)"
                          className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800"
                        />
                      </div>
                    )}

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-500">
                          Message Body (Placeholders: <code className="text-blue-600">{'{{first_name}}'}</code>, <code className="text-blue-600">{'{{campus}}'}</code>)
                        </label>
                        {composerChannel === 'sms' && (
                          <span className={`text-[10px] font-mono ${composerBody.length > 160 ? 'text-amber-600 font-bold' : 'text-slate-400'}`}>
                            {composerBody.length}/160 chars
                          </span>
                        )}
                      </div>
                      <textarea
                        rows={4}
                        value={composerBody}
                        onChange={e => setComposerBody(e.target.value)}
                        className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 font-sans focus:outline-none focus:ring-1 focus:ring-blue-600"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-sm transition-all"
                    >
                      Dispatch Broadcast &rarr;
                    </button>
                  </form>
                </div>

                {/* Right: Automated Workflows Canvas (5 cols) */}
                <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">
                      Conditional Automations
                    </h3>
                    <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-bold">
                      2 Active
                    </span>
                  </div>

                  <div className="space-y-4">
                    {workflows.map(wf => (
                      <div key={wf.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <h5 className="font-bold text-xs text-slate-900">{wf.name}</h5>
                            <span className="text-[10px] text-slate-500">Trigger: {wf.triggerEvent}</span>
                          </div>
                          <span className="text-[10px] font-mono text-slate-400 font-bold">
                            {wf.runsCount} executions
                          </span>
                        </div>

                        {/* Visual node steps */}
                        <div className="space-y-1.5 pl-2 border-l-2 border-blue-400">
                          {wf.actions.map(action => (
                            <div key={action.id} className="text-[11px] text-slate-600 flex items-center gap-1.5">
                              <span className="text-blue-500 font-bold">&bull;</span>
                              <span>{action.summary}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          )}

        </main>
      </div>

    </div>
  );
};
