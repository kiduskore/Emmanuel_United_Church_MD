import {
  Member,
  ServicePlan,
  Transaction,
  GivingFinancialMetrics,
  EventBooking,
  SafetyCheck,
  CommunicationMessage,
  WorkflowAutomation,
  Campus
} from '../types/chms';

export const CHMS_CAMPUSES: Campus[] = [
  {
    id: 'silver-spring-main',
    name: 'Silver Spring Sanctuary (Main)',
    address: '12604 New Hampshire Ave, Silver Spring, MD 20904',
    isMainCampus: true,
    timezone: 'America/New_York'
  },
  {
    id: 'silver-spring-office',
    name: 'Administrative & Prayer Center',
    address: '914 Silver Spring Ave, Ste 204B, Silver Spring, MD 20910',
    isMainCampus: false,
    timezone: 'America/New_York'
  }
];

export const INITIAL_CHMS_MEMBERS: Member[] = [
  {
    id: 'mem-101',
    campusId: 'silver-spring-main',
    avatarUrl: '/assets/aistudio/485151948_1067548775400928_6282613185091891205_n_db5e663e.jpg',
    fullName: 'Ruth Fisseha',
    firstName: 'Ruth',
    lastName: 'Fisseha',
    email: 'ruth.fisseha@eucmaryland.org',
    phone: '(240) 716-2246',
    householdId: 'hh-1',
    householdName: 'Fisseha Household',
    householdRole: 'spouse',
    membershipStatus: 'staff',
    spiritualMilestone: 'leading',
    tags: ['#WorshipBand', '#WorshipLead', '#ElderCouncil', '#Staff'],
    lastAttendance: 'Nov 3, 2026 (Sunday 10:30 AM)',
    firstVisitDate: 'Jan 15, 2018',
    safetyClearanceStatus: 'approved',
    familyMembers: [
      { memberId: 'mem-100', fullName: 'Dr. Bezalem Fisseha', role: 'head', relationship: 'Husband' },
      { memberId: 'mem-102', fullName: 'Yafet Fisseha', role: 'child', relationship: 'Son' }
    ],
    activityTimeline: [
      { id: 'act-1', timestamp: '2026-11-03 10:25', type: 'attendance', title: 'Checked in to Sunday Worship', description: 'Attended Sanctuary Service', actor: 'Self' },
      { id: 'act-2', timestamp: '2026-11-01 09:14', type: 'giving', title: 'Recurring Tithe Settled', description: '$350.00 to Tithes & Offerings', actor: 'Automated Billing' },
      { id: 'act-3', timestamp: '2026-10-24 14:00', type: 'background_check', title: 'MinistrySafe Background Check Cleared', description: 'Level 1 Minor Safety Certified', actor: 'Safety Coordinator' }
    ],
    notes: 'Director of Music and Corporate Liturgy.'
  },
  {
    id: 'mem-102',
    campusId: 'silver-spring-main',
    avatarUrl: '/assets/aistudio/668522396_1382859160536553_2419448380390787819_n_c696cc18.jpg',
    fullName: 'Yafet Fisseha',
    firstName: 'Yafet',
    lastName: 'Fisseha',
    email: 'yafet.f@eucmaryland.org',
    phone: '(240) 812-4419',
    householdId: 'hh-1',
    householdName: 'Fisseha Household',
    householdRole: 'child',
    membershipStatus: 'leader',
    spiritualMilestone: 'pod_leader',
    tags: ['#YouthLeader', '#AudioTech', '#YoungAdults'],
    lastAttendance: 'Nov 3, 2026 (Sunday 10:30 AM)',
    firstVisitDate: 'Jan 15, 2018',
    safetyClearanceStatus: 'approved',
    familyMembers: [
      { memberId: 'mem-100', fullName: 'Dr. Bezalem Fisseha', role: 'head', relationship: 'Father' },
      { memberId: 'mem-101', fullName: 'Ruth Fisseha', role: 'spouse', relationship: 'Mother' }
    ],
    activityTimeline: [
      { id: 'act-4', timestamp: '2026-11-03 09:00', type: 'attendance', title: 'Audio Board Lead', description: 'Sanctuary Main Stage Sound Check', actor: 'Roster System' },
      { id: 'act-5', timestamp: '2026-10-28 19:30', type: 'group', title: 'Led DNA Pod 4', description: 'Met at Silver Spring Ave Room 204B', actor: 'Self' }
    ]
  },
  {
    id: 'mem-103',
    campusId: 'silver-spring-main',
    avatarUrl: '/assets/aistudio/669645443_1382859247203211_2944136757014384639_n_920e7c81.jpg',
    fullName: 'Dawit Mengistu',
    firstName: 'Dawit',
    lastName: 'Mengistu',
    email: 'dawit.m@gmail.com',
    phone: '(301) 459-8812',
    householdId: 'hh-2',
    householdName: 'Mengistu Family',
    householdRole: 'head',
    membershipStatus: 'member',
    spiritualMilestone: 'foundations_grad',
    tags: ['#UsherTeam', '#FirstTimeVisitorMentor', '#BuildingFund'],
    lastAttendance: 'Nov 3, 2026 (Sunday 10:30 AM)',
    firstVisitDate: 'Sep 12, 2021',
    safetyClearanceStatus: 'approved',
    familyMembers: [
      { memberId: 'mem-104', fullName: 'Sara Mengistu', role: 'spouse', relationship: 'Spouse' },
      { memberId: 'mem-105', fullName: 'Kaleb Mengistu', role: 'child', relationship: 'Son (Age 7)' }
    ],
    activityTimeline: [
      { id: 'act-6', timestamp: '2026-11-03 10:15', type: 'attendance', title: 'Greeter / Usher Service', description: 'Main Foyer Station A', actor: 'Hospitality Lead' },
      { id: 'act-7', timestamp: '2026-10-30 11:00', type: 'giving', title: 'Building Project Pledge Gift', description: '$500.00 via ACH Check', actor: 'Finance Admin' }
    ]
  },
  {
    id: 'mem-106',
    campusId: 'silver-spring-main',
    avatarUrl: '/assets/aistudio/669727217_1382859173869885_7702698326695477048_n_6bc2552a.jpg',
    fullName: 'Bethlehem Tadesse',
    firstName: 'Bethlehem',
    lastName: 'Tadesse',
    email: 'betty.tadesse@outlook.com',
    phone: '(202) 674-9031',
    householdId: 'hh-3',
    householdName: 'Tadesse Household',
    householdRole: 'head',
    membershipStatus: 'first_time_guest',
    spiritualMilestone: 'saved',
    tags: ['#FirstTimeVisitor', '#NewGuest', '#FollowUpRequired'],
    lastAttendance: 'Nov 3, 2026 (Sunday 10:30 AM)',
    firstVisitDate: 'Nov 3, 2026',
    safetyClearanceStatus: 'not_required',
    familyMembers: [],
    activityTimeline: [
      { id: 'act-8', timestamp: '2026-11-03 12:15', type: 'note', title: 'Submitted Connect Card', description: 'Requested pastoral contact regarding water baptism', actor: 'Host Welcome Desk' },
      { id: 'act-9', timestamp: '2026-11-03 14:00', type: 'sms', title: 'Welcome SMS Dispatched', description: 'Automated 2-hour post-service pastoral greeting sent', actor: 'Workflow Engine' }
    ],
    notes: 'Referred by Ruth Fisseha. Interested in young adults life group.'
  },
  {
    id: 'mem-107',
    campusId: 'silver-spring-main',
    avatarUrl: '/assets/aistudio/764907043_1483870080435460_8898126455633256962_n_fa7c8f93.jpg',
    fullName: 'Michael Tesfaye',
    firstName: 'Michael',
    lastName: 'Tesfaye',
    email: 'm.tesfaye@gmail.com',
    phone: '(240) 551-9022',
    householdId: 'hh-4',
    householdName: 'Tesfaye Household',
    householdRole: 'head',
    membershipStatus: 'leader',
    spiritualMilestone: 'pod_leader',
    tags: ['#ChildrenMinistry', '#KidsCheckIn', '#BackgroundCheckExpiring'],
    lastAttendance: 'Nov 3, 2026 (Sunday 10:30 AM)',
    firstVisitDate: 'Mar 10, 2020',
    safetyClearanceStatus: 'pending',
    familyMembers: [],
    activityTimeline: [
      { id: 'act-10', timestamp: '2026-11-02 16:30', type: 'background_check', title: 'Renewal Verification Initiated', description: 'MinistrySafe 24-month renewal in review', actor: 'Safety Coordinator' }
    ],
    notes: 'Volunteer lead for 1st-4th grade Sunday class.'
  }
];

