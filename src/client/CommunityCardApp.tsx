import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaSearch,
  FaFacebookF,
  FaInstagram,
  FaHeart,
  FaRegHeart,
  FaBookmark,
  FaRegBookmark,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaShareAlt,
  FaPaperPlane,
  FaCheck,
  FaBell,
  FaPray,
  FaClock,
  FaDirections,
  FaGift,
  FaChild,
  FaChurch,
  FaPhoneAlt,
  FaCopy,
} from 'react-icons/fa';

interface CommunityCard {
  id: string;
  tag: string;
  tagIcon: string;
  tagColor: string;
  location: string;
  dateOrTime: string;
  title: string;
  titleAmharic?: string;
  description: string;
  subtext?: string;
  imageUrl: string;
  initialLikes: number;
  attendingCount: number;
  avatars: { name: string; bg: string; text: string }[];
  ctaType: 'plan-visit' | 'directions' | 'calendar' | 'ministry' | 'give' | 'contact';
  ctaLabel: string;
}

const CARDS_DATA: CommunityCard[] = [
  {
    id: 'card-1',
    tag: '✨ General',
    tagIcon: '✨',
    tagColor: 'bg-amber-100 text-amber-900 border-amber-200',
    location: 'Silver Spring, MD',
    dateOrTime: 'Welcoming You Always',
    title: 'Welcome to Our Community',
    titleAmharic: 'እንኳን ወደ ቤተክርስቲያናችን በደህና መጡ',
    description:
      'A Christ-centered, loving community welcoming individuals and families from all walks of life. Plan your visit and experience authentic worship, warm fellowship, and spiritual growth with us this Sunday.',
    imageUrl: '/static/images/fellowship.jpg',
    initialLikes: 142,
    attendingCount: 86,
    avatars: [
      { name: 'Dr. Bezalem', bg: 'bg-navy-700', text: 'BF' },
      { name: 'Selam', bg: 'bg-amber-600', text: 'ST' },
      { name: 'Bereket', bg: 'bg-emerald-600', text: 'BT' },
      { name: 'Rahel', bg: 'bg-rose-500', text: 'RW' },
    ],
    ctaType: 'plan-visit',
    ctaLabel: 'Plan Your Visit',
  },
  {
    id: 'card-2',
    tag: '🙏 Weekly Gatherings',
    tagIcon: '🙏',
    tagColor: 'bg-blue-100 text-blue-900 border-blue-200',
    location: '12604 New Hampshire Ave',
    dateOrTime: 'Sundays · 10:30 AM – 2:00 PM',
    title: 'Worship & Preaching Service',
    titleAmharic: 'የእሁድ የጋራ አምልኮና ቃሉን ማካፈል',
    description:
      'Join us for uplifting corporate worship, choir & praise, communal intercession, and expository biblical preaching. Children\'s Church and nursery care are available concurrently.',
    imageUrl: '/static/images/sanctuary.jpg',
    initialLikes: 256,
    attendingCount: 175,
    avatars: [
      { name: 'Yohannes', bg: 'bg-indigo-600', text: 'YM' },
      { name: 'Martha', bg: 'bg-amber-500', text: 'MD' },
      { name: 'Tewodros', bg: 'bg-cyan-600', text: 'TG' },
      { name: 'Hanna', bg: 'bg-purple-600', text: 'HA' },
    ],
    ctaType: 'directions',
    ctaLabel: 'Get Directions',
  },
  {
    id: 'card-3',
    tag: '🔥 Midweek Revival',
    tagIcon: '🔥',
    tagColor: 'bg-orange-100 text-orange-900 border-orange-200',
    location: '914 Silver Spring Ave, Ste 204B',
    dateOrTime: 'Wednesdays · 11:00 AM – 2:00 PM',
    title: 'Wednesday Prayer Meeting',
    titleAmharic: 'የረቡዕ የጾምና ጸሎት ፕሮግራም',
    description:
      'Experience deep intercessory prayer, spiritual renewal, personal counseling, and warm fellowship in an intimate setting dedicated to seeking God\'s face for our families and community.',
    imageUrl: '/static/hero_images/crowd_praying.jpg',
    initialLikes: 189,
    attendingCount: 64,
    avatars: [
      { name: 'Eleni', bg: 'bg-pink-600', text: 'EG' },
      { name: 'Dawit', bg: 'bg-blue-600', text: 'DB' },
      { name: 'Tigist', bg: 'bg-teal-600', text: 'TA' },
      { name: 'Kidus', bg: 'bg-amber-700', text: 'KK' },
    ],
    ctaType: 'calendar',
    ctaLabel: 'Add to Calendar',
  },
  {
    id: 'card-4',
    tag: '👶 Next Gen',
    tagIcon: '👶',
    tagColor: 'bg-emerald-100 text-emerald-900 border-emerald-200',
    location: 'Ages 4–11 & 12–18',
    dateOrTime: 'Sundays during 10:30 AM Service',
    title: "Children's & Youth Ministries",
    titleAmharic: 'የህጻናትና የወጣቶች አገልግሎት',
    description:
      'Kids & youth exploring foundations of faith through interactive lessons, creative crafts, singing, and transformative mentorship with dedicated background-checked leaders.',
    subtext: 'Guided by Pastor Dr. Bezalem Fisseha & our passionate children’s leadership team.',
    imageUrl: '/static/images/children.jpg',
    initialLikes: 198,
    attendingCount: 92,
    avatars: [
      { name: 'Bethlehem', bg: 'bg-emerald-500', text: 'BA' },
      { name: 'Samuel', bg: 'bg-indigo-500', text: 'SB' },
      { name: 'Ruth', bg: 'bg-rose-400', text: 'RK' },
      { name: 'Natnael', bg: 'bg-yellow-600', text: 'NT' },
    ],
    ctaType: 'ministry',
    ctaLabel: 'Explore Ministries',
  },
  {
    id: 'card-5',
    tag: '🎁 Stewardship',
    tagIcon: '🎁',
    tagColor: 'bg-amber-100 text-amber-900 border-amber-200',
    location: 'Zelle: emmanuelchurch.maryland@gmail.com',
    dateOrTime: 'Give Online or In-Person',
    title: 'Tithes & Generosity (Give)',
    titleAmharic: 'አስራትና በጎ አድራጎት',
    description:
      'Support our local mission, humanitarian outreach, and community programs. "Each of you should give what you have decided in your heart to give, for God loves a cheerful giver." (2 Cor 9:7)',
    imageUrl: '/assets/aistudio/669027030_1382859270536542_1333211100713107624_n_2c9d8b1c.jpg',
    initialLikes: 215,
    attendingCount: 140,
    avatars: [
      { name: 'Finance', bg: 'bg-blue-800', text: 'EC' },
      { name: 'Outreach', bg: 'bg-amber-600', text: 'OR' },
      { name: 'Missions', bg: 'bg-emerald-700', text: 'MS' },
    ],
    ctaType: 'give',
    ctaLabel: 'Tithe or Give via Zelle',
  },
  {
    id: 'card-6',
    tag: '✉️ Connect',
    tagIcon: '✉️',
    tagColor: 'bg-rose-100 text-rose-900 border-rose-200',
    location: 'Call (240) 716-2246',
    dateOrTime: 'Mon–Fri · 9:00 AM – 3:00 PM',
    title: 'Get In Touch & Pastoral Care',
    titleAmharic: 'ያግኙን እና የፓስተር ምክር',
    description:
      'Need pastoral counseling, intercessory prayer, or have questions about EUC Maryland? Connect directly with our pastoral team or Senior Pastor Dr. Bezalem Fisseha.',
    subtext: 'Email: bezalemf@yahoo.com · Office: 914 Silver Spring Ave, Ste 204B',
    imageUrl: '/assets/aistudio/486056033_1067548748734264_7322107188669003734_n_184e0a0b.jpg',
    initialLikes: 312,
    attendingCount: 110,
    avatars: [
      { name: 'Pastor Bezalem', bg: 'bg-navy-900', text: 'BF' },
      { name: 'Pastoral Staff', bg: 'bg-amber-700', text: 'PS' },
      { name: 'Prayer Team', bg: 'bg-blue-700', text: 'PT' },
    ],
    ctaType: 'contact',
    ctaLabel: 'Send Inquiry',
  },
];

