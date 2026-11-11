/**
 * Emmanuel United Church of Maryland (EUC ChMS)
 * Enterprise Church Management System - Core Data Models & Contracts
 */

export type UserRole =
  | 'super_admin'
  | 'senior_pastor'
  | 'executive_director'
  | 'finance_lead'
  | 'worship_director'
  | 'youth_director'
  | 'children_director'
  | 'volunteer_lead';

export interface Campus {
  id: string;
  name: string;
  address: string;
  isMainCampus: boolean;
  timezone: string;
}

export type HouseholdRole = 'head' | 'spouse' | 'child' | 'dependent' | 'other';
export type MembershipStatus = 'first_time_guest' | 'regular_attendee' | 'member' | 'leader' | 'staff' | 'inactive';
export type SpiritualMilestone = 'none' | 'saved' | 'water_baptized' | 'foundations_grad' | 'serving' | 'ready_to_lead' | 'leading' | 'pod_leader';

export interface FamilyMemberReference {
  memberId: string;
  fullName: string;
  role: HouseholdRole;
  relationship: string;
  avatarUrl?: string;
}

export interface ActivityLogItem {
  id: string;
  timestamp: string;
  type: 'attendance' | 'giving' | 'group' | 'background_check' | 'note' | 'sms' | 'email';
  title: string;
  description: string;
  actor: string;
}

export interface Member {
  id: string;
  campusId: string;
  avatarUrl: string;
  fullName: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  householdId: string;
  householdName: string;
  householdRole: HouseholdRole;
  membershipStatus: MembershipStatus;
  spiritualMilestone: SpiritualMilestone;
  tags: string[];
  lastAttendance: string;
  firstVisitDate: string;
  birthday?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  familyMembers: FamilyMemberReference[];
  activityTimeline: ActivityLogItem[];
  safetyClearanceStatus: 'not_required' | 'pending' | 'approved' | 'expired';
  notes?: string;
}

// ----------------------------------------------------
// Service Planning & Worship Engine
// ----------------------------------------------------
export type ServiceLiturgyType =
  | 'prelude'
  | 'call_to_worship'
  | 'music_set'
  | 'scripture_reading'
  | 'announcements'
  | 'offering'
  | 'pastoral_prayer'
  | 'sermon'
  | 'communion'
  | 'altar_call'
  | 'benediction';

export interface ServiceAttachment {
  id: string;
  name: string;
  type: 'chord_chart' | 'sheet_music' | 'slide_deck' | 'audio_stem' | 'run_sheet_pdf';
  url: string;
  size: string;
}

export interface ServiceLiturgyItem {
  id: string;
  order: number;
  type: ServiceLiturgyType;
  title: string;
  durationMinutes: number;
  itemLead: string;
  avCues: string;
  lightingPreset: string;
  songKey?: string;
  bpm?: number;
  attachments: ServiceAttachment[];
  notes?: string;
}

export type VolunteerRosterStatus = 'accepted' | 'pending' | 'declined';

export interface VolunteerAssignment {
  id: string;
  roleTitle: string; // e.g. "Front of House Sound", "Worship Vocalist", "Greeter 1", "Nursery Check-in"
  department: 'worship' | 'production' | 'hospitality' | 'kids' | 'security';
  assignedMemberId: string;
  assignedMemberName: string;
  avatarUrl?: string;
  status: VolunteerRosterStatus;
  confirmedAt?: string;
  notes?: string;
}

export interface ServicePlan {
  id: string;
  campusId: string;
  serviceDate: string;
  serviceTitle: string;
  serviceTimes: string[]; // e.g. ['9:00 AM', '11:15 AM']
  theme: string;
  sermonSpeaker: string;
  sermonTitle: string;
  scriptureReference: string;
  runOfService: ServiceLiturgyItem[];
  volunteerRoster: VolunteerAssignment[];
  status: 'draft' | 'published' | 'in_progress' | 'completed';
}