export const INITIAL_SERVICE_PLAN: ServicePlan = {
  id: 'svc-2026-11-08',
  campusId: 'silver-spring-main',
  serviceDate: '2026-11-08',
  serviceTitle: 'Faith That Overcomes: Arise & Build',
  serviceTimes: ['10:30 AM – 2:00 PM EST'],
  theme: 'Wholistic Development for Wholistic Mission (Nehemiah 2:20)',
  sermonSpeaker: 'Pastor Dr. Bezalem Fisseha',
  sermonTitle: 'Standing in the Gap: The Blueprint of Spiritual Tenacity',
  scriptureReference: 'Nehemiah 2:17-20; Ephesians 4:11-16',
  status: 'published',
  runOfService: [
    {
      id: 'lit-1',
      order: 1,
      type: 'prelude',
      title: 'Atmospheric Gathering & Soft Instrumental Prelude',
      durationMinutes: 10,
      itemLead: 'EUC Keys & Strings',
      avCues: 'FOH House Music 20%, Main Sanctuary wash 40% warm gold, Welcome slide loop on center LED',
      lightingPreset: 'Amber Wash 40%',
      attachments: [
        { id: 'att-1', name: 'Sanctuary Run Sheet.pdf', type: 'run_sheet_pdf', url: '#', size: '240 KB' }
      ]
    },
    {
      id: 'lit-2',
      order: 2,
      type: 'call_to_worship',
      title: 'Call to Worship & Opening Congregational Prayer',
      durationMinutes: 5,
      itemLead: 'Elder Dawit Mengistu',
      avCues: 'Pastor Handheld Mic 1 ON, Spotlight Center, Side displays show Nehemiah 2:20 in English and Amharic',
      lightingPreset: 'Podium Focus',
      attachments: []
    },
    {
      id: 'lit-3',
      order: 3,
      type: 'music_set',
      title: 'Praise & Worship Set (Dual Script Praise Set)',
      durationMinutes: 30,
      itemLead: 'Ruth Fisseha & EUC Worship Choir',
      avCues: 'Full band mics unmuted. Click & tracks stereo channel 11-12. Stage lighting active worship dynamic',
      lightingPreset: 'Dynamic Worship Blue/Gold',
      songKey: 'D Major / B Minor',
      bpm: 72,
      attachments: [
        { id: 'att-2', name: 'King of Kings - Chart (D).pdf', type: 'chord_chart', url: '#', size: '1.2 MB' },
        { id: 'att-3', name: 'Worship Slides_Nov8.pptx', type: 'slide_deck', url: '#', size: '8.4 MB' }
      ],
      notes: 'Transition seamlessly into Amharic chorus: ሁለንተናዊ ክብር'
    },
    {
      id: 'lit-4',
      order: 4,
      type: 'announcements',
      title: 'Community Life, Midweek Prayer Notice & Tithes Welcome',
      durationMinutes: 8,
      itemLead: 'Yafet Fisseha',
      avCues: 'Tithe.ly QR Code & Text-to-Give Graphic displayed on screen ((855) 942-0989)',
      lightingPreset: 'Warm House 75%',
      attachments: []
    },
    {
      id: 'lit-5',
      order: 5,
      type: 'sermon',
      title: 'Biblical Expository Preaching: Arise & Build',
      durationMinutes: 45,
      itemLead: 'Pastor Dr. Bezalem Fisseha',
      avCues: 'Pulpit Lav Mic ON, Livestream feed ISO Record ON, Slide deck synced via ProPresenter',
      lightingPreset: 'Key Pulpit 100%, House 25%',
      attachments: [
        { id: 'att-4', name: 'Dr.Bezalem_ExpositoryNotes_Nov8.pdf', type: 'slide_deck', url: '#', size: '3.1 MB' }
      ]
    },
    {
      id: 'lit-6',
      order: 6,
      type: 'altar_call',
      title: 'Corporate Intercession & Altar Ministry',
      durationMinutes: 15,
      itemLead: 'Pastoral Council',
      avCues: 'Soft acoustic pad underneath. Altar prayer teams in position with communion elements',
      lightingPreset: 'Subdued Reverence',
      attachments: []
    },
    {
      id: 'lit-7',
      order: 7,
      type: 'benediction',
      title: 'Apostolic Benediction & Fellowship Dismissal',
      durationMinutes: 5,
      itemLead: 'Pastor Dr. Bezalem Fisseha',
      avCues: 'Outro background music, fellowship hall screens display luncheon invite',
      lightingPreset: 'Full House 100%',
      attachments: []
    }
  ],
  volunteerRoster: [
    {
      id: 'vol-1',
      roleTitle: 'Front of House Audio Engineer',
      department: 'production',
      assignedMemberId: 'mem-102',
      assignedMemberName: 'Yafet Fisseha',
      status: 'accepted',
      confirmedAt: 'Nov 2, 2026'
    },
    {
      id: 'vol-2',
      roleTitle: 'Worship Band Leader / Vocals',
      department: 'worship',
      assignedMemberId: 'mem-101',
      assignedMemberName: 'Ruth Fisseha',
      status: 'accepted',
      confirmedAt: 'Oct 30, 2026'
    },
    {
      id: 'vol-3',
      roleTitle: 'Lead Sanctuary Greeter & Head Count',
      department: 'hospitality',
      assignedMemberId: 'mem-103',
      assignedMemberName: 'Dawit Mengistu',
      status: 'accepted',
      confirmedAt: 'Nov 1, 2026'
    },
    {
      id: 'vol-4',
      roleTitle: 'Kids Ministry Security & Check-In',
      department: 'kids',
      assignedMemberId: 'mem-107',
      assignedMemberName: 'Michael Tesfaye',
      status: 'pending',
      notes: 'Waiting for background check renewal sign-off'
    },
    {
      id: 'vol-5',
      roleTitle: 'Broadcast & Live Video Switcher',
      department: 'production',
      assignedMemberId: 'mem-108',
      assignedMemberName: 'Samuel Haile',
      status: 'declined',
      notes: 'Out of town on mission trip'
    }
  ]
};