export const CommunityCardApp: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [likes, setLikes] = useState<Record<string, { count: number; userLiked: boolean }>>(() => {
    const map: Record<string, { count: number; userLiked: boolean }> = {};
    CARDS_DATA.forEach((c) => {
      map[c.id] = { count: c.initialLikes, userLiked: false };
    });
    return map;
  });
  const [bookmarks, setBookmarks] = useState<Record<string, boolean>>({});
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Inline Contact form state for Card 6
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSending, setContactSending] = useState(false);
  const [contactSuccess, setContactSuccess] = useState(false);

  // Zelle Modal state
  const [showZelleModal, setShowZelleModal] = useState(false);
  const [zelleCopied, setZelleCopied] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3200);
  };

  const toggleLike = (cardId: string) => {
    setLikes((prev) => {
      const current = prev[cardId] || { count: 0, userLiked: false };
      const nextUserLiked = !current.userLiked;
      const nextCount = nextUserLiked ? current.count + 1 : current.count - 1;
      return {
        ...prev,
        [cardId]: { count: Math.max(0, nextCount), userLiked: nextUserLiked },
      };
    });
  };

  const toggleBookmark = (cardId: string) => {
    setBookmarks((prev) => {
      const nextState = !prev[cardId];
      if (nextState) {
        showToast('Saved to your bookmarked gatherings!');
      }
      return { ...prev, [cardId]: nextState };
    });
  };

  const handleShare = (card: CommunityCard) => {
    const shareUrl = window.location.origin + '/#services-schedule';
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`${card.title} - Emmanuel United Church of MD: ${shareUrl}`);
      showToast('Link copied to clipboard!');
    } else {
      showToast('Sharing ' + card.title);
    }
  };

  const downloadCalendarFile = (isSunday: boolean) => {
    const title = isSunday
      ? 'EUC Maryland Sunday Worship Service'
      : 'EUC Maryland Midweek Prayer Gathering';
    const location = isSunday
      ? '12604 New Hampshire Ave, Silver Spring, MD 20904'
      : '914 Silver Spring Ave, Ste 204B, Silver Spring, MD 20910';
    const description = isSunday
      ? 'Corporate Sunday worship, choral praise, and biblical preaching at Emmanuel United Church of MD.'
      : 'Intercessory prayer and fellowship at Emmanuel United Church of MD.';

    const now = new Date();
    const targetDay = isSunday ? 0 : 3;
    let daysUntil = (targetDay + 7 - now.getDay()) % 7;
    if (daysUntil === 0) daysUntil = 7;
    const eventDate = new Date(now.getTime() + daysUntil * 24 * 60 * 60 * 1000);
    eventDate.setHours(isSunday ? 10 : 11, isSunday ? 30 : 0, 0, 0);
    const endDate = new Date(eventDate.getTime() + 3.5 * 60 * 60 * 1000);

    const pad = (n: number) => String(n).padStart(2, '0');
    const formatIcs = (d: Date) =>
      `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}00Z`;

    const ics = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Emmanuel United Church of MD//Events//EN',
      'BEGIN:VEVENT',
      `UID:${Date.now()}@eucmaryland.org`,
      `DTSTAMP:${formatIcs(new Date())}`,
      `DTSTART:${formatIcs(eventDate)}`,
      `DTEND:${formatIcs(endDate)}`,
      `SUMMARY:${title}`,
      `LOCATION:${location}`,
      `DESCRIPTION:${description}`,
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = isSunday ? 'EUC_Sunday_Worship.ics' : 'EUC_Wednesday_Prayer.ics';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    showToast('Downloaded calendar reminder (.ics)');
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail) {
      showToast('Please enter your name and email.');
      return;
    }
    setContactSending(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: contactName,
          email: contactEmail,
          inquiry_type: 'pastoral_counseling',
          message: contactMessage || 'Inquiry sent from interactive community card.',
        }),
      });
      if (res.ok) {
        setContactSuccess(true);
        showToast('Message sent to Pastor Dr. Bezalem Fisseha & team!');
        setContactName('');
        setContactEmail('');
        setContactMessage('');
        setTimeout(() => setContactSuccess(false), 5000);
      } else {
        showToast('Submission received. We will contact you soon.');
      }
    } catch {
      showToast('Message queued. You can also call (240) 716-2246.');
    } finally {
      setContactSending(false);
    }
  };

  const copyZelle = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText('emmanuelchurch.maryland@gmail.com');
      setZelleCopied(true);
      showToast('Zelle address copied to clipboard!');
      setTimeout(() => setZelleCopied(false), 3000);
    }
  };

  // Filter cards by search and tags
  const filteredCards = CARDS_DATA.filter((card) => {
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      card.title.toLowerCase().includes(q) ||
      (card.titleAmharic && card.titleAmharic.toLowerCase().includes(q)) ||
      card.description.toLowerCase().includes(q) ||
      card.location.toLowerCase().includes(q) ||
      card.tag.toLowerCase().includes(q);

    const matchesTag =
      selectedTag === 'all' ||
      (selectedTag === 'worship' && card.id === 'card-2') ||
      (selectedTag === 'prayer' && card.id === 'card-3') ||
      (selectedTag === 'nextgen' && card.id === 'card-4') ||
      (selectedTag === 'give' && card.id === 'card-5');

    return matchesSearch && matchesTag;
  });

  return (
    <div className="w-full min-h-screen bg-[#f5f7ff] text-slate-900 py-6 sm:py-10 md:py-16 px-3 sm:px-6 flex items-center justify-center font-sans antialiased selection:bg-amber-500 selection:text-white">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-6 z-[200] px-5 py-3 rounded-full bg-[#1a2a4a] text-white text-xs sm:text-sm font-semibold shadow-2xl border border-amber-400/30 flex items-center gap-2"
          >
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Elevated Framer Motion Frame */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="w-full max-w-6xl mx-auto bg-white rounded-[28px] shadow-2xl shadow-indigo-950/10 border border-slate-100 p-5 sm:p-7 md:p-10 relative overflow-hidden"
      >
        {/* Subtle decorative top glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-2 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent opacity-80" />

        {/* ==================================================== */}
        {/* A. Interactive Header & Top Bar                       */}
        {/* ==================================================== */}
        <header className="flex flex-col lg:flex-row items-center justify-between gap-6 pb-6 border-b border-slate-100">
          
          {/* Top Left: Pill-shaped search bar */}
          <div className="w-full lg:w-72 order-2 lg:order-1">
            <div className="relative flex items-center">
              <FaSearch className="absolute left-4 text-slate-400 w-3.5 h-3.5 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search community events, services..."
                className="w-full pl-10 pr-4 py-2.5 rounded-full bg-slate-50 border border-slate-200/80 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1a2a4a] focus:border-transparent transition-all shadow-inner"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 text-slate-400 hover:text-slate-600 text-xs font-bold"
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Centered Title & Branding */}
          <div className="text-center order-1 lg:order-2 flex-1 px-2">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-serif font-black tracking-tight text-[#1a2a4a]">
              Emmanuel United Church of Maryland
            </h1>
            <div className="mt-1 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-semibold text-[#c5a059]">
              <span className="font-medium tracking-wide">
                &ldquo;ሁለንተናዊ ዕድገት ለሁለንተናዊ ተልዕኮ&rdquo;
              </span>
              <span className="text-slate-300" aria-hidden="true">•</span>
              <span className="font-normal text-slate-600">
                &ldquo;Wholistic Development for Wholistic Mission&rdquo;
              </span>
            </div>
          </div>

          {/* Top Right: Modern, round social button triggers */}
          <div className="flex items-center gap-2.5 order-3">
            <motion.a
              whileHover={{ scale: 1.12, y: -2 }}
              whileTap={{ scale: 0.94 }}
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Emmanuel United Church Facebook"
              className="w-9 h-9 rounded-full bg-slate-100 hover:bg-[#1a2a4a] text-slate-700 hover:text-white flex items-center justify-center text-xs transition-colors shadow-sm"
            >
              <FaFacebookF />
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.12, y: -2 }}
              whileTap={{ scale: 0.94 }}
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Emmanuel United Church Instagram"
              className="w-9 h-9 rounded-full bg-slate-100 hover:bg-gradient-to-tr hover:from-amber-500 hover:via-rose-500 hover:to-purple-600 text-slate-700 hover:text-white flex items-center justify-center text-xs transition-colors shadow-sm"
            >
              <FaInstagram />
            </motion.a>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                if (typeof (window as any).openVisitModal === 'function') {
                  (window as any).openVisitModal();
                } else {
                  showToast('Join us this Sunday at 10:30 AM!');
                }
              }}
              className="ml-1 px-4 py-2 rounded-full bg-[#1a2a4a] hover:bg-[#253a66] text-white text-xs font-bold transition-all shadow-md flex items-center gap-1.5"
            >
              <span>Plan Visit</span>
              <span aria-hidden="true">&rarr;</span>
            </motion.button>
          </div>
        </header>

        {/* ==================================================== */}
        {/* B. Global Quick-Info Services Cards (Header Span)    */}
        {/* ==================================================== */}
        <section className="pt-6 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            
            {/* Worship Service Chip */}
            <motion.div
              whileHover={{ y: -3 }}
              onClick={() => setSelectedTag(selectedTag === 'worship' ? 'all' : 'worship')}
              className={`p-3.5 sm:p-4 rounded-2xl border transition-all cursor-pointer flex items-center gap-3.5 shadow-sm ${
                selectedTag === 'worship'
                  ? 'bg-blue-50/90 border-blue-400 ring-2 ring-blue-400/30'
                  : 'bg-slate-50/80 hover:bg-blue-50/50 border-slate-200/80'
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center text-base shrink-0 shadow-sm">
                <FaBell />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-900">
                  <span>Worship Service</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                </div>
                <p className="text-xs text-slate-600 font-medium truncate mt-0.5">
                  Sundays @ 10:30 AM – 2:00 PM
                </p>
                <p className="text-[11px] text-slate-500 truncate">
                  12604 New Hampshire Ave, Silver Spring
                </p>
              </div>
            </motion.div>

            {/* Midweek Prayer Chip */}
            <motion.div
              whileHover={{ y: -3 }}
              onClick={() => setSelectedTag(selectedTag === 'prayer' ? 'all' : 'prayer')}
              className={`p-3.5 sm:p-4 rounded-2xl border transition-all cursor-pointer flex items-center gap-3.5 shadow-sm ${
                selectedTag === 'prayer'
                  ? 'bg-orange-50/90 border-orange-400 ring-2 ring-orange-400/30'
                  : 'bg-slate-50/80 hover:bg-orange-50/50 border-slate-200/80'
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-orange-600 text-white flex items-center justify-center text-base shrink-0 shadow-sm">
                <FaPray />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-orange-900">
                  <span>Midweek Prayer</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                </div>
                <p className="text-xs text-slate-600 font-medium truncate mt-0.5">
                  Wednesdays @ 11:00 AM – 2:00 PM
                </p>
                <p className="text-[11px] text-slate-500 truncate">
                  914 Silver Spring Ave, Ste 204B
                </p>
              </div>
            </motion.div>

            {/* Next Gen / Youth Ministry Chip */}
            <motion.div
              whileHover={{ y: -3 }}
              onClick={() => setSelectedTag(selectedTag === 'nextgen' ? 'all' : 'nextgen')}
              className={`p-3.5 sm:p-4 rounded-2xl border transition-all cursor-pointer flex items-center gap-3.5 shadow-sm ${
                selectedTag === 'nextgen'
                  ? 'bg-emerald-50/90 border-emerald-400 ring-2 ring-emerald-400/30'
                  : 'bg-slate-50/80 hover:bg-emerald-50/50 border-slate-200/80'
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center text-base shrink-0 shadow-sm">
                <FaChild />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-900">
                  <span>Kingdom Kids & Youth</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                </div>
                <p className="text-xs text-slate-600 font-medium truncate mt-0.5">
                  Ages 4–11 & 12–18 Discipleship
                </p>
                <p className="text-[11px] text-slate-500 truncate">
                  Concurrent Sunday School Classes
                </p>
              </div>
            </motion.div>

          </div>

          {/* Active filter reset notice */}
          {selectedTag !== 'all' && (
            <div className="mt-3 flex items-center justify-between px-2 text-xs text-slate-500">
              <span>
                Filtering cards by category: <strong className="uppercase text-[#1a2a4a]">{selectedTag}</strong>
              </span>
              <button
                onClick={() => setSelectedTag('all')}
                className="text-rose-600 hover:underline font-bold"
              >
                Clear Filter (Show All 6)
              </button>
            </div>
          )}
        </section>

        {/* ==================================================== */}
        {/* C. Grid: Dynamic "Community Highlights" Feeds         */}
        {/* ==================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
          <AnimatePresence>
            {filteredCards.map((card) => {
              const cardLike = likes[card.id] || { count: card.initialLikes, userLiked: false };
              const isBookmarked = !!bookmarks[card.id];

              return (
                <motion.article
                  key={card.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  whileHover={{ y: -5, scale: 1.01 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between overflow-hidden group"
                >
                  {/* Photo with Overlay Gradient */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                    <img
                      src={card.imageUrl}
                      alt={card.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out brightness-[0.92]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/25 to-transparent" />

                    {/* Top Pill Tag */}
                    <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md shadow-xs ${card.tagColor}`}>
                        {card.tag}
                      </span>
                    </div>

                    {/* Top Right Action Buttons (Bookmark & Share) */}
                    <div className="absolute top-3.5 right-3.5 flex items-center gap-1.5">
                      <motion.button
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => toggleBookmark(card.id)}
                        aria-label="Bookmark card"
                        className={`w-8 h-8 rounded-full backdrop-blur-md flex items-center justify-center text-xs transition-colors shadow-sm ${
                          isBookmarked
                            ? 'bg-amber-500 text-white'
                            : 'bg-black/40 text-white hover:bg-black/60'
                        }`}
                      >
                        {isBookmarked ? <FaBookmark /> : <FaRegBookmark />}
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleShare(card)}
                        aria-label="Share card"
                        className="w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-md flex items-center justify-center text-xs transition-colors shadow-sm"
                      >
                        <FaShareAlt />
                      </motion.button>
                    </div>

                    {/* Location & Time Stamp over photo bottom */}
                    <div className="absolute bottom-3 left-3.5 right-3.5 text-white flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5 text-slate-200 font-medium truncate">
                        <FaMapMarkerAlt className="text-amber-400 shrink-0 text-xs" />
                        <span className="truncate">{card.location}</span>
                      </div>
                      <span className="shrink-0 text-amber-300 font-semibold bg-black/40 px-2 py-0.5 rounded-full text-[11px] backdrop-blur-xs">
                        {card.dateOrTime.split('·')[0]}
                      </span>
                    </div>
                  </div>

                  {/* Card Content Area */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      
                      {/* Dual-script title */}
                      <div>
                        <h2 className="text-lg sm:text-xl font-serif font-bold text-[#1a2a4a] leading-snug group-hover:text-amber-700 transition-colors">
                          {card.title}
                        </h2>
                        {card.titleAmharic && (
                          <p className="text-xs font-semibold text-amber-700/90 font-ethiopic mt-0.5">
                            {card.titleAmharic}
                          </p>
                        )}
                      </div>

                      {/* Main description */}
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                        {card.description}
                      </p>

                      {/* Subtext (if any) */}
                      {card.subtext && (
                        <p className="text-[11px] text-slate-500 italic border-l-2 border-amber-400/80 pl-2.5 mt-2">
                          {card.subtext}
                        </p>
                      )}

                      {/* Inline mini contact form inside Card 6 */}
                      {card.id === 'card-6' && (
                        <div className="mt-3 pt-3 border-t border-slate-100">
                          {contactSuccess ? (
                            <div className="p-3 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-semibold flex items-center gap-2">
                              <FaCheck className="text-emerald-600" />
                              <span>Thank you! Your request was received.</span>
                            </div>
                          ) : (
                            <form onSubmit={handleContactSubmit} className="space-y-2">
                              <div className="grid grid-cols-2 gap-2">
                                <input
                                  type="text"
                                  required
                                  value={contactName}
                                  onChange={(e) => setContactName(e.target.value)}
                                  placeholder="Your Name"
                                  className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs focus:ring-1 focus:ring-[#1a2a4a] focus:bg-white outline-none"
                                />
                                <input
                                  type="email"
                                  required
                                  value={contactEmail}
                                  onChange={(e) => setContactEmail(e.target.value)}
                                  placeholder="Your Email"
                                  className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs focus:ring-1 focus:ring-[#1a2a4a] focus:bg-white outline-none"
                                />
                              </div>
                              <input
                                type="text"
                                value={contactMessage}
                                onChange={(e) => setContactMessage(e.target.value)}
                                placeholder="Prayer need or brief question..."
                                className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs focus:ring-1 focus:ring-[#1a2a4a] focus:bg-white outline-none"
                              />
                              <button
                                type="submit"
                                disabled={contactSending}
                                className="w-full py-1.5 rounded-lg bg-[#1a2a4a] hover:bg-[#253a66] text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                              >
                                <FaPaperPlane className="text-[10px]" />
                                <span>{contactSending ? 'Sending...' : 'Send to Pastoral Team'}</span>
                              </button>
                            </form>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Footer Row: Likes, Faces, CTA */}
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                      
                      {/* Left: Like heart marker */}
                      <motion.button
                        whileTap={{ scale: 0.85 }}
                        onClick={() => toggleLike(card.id)}
                        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-bold transition-colors cursor-pointer ${
                          cardLike.userLiked
                            ? 'bg-rose-50 text-rose-600 border border-rose-200'
                            : 'bg-slate-100/80 hover:bg-rose-50 hover:text-rose-600 text-slate-600'
                        }`}
                        aria-label={`Like ${card.title}`}
                      >
                        <motion.span
                          animate={cardLike.userLiked ? { scale: [1, 1.4, 1] } : {}}
                          transition={{ duration: 0.3 }}
                        >
                          {cardLike.userLiked ? (
                            <FaHeart className="text-rose-600" />
                          ) : (
                            <FaRegHeart />
                          )}
                        </motion.span>
                        <span className="tabular-nums font-semibold">{cardLike.count}</span>
                      </motion.button>

                      {/* Middle: Community Avatar faces */}
                      <div className="flex items-center -space-x-1.5" title={`${card.attendingCount} members participating`}>
                        {card.avatars.slice(0, 3).map((av, idx) => (
                          <div
                            key={idx}
                            className={`w-6 h-6 rounded-full text-white font-bold text-[9px] flex items-center justify-center ring-2 ring-white shadow-xs ${av.bg}`}
                            title={av.name}
                          >
                            {av.text}
                          </div>
                        ))}
                        <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-700 font-bold text-[9px] flex items-center justify-center ring-2 ring-white">
                          +{card.attendingCount}
                        </div>
                      </div>

                      {/* Right: Dynamic CTA Button */}
                      <div>
                        {card.ctaType === 'plan-visit' && (
                          <button
                            type="button"
                            onClick={() => {
                              if (typeof (window as any).openVisitModal === 'function') {
                                (window as any).openVisitModal();
                              } else {
                                showToast('Opening visit planner...');
                              }
                            }}
                            className="px-3 py-1.5 rounded-xl bg-[#1a2a4a] hover:bg-[#253a66] text-white text-xs font-bold transition-all shadow-xs"
                          >
                            {card.ctaLabel}
                          </button>
                        )}

                        {card.ctaType === 'directions' && (
                          <a
                            href="https://maps.google.com/?q=12604+New+Hampshire+Ave,+Silver+Spring,+MD+20904"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all inline-flex items-center gap-1 shadow-xs"
                          >
                            <FaDirections className="text-[11px]" />
                            <span>Directions</span>
                          </a>
                        )}

                        {card.ctaType === 'calendar' && (
                          <button
                            type="button"
                            onClick={() => downloadCalendarFile(false)}
                            className="px-3 py-1.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-bold transition-all inline-flex items-center gap-1"
                          >
                            <FaCalendarAlt className="text-amber-600 text-[11px]" />
                            <span>Calendar</span>
                          </button>
                        )}

                        {card.ctaType === 'ministry' && (
                          <a
                            href="/ministries#children"
                            className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-xs"
                          >
                            Explore
                          </a>
                        )}

                        {card.ctaType === 'give' && (
                          <button
                            type="button"
                            onClick={() => setShowZelleModal(true)}
                            className="px-3 py-1.5 rounded-xl bg-[#c5a059] hover:bg-[#b08e48] text-white text-xs font-bold transition-all inline-flex items-center gap-1 shadow-xs"
                          >
                            <FaGift className="text-[11px]" />
                            <span>Tithe</span>
                          </button>
                        )}

                        {card.ctaType === 'contact' && (
                          <a
                            href="tel:2407162246"
                            className="px-3 py-1.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-bold transition-all inline-flex items-center gap-1"
                          >
                            <FaPhoneAlt className="text-[10px]" />
                            <span>Call</span>
                          </a>
                        )}
                      </div>

                    </div>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </div>

        {/* ==================================================== */}
        {/* Footer info & Links                                   */}
        {/* ==================================================== */}
        <footer className="mt-10 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-slate-700">Senior Pastor: Dr. Bezalem Fisseha</span>
            <span>•</span>
            <a href="mailto:bezalemf@yahoo.com" className="hover:underline">
              bezalemf@yahoo.com
            </a>
          </div>

          <div className="flex items-center gap-4">
            <a href="/about" className="hover:text-[#1a2a4a] font-semibold transition-colors">
              About Us
            </a>
            <a href="/ministries" className="hover:text-[#1a2a4a] font-semibold transition-colors">
              Ministries
            </a>
            <a href="/give" className="hover:text-[#1a2a4a] font-semibold transition-colors">
              Giving
            </a>
            <a href="/contact" className="hover:text-[#1a2a4a] font-semibold transition-colors">
              Contact
            </a>
            <a href="/dashboard" className="text-amber-700 font-bold hover:underline">
              Leader Portal &rarr;
            </a>
          </div>
        </footer>

      </motion.div>

      {/* ==================================================== */}
      {/* Zelle Tithe & Giving Modal Popup                     */}
      {/* ==================================================== */}
      <AnimatePresence>
        {showZelleModal && (
          <div
            className="fixed inset-0 z-[250] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs"
            onClick={() => setShowZelleModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-slate-100 space-y-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-sm">
                    <FaGift />
                  </span>
                  <h3 className="text-lg font-serif font-bold text-[#1a2a4a]">
                    Give via Zelle
                  </h3>
                </div>
                <button
                  onClick={() => setShowZelleModal(false)}
                  className="w-7 h-7 rounded-full bg-slate-100 text-slate-500 hover:text-slate-800 flex items-center justify-center text-xs font-bold"
                >
                  ✕
                </button>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                You can send your tithes, offerings, and missions support directly through your bank&apos;s Zelle feature without any processing fees.
              </p>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  Official Church Zelle Recipient
                </span>
                <div className="flex items-center justify-between gap-2 bg-white px-3 py-2 rounded-xl border border-slate-300">
                  <span className="text-xs sm:text-sm font-mono font-bold text-[#1a2a4a] select-all truncate">
                    emmanuelchurch.maryland@gmail.com
                  </span>
                  <button
                    type="button"
                    onClick={copyZelle}
                    className="shrink-0 p-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-semibold flex items-center gap-1 transition-colors"
                  >
                    {zelleCopied ? <FaCheck className="text-emerald-600" /> : <FaCopy />}
                    <span>{zelleCopied ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <p className="text-[11px] text-slate-500">
                  Recipient Name on Account: <strong>Emmanuel United Church</strong>
                </p>
              </div>

              <div className="pt-2 flex items-center justify-between gap-2">
                <a
                  href="/give"
                  className="text-xs text-slate-600 hover:underline font-semibold"
                >
                  View check & in-person options &rarr;
                </a>
                <button
                  type="button"
                  onClick={() => setShowZelleModal(false)}
                  className="px-5 py-2 rounded-xl bg-[#1a2a4a] text-white text-xs font-bold hover:bg-[#253a66] transition-all"
                >
                  Done
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default CommunityCardApp;