// ----------------------------------------------------
// Giving & Financial Intelligence
// ----------------------------------------------------
export type GivingFundType =
  | 'tithe_general'
  | 'building_project'
  | 'global_missions'
  | 'youth_benevolence'
  | 'emergency_relief';

export type PaymentMethodType = 'card' | 'ach' | 'zelle' | 'text2give' | 'cash_check';
export type TransactionStatus = 'settled' | 'pending' | 'refunded' | 'failed';

export interface Transaction {
  id: string;
  donorId: string;
  donorName: string;
  donorEmail: string;
  campusId: string;
  amount: number;
  fund: GivingFundType;
  fundLabel: string;
  paymentMethod: PaymentMethodType;
  gateway: 'tithely' | 'stripe' | 'zelle' | 'manual';
  status: TransactionStatus;
  isRecurring: boolean;
  frequency?: 'weekly' | 'bi_weekly' | 'monthly';
  timestamp: string;
  receiptNumber: string;
}

export interface GivingFinancialMetrics {
  yearToDateTotal: number;
  thisWeekGross: number;
  weeklyBudgetGoal: number;
  budgetPacingPercentage: number;
  averageGiftSize: number;
  recurringDonationPercentage: number;
  donorRetentionRate: number;
  fundBreakdown: {
    fund: GivingFundType;
    label: string;
    amount: number;
    colorHex: string;
  }[];
  monthlyVolumeTrend: {
    month: string;
    actual: number;
    budgetGoal: number;
  }[];
}

// ----------------------------------------------------
// Calendar, Room & Resource Scheduling
// ----------------------------------------------------
export interface FacilityRoom {
  id: string;
  name: string;
  building: string;
  capacity: number;
}

export interface FacilityAsset {
  id: string;
  name: string;
  category: 'audio_console' | 'projection' | 'lighting' | 'instruments' | 'hospitality_cart' | 'bus';
}

export interface EventBooking {
  id: string;
  title: string;
  campusId: string;
  startDateTime: string;
  endDateTime: string;
  organizerName: string;
  ministryDepartment: string;
  roomsAllocated: FacilityRoom[];
  assetsAllocated: FacilityAsset[];
  setupTimeMinutes: number;
  teardownTimeMinutes: number;
  expectedAttendance: number;
  hasConflict: boolean;
  conflictDetails?: string;
  status: 'pending_approval' | 'confirmed' | 'cancelled';
}

// ----------------------------------------------------
// Church Safety & Compliance
// ----------------------------------------------------
export type BackgroundCheckStatus = 'not_started' | 'pending_review' | 'approved' | 'expired_renewal_needed';

export interface SafetyCheck {
  id: string;
  memberId: string;
  memberName: string;
  memberEmail: string;
  assignedDepartment: string;
  roleDescription: string;
  provider: 'MinistrySafe' | 'Sterling' | 'ProtectMyMinistry';
  status: BackgroundCheckStatus;
  submittedDate: string;
  clearedDate?: string;
  expirationDate: string;
  daysUntilExpiration: number;
  clearanceLevel: 'unrestricted_minors' | 'supervised_only' | 'restricted';
  certificateUrl?: string;
}

// ----------------------------------------------------
// Smart Communications & Workflows
// ----------------------------------------------------
export interface CommunicationMessage {
  id: string;
  channel: 'email' | 'sms';
  sender: string;
  recipientsCount: number;
  audienceSegment: string;
  subject?: string;
  body: string;
  status: 'draft' | 'scheduled' | 'sent';
  sentAt?: string;
}

export interface WorkflowAutomation {
  id: string;
  name: string;
  isActive: boolean;
  triggerEvent: string; // e.g., "Form submitted: First-Time Visitor"
  actions: {
    id: string;
    type: 'delay' | 'send_sms' | 'send_email' | 'add_tag' | 'assign_task';
    summary: string;
  }[];
  runsCount: number;
}