export const INITIAL_GIVING_METRICS: GivingFinancialMetrics = {
  yearToDateTotal: 284520,
  thisWeekGross: 7850,
  weeklyBudgetGoal: 7000,
  budgetPacingPercentage: 112.1,
  averageGiftSize: 215,
  recurringDonationPercentage: 68.4,
  donorRetentionRate: 91.2,
  fundBreakdown: [
    { fund: 'tithe_general', label: 'General Operating & Tithes', amount: 182400, colorHex: '#3b82f6' },
    { fund: 'building_project', label: 'Sanctuary & Expansion Fund', amount: 56200, colorHex: '#f59e0b' },
    { fund: 'global_missions', label: 'Ethiopia & Global Missions', amount: 28900, colorHex: '#10b981' },
    { fund: 'youth_benevolence', label: 'Young Adults & Benevolence', amount: 17020, colorHex: '#8b5cf6' }
  ],
  monthlyVolumeTrend: [
    { month: 'Jun', actual: 27500, budgetGoal: 28000 },
    { month: 'Jul', actual: 29800, budgetGoal: 28000 },
    { month: 'Aug', actual: 26400, budgetGoal: 28000 },
    { month: 'Sep', actual: 31200, budgetGoal: 28000 },
    { month: 'Oct', actual: 33400, budgetGoal: 28000 },
    { month: 'Nov (MTD)', actual: 7850, budgetGoal: 28000 }
  ]
};

export const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: 'tx-901',
    donorId: 'mem-101',
    donorName: 'Ruth Fisseha',
    donorEmail: 'ruth.fisseha@eucmaryland.org',
    campusId: 'silver-spring-main',
    amount: 350.0,
    fund: 'tithe_general',
    fundLabel: 'General Tithes & Offerings',
    paymentMethod: 'card',
    gateway: 'tithely',
    status: 'settled',
    isRecurring: true,
    frequency: 'monthly',
    timestamp: '2026-11-06 09:15 EST',
    receiptNumber: 'EUC-2026-0941'
  },
  {
    id: 'tx-902',
    donorId: 'mem-103',
    donorName: 'Dawit Mengistu',
    donorEmail: 'dawit.m@gmail.com',
    campusId: 'silver-spring-main',
    amount: 500.0,
    fund: 'building_project',
    fundLabel: 'Sanctuary Building Fund',
    paymentMethod: 'ach',
    gateway: 'stripe',
    status: 'settled',
    isRecurring: false,
    timestamp: '2026-11-05 14:22 EST',
    receiptNumber: 'EUC-2026-0942'
  },
  {
    id: 'tx-903',
    donorId: 'mem-109',
    donorName: 'Anonymous Giver',
    donorEmail: 'partner@eucmaryland.org',
    campusId: 'silver-spring-main',
    amount: 250.0,
    fund: 'global_missions',
    fundLabel: 'DMV & Ethiopia Evangelism',
    paymentMethod: 'zelle',
    gateway: 'zelle',
    status: 'settled',
    isRecurring: false,
    timestamp: '2026-11-05 11:05 EST',
    receiptNumber: 'EUC-2026-0943'
  },
  {
    id: 'tx-904',
    donorId: 'mem-110',
    donorName: 'Daniel Assefa',
    donorEmail: 'daniel.a@gmail.com',
    campusId: 'silver-spring-main',
    amount: 150.0,
    fund: 'youth_benevolence',
    fundLabel: 'Young Adults & Student Support',
    paymentMethod: 'text2give',
    gateway: 'tithely',
    status: 'settled',
    isRecurring: true,
    frequency: 'weekly',
    timestamp: '2026-11-04 18:40 EST',
    receiptNumber: 'EUC-2026-0944'
  },
  {
    id: 'tx-905',
    donorId: 'mem-111',
    donorName: 'Martha Berhanu',
    donorEmail: 'martha.b@yahoo.com',
    campusId: 'silver-spring-main',
    amount: 1200.0,
    fund: 'tithe_general',
    fundLabel: 'General Tithes & Offerings',
    paymentMethod: 'cash_check',
    gateway: 'manual',
    status: 'settled',
    isRecurring: false,
    timestamp: '2026-11-03 12:45 EST',
    receiptNumber: 'EUC-2026-0945'
  }
];

export const INITIAL_EVENT_BOOKINGS: EventBooking[] = [
  {
    id: 'evt-bk-1',
    title: 'Sunday Corporate Worship & Holy Communion',
    campusId: 'silver-spring-main',
    startDateTime: '2026-11-08 09:30',
    endDateTime: '2026-11-08 14:30',
    organizerName: 'Pastor Dr. Bezalem Fisseha',
    ministryDepartment: 'Sanctuary Worship Ministry',
    roomsAllocated: [
      { id: 'rm-1', name: 'Main Worship Sanctuary', building: 'Campus A', capacity: 450 },
      { id: 'rm-2', name: 'Fellowship Hall & Dining', building: 'Campus A', capacity: 200 },
      { id: 'rm-3', name: 'Nursery & Pre-K Suite', building: 'Childcare Wing', capacity: 40 }
    ],
    assetsAllocated: [
      { id: 'as-1', name: 'Allen & Heath dLive Audio Console', category: 'audio_console' },
      { id: 'as-2', name: 'Main Sanctuary 4K Projection System', category: 'projection' },
      { id: 'as-3', name: 'Wireless Handheld Shure Mic Pack (6x)', category: 'audio_console' }
    ],
    setupTimeMinutes: 60,
    teardownTimeMinutes: 45,
    expectedAttendance: 280,
    hasConflict: false,
    status: 'confirmed'
  },
  {
    id: 'evt-bk-2',
    title: 'Midweek Intercessory Prayer & Fasting Service',
    campusId: 'silver-spring-office',
    startDateTime: '2026-11-11 11:00',
    endDateTime: '2026-11-11 14:00',
    organizerName: 'Prayer Intercession Team',
    ministryDepartment: 'Prayer & Spiritual Warfare',
    roomsAllocated: [
      { id: 'rm-4', name: 'Suite 204B Main Prayer Room', building: 'Office Complex', capacity: 60 }
    ],
    assetsAllocated: [
      { id: 'as-4', name: 'Portable PA & Vocal Mic Unit', category: 'audio_console' }
    ],
    setupTimeMinutes: 20,
    teardownTimeMinutes: 20,
    expectedAttendance: 45,
    hasConflict: false,
    status: 'confirmed'
  },
  {
    id: 'evt-bk-3',
    title: 'Young Adults DNA Pod Leadership Rhythms',
    campusId: 'silver-spring-office',
    startDateTime: '2026-11-12 18:30',
    endDateTime: '2026-11-12 21:00',
    organizerName: 'Yafet Fisseha',
    ministryDepartment: 'Upper Room Young Adults',
    roomsAllocated: [
      { id: 'rm-4', name: 'Suite 204B Main Prayer Room', building: 'Office Complex', capacity: 60 }
    ],
    assetsAllocated: [
      { id: 'as-4', name: 'Portable PA & Vocal Mic Unit', category: 'audio_console' }
    ],
    setupTimeMinutes: 15,
    teardownTimeMinutes: 15,
    expectedAttendance: 35,
    hasConflict: false,
    status: 'confirmed'
  }
];

export const INITIAL_SAFETY_CHECKS: SafetyCheck[] = [
  {
    id: 'saf-1',
    memberId: 'mem-101',
    memberName: 'Ruth Fisseha',
    memberEmail: 'ruth.fisseha@eucmaryland.org',
    assignedDepartment: 'Music & Youth Choir',
    roleDescription: 'Worship Leader & Youth Vocal Coach',
    provider: 'MinistrySafe',
    status: 'approved',
    submittedDate: '2025-10-15',
    clearedDate: '2025-10-24',
    expirationDate: '2027-10-24',
    daysUntilExpiration: 352,
    clearanceLevel: 'unrestricted_minors',
    certificateUrl: '#'
  },
  {
    id: 'saf-2',
    memberId: 'mem-102',
    memberName: 'Yafet Fisseha',
    memberEmail: 'yafet.f@eucmaryland.org',
    assignedDepartment: 'Production & Young Adults',
    roleDescription: 'Sound Tech & Small Group Mentor',
    provider: 'MinistrySafe',
    status: 'approved',
    submittedDate: '2025-08-01',
    clearedDate: '2025-08-07',
    expirationDate: '2027-08-07',
    daysUntilExpiration: 274,
    clearanceLevel: 'unrestricted_minors',
    certificateUrl: '#'
  },
  {
    id: 'saf-3',
    memberId: 'mem-107',
    memberName: 'Michael Tesfaye',
    memberEmail: 'm.tesfaye@gmail.com',
    assignedDepartment: 'Children Ministry (1st-4th Grade)',
    roleDescription: 'Lead Sunday Teacher',
    provider: 'MinistrySafe',
    status: 'pending_review',
    submittedDate: '2026-11-02',
    expirationDate: '2026-11-15',
    daysUntilExpiration: 9,
    clearanceLevel: 'supervised_only'
  },
  {
    id: 'saf-4',
    memberId: 'mem-112',
    memberName: 'Abeba Haile',
    memberEmail: 'abeba.haile@gmail.com',
    assignedDepartment: 'Nursery & Toddlers',
    roleDescription: 'Care Volunteer',
    provider: 'ProtectMyMinistry',
    status: 'expired_renewal_needed',
    submittedDate: '2024-10-01',
    clearedDate: '2024-10-10',
    expirationDate: '2026-10-10',
    daysUntilExpiration: -27,
    clearanceLevel: 'restricted'
  }
];

export const INITIAL_COMMUNICATIONS: CommunicationMessage[] = [
  {
    id: 'comm-1',
    channel: 'sms',
    sender: 'Pastoral Care ((240) 716-2246)',
    recipientsCount: 42,
    audienceSegment: 'First-Time Guests (Last 30 Days)',
    body: 'Hi {{first_name}}, thank you for joining Emmanuel United Church of MD! We pray you felt the love of Christ. Join us this Wed for prayer at 11 AM.',
    status: 'sent',
    sentAt: 'Nov 3, 2026 2:15 PM'
  },
  {
    id: 'comm-2',
    channel: 'email',
    sender: 'emmanuelchurch.maryland@gmail.com',
    recipientsCount: 380,
    audienceSegment: 'All Church Family & Active Attendees',
    subject: 'This Sunday: Arise & Build (Neh. 2:20) + Midweek Prayer Schedule',
    body: 'Dear Emmanuel Family, we are anticipating a mighty move of the Holy Spirit this Sunday at 10:30 AM at 12604 New Hampshire Ave...',
    status: 'sent',
    sentAt: 'Nov 5, 2026 10:00 AM'
  }
];

export const INITIAL_WORKFLOWS: WorkflowAutomation[] = [
  {
    id: 'wf-1',
    name: 'First-Time Visitor Welcome & Follow-Up Protocol',
    isActive: true,
    triggerEvent: 'Connect Form Submitted: First-Time Visitor',
    runsCount: 142,
    actions: [
      { id: 'act-1', type: 'delay', summary: 'Wait 2 hours post-service' },
      { id: 'act-2', type: 'send_sms', summary: 'Send automated pastoral greeting from Dr. Bezalem' },
      { id: 'act-3', type: 'add_tag', summary: 'Add tags #NewGuest and #FollowUpRequired' },
      { id: 'act-4', type: 'assign_task', summary: 'Assign contact call task to Hospitality Coordinator' }
    ]
  },
  {
    id: 'wf-2',
    name: 'Children & Minor Safety Certification Expiry Alert',
    isActive: true,
    triggerEvent: 'Background check expiration date <= 30 days',
    runsCount: 28,
    actions: [
      { id: 'act-5', type: 'send_email', summary: 'Send MinistrySafe 1-click renewal link to volunteer' },
      { id: 'act-6', type: 'assign_task', summary: 'Flag safety lead if uncompleted at 10 days before expiry' }
    ]
  }
];
