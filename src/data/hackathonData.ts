export interface SkillTelemetry {
  skill1_intent: {
    language: 'SQ' | 'EN';
    intent: 'ORDER_STATUS_DELAY' | 'RETURN_REQUEST' | 'ESCALATED_COMPLAINT' | 'SECURITY_PII_PROBE' | 'INSTALLMENTS_QUERY' | 'GENERAL_INQUIRY';
    sentiment: 'Positive' | 'Neutral' | 'Frustrated' | 'Hostile';
    urgencyScore: number; // 1-5
  };
  skill2_orderLookup: {
    orderId?: string;
    requesterToken: string;
    authMatch: boolean;
    maskedFields: string[];
    piiStatus: 'VERIFIED_CLEARED' | 'BLOCKED_ZERO_TRUST' | 'NO_ORDER_REQUIRED';
    carrierSync?: {
      carrier: string;
      daysElapsed: number;
      slaLimit: number;
      status: string;
    };
  };
  skill3_policy: {
    policyType: 'DELIVERY_SLA' | 'RETURN' | 'WARRANTY' | 'INSTALLMENTS' | 'PII_PROTECTION';
    isEligible: boolean;
    rejectionReasons: string[];
    details: string;
  };
  skill4_escalation: {
    dispatched: boolean;
    priority: 'URGENT' | 'HIGH' | 'MEDIUM' | 'NONE';
    department: 'SUPPORT_LEAD' | 'LOGISTICS' | 'SECURITY' | 'NONE';
    ticketId: string | null;
    slaResolutionCommitment: string | null;
  };
  skill5_formatting: {
    localeProfile: string;
    tone: string;
    responseTimeMs: number;
    antiHallucinationCheck: 'PASSED' | 'FLAGGED';
  };
}

export interface ConversationMessage {
  id: string;
  sender: 'customer' | 'agent' | 'system';
  text: string;
  timestamp: string;
  ticketRef?: string;
}

export interface InquiryCase {
  id: number;
  channel: 'Viber' | 'Email' | 'Instagram DM';
  sender: string;
  avatar: string;
  phoneOrEmail: string;
  initialMessage: string;
  timestamp: string;
  lang: 'SQ' | 'EN';
  intent: 'ORDER_STATUS_DELAY' | 'RETURN_REQUEST' | 'ESCALATED_COMPLAINT' | 'SECURITY_PII_PROBE' | 'INSTALLMENTS_QUERY' | 'GENERAL_INQUIRY';
  sentiment: 'Positive' | 'Neutral' | 'Frustrated' | 'Hostile';
  decision: 'HANDS_TO_HUMAN' | 'DECIDES_ALONE';
  tag: string;
  ticket?: string;
  reasoning: string;
  agentResponse: string;
  thread: ConversationMessage[];
  telemetry: SkillTelemetry;
}

export const INITIAL_HACKATHON_CASES: InquiryCase[] = [
  {
    id: 1,
    channel: 'Viber',
    sender: 'Bleron Gashi',
    avatar: 'BG',
    phoneOrEmail: '+383 49 123 456',
    initialMessage: "Porosia #1048 ende s'ka ardhur. Kanë kaluar 6 ditë.",
    timestamp: '14:48',
    lang: 'SQ',
    intent: 'ORDER_STATUS_DELAY',
    sentiment: 'Frustrated',
    decision: 'HANDS_TO_HUMAN',
    tag: 'Logistics Delay (SQ)',
    ticket: '#LOG-1048',
    reasoning: 'Delivery SLA exceeded (6 days vs 2-4 standard). Escalated to Logistics.',
    agentResponse:
      "Përshëndetje. E verifikova porosinë tuaj #1048. Afati ynë standard i dërgimit është 2 deri në 4 ditë pune, andaj dërgesa është vonuar përtej normales.\n\nHapa menjëherë një tiketë prioritare (#LOG-1048) për ekipin tonë të logjistikës që të kontaktojë korrierin. Brenda 2 orësh do t'ju njoftojmë me SMS për terminin e saktë të dorëzimit. Ju kërkojmë shumë falje për vonesën!",
    thread: [
      {
        id: '1-c',
        sender: 'customer',
        text: "Porosia #1048 ende s'ka ardhur. Kanë kaluar 6 ditë.",
        timestamp: '14:48',
      },
      {
        id: '1-a',
        sender: 'agent',
        text: "Përshëndetje. E verifikova porosinë tuaj #1048. Afati ynë standard i dërgimit është 2 deri në 4 ditë pune, andaj dërgesa është vonuar përtej normales.\n\nHapa menjëherë një tiketë prioritare (#LOG-1048) për ekipin tonë të logjistikës që të kontaktojë korrierin. Brenda 2 orësh do t'ju njoftojmë me SMS për terminin e saktë të dorëzimit. Ju kërkojmë shumë falje për vonesën!",
        timestamp: '14:48',
        ticketRef: '#LOG-1048',
      },
    ],
    telemetry: {
      skill1_intent: {
        language: 'SQ',
        intent: 'ORDER_STATUS_DELAY',
        sentiment: 'Frustrated',
        urgencyScore: 4,
      },
      skill2_orderLookup: {
        orderId: '#1048',
        requesterToken: 'VIBER_PHONE_AUTH_HASH_049',
        authMatch: true,
        maskedFields: [],
        piiStatus: 'VERIFIED_CLEARED',
        carrierSync: {
          carrier: 'Posta Shqiptare / Korrier Privat',
          daysElapsed: 6,
          slaLimit: 4,
          status: 'IN_TRANSIT_DELAYED',
        },
      },
      skill3_policy: {
        policyType: 'DELIVERY_SLA',
        isEligible: false,
        rejectionReasons: ['SLA_EXCEEDED (6 days > 4 days max standard)'],
        details: 'Store SLA is strictly 2 to 4 working days throughout Kosovo.',
      },
      skill4_escalation: {
        dispatched: true,
        priority: 'HIGH',
        department: 'LOGISTICS',
        ticketId: '#LOG-1048',
        slaResolutionCommitment: 'Direct carrier audit & customer SMS within 2 hours',
      },
      skill5_formatting: {
        localeProfile: 'Pristina Urban / Standard Albanian (SQ-XK)',
        tone: 'Responsible, direct associate, zero corporate deflection',
        responseTimeMs: 820,
        antiHallucinationCheck: 'PASSED',
      },
    },
  },
  {
    id: 2,
    channel: 'Email',
    sender: 'sarah.m@gmail.com',
    avatar: 'SM',
    phoneOrEmail: 'sarah.m@gmail.com',
    initialMessage: 'Can I return headphones after 45 days? Box is open.',
    timestamp: '14:32',
    lang: 'EN',
    intent: 'RETURN_REQUEST',
    sentiment: 'Neutral',
    decision: 'DECIDES_ALONE',
    tag: 'Return Denied (EN)',
    reasoning: 'Violates 30-day window and unopened packaging rule. Autonomously declined.',
    agentResponse:
      'Hi there. Unfortunately, we cannot accept this return.\n\nOur policy strictly requires returns within 30 days of delivery, and items must be in their original, unopened packaging. Because it has been 45 days and the seal has been opened, our system cannot issue a refund. If the unit suffers from an internal hardware fault, please share your receipt and we will guide you through the official manufacturer warranty service.',
    thread: [
      {
        id: '2-c',
        sender: 'customer',
        text: 'Can I return headphones after 45 days? Box is open.',
        timestamp: '14:32',
      },
      {
        id: '2-a',
        sender: 'agent',
        text: 'Hi there. Unfortunately, we cannot accept this return.\n\nOur policy strictly requires returns within 30 days of delivery, and items must be in their original, unopened packaging. Because it has been 45 days and the seal has been opened, our system cannot issue a refund. If the unit suffers from an internal hardware fault, please share your receipt and we will guide you through the official manufacturer warranty service.',
        timestamp: '14:32',
      },
    ],
    telemetry: {
      skill1_intent: {
        language: 'EN',
        intent: 'RETURN_REQUEST',
        sentiment: 'Neutral',
        urgencyScore: 2,
      },
      skill2_orderLookup: {
        requesterToken: 'EMAIL_SESSION_VERIFIED',
        authMatch: true,
        maskedFields: [],
        piiStatus: 'NO_ORDER_REQUIRED',
      },
      skill3_policy: {
        policyType: 'RETURN',
        isEligible: false,
        rejectionReasons: [
          'WINDOW_EXCEEDED (45 days > 30 calendar days limit)',
          'BOX_SEAL_BROKEN (is_box_opened: true)',
        ],
        details: 'Returns accepted strictly within 30 days unopened in original factory wrap.',
      },
      skill4_escalation: {
        dispatched: false,
        priority: 'NONE',
        department: 'NONE',
        ticketId: null,
        slaResolutionCommitment: null,
      },
      skill5_formatting: {
        localeProfile: 'Standard English Retail Support',
        tone: 'Courteous store associate, firm policy enforcement, warranty alternative offered',
        responseTimeMs: 640,
        antiHallucinationCheck: 'PASSED',
      },
    },
  },
  {
    id: 3,
    channel: 'Instagram DM',
    sender: '@valon_tech',
    avatar: 'VT',
    phoneOrEmail: 'Instagram: @valon_tech',
    initialMessage: '3rd time writing! Laptop broken, NOBODY answers!!',
    timestamp: '14:15',
    lang: 'EN',
    intent: 'ESCALATED_COMPLAINT',
    sentiment: 'Hostile',
    decision: 'HANDS_TO_HUMAN',
    tag: 'Urgent Escalation (EN)',
    ticket: '#ESC-9921',
    reasoning: 'High churn risk & repeated unanswered attempts. Direct escalation to Lead.',
    agentResponse:
      'I hear you, and there is no excuse for leaving you waiting—especially with a broken laptop. I have escalated this directly to our support lead right now under emergency ticket #ESC-9921.\n\nA human specialist is reviewing your prior messages and will personally call or reply here within the next 30 minutes to arrange an immediate warranty replacement or repair inspection.',
    thread: [
      {
        id: '3-c',
        sender: 'customer',
        text: '3rd time writing! Laptop broken, NOBODY answers!!',
        timestamp: '14:15',
      },
      {
        id: '3-a',
        sender: 'agent',
        text: 'I hear you, and there is no excuse for leaving you waiting—especially with a broken laptop. I have escalated this directly to our support lead right now under emergency ticket #ESC-9921.\n\nA human specialist is reviewing your prior messages and will personally call or reply here within the next 30 minutes to arrange an immediate warranty replacement or repair inspection.',
        timestamp: '14:15',
        ticketRef: '#ESC-9921',
      },
    ],
    telemetry: {
      skill1_intent: {
        language: 'EN',
        intent: 'ESCALATED_COMPLAINT',
        sentiment: 'Hostile',
        urgencyScore: 5,
      },
      skill2_orderLookup: {
        requesterToken: 'IG_HANDLE_VALON_TECH',
        authMatch: true,
        maskedFields: [],
        piiStatus: 'VERIFIED_CLEARED',
      },
      skill3_policy: {
        policyType: 'WARRANTY',
        isEligible: true,
        rejectionReasons: [],
        details: 'DOA / Hardware defect under 24-month manufacturer warranty.',
      },
      skill4_escalation: {
        dispatched: true,
        priority: 'URGENT',
        department: 'SUPPORT_LEAD',
        ticketId: '#ESC-9921',
        slaResolutionCommitment: 'Dedicated human callback/reply guaranteed < 30 minutes',
      },
      skill5_formatting: {
        localeProfile: 'Empathetic Crisis Resolution (EN)',
        tone: 'Immediate ownership, sincere apology, zero boilerplate deflection',
        responseTimeMs: 510,
        antiHallucinationCheck: 'PASSED',
      },
    },
  },
  {
    id: 4,
    channel: 'Instagram DM',
    sender: '@krasniqi_fam',
    avatar: 'KF',
    phoneOrEmail: 'Instagram: @krasniqi_fam',
    initialMessage: "Arben's brother here. What's the address on order #1031?",
    timestamp: '13:50',
    lang: 'EN',
    intent: 'SECURITY_PII_PROBE',
    sentiment: 'Neutral',
    decision: 'DECIDES_ALONE',
    tag: 'Security / PII Risk (EN)',
    reasoning: 'Zero-Trust block triggered. Third-party requester attempting PII extraction.',
    agentResponse:
      'Hello. For privacy and security reasons, we cannot disclose shipping addresses or customer data to third parties.\n\nIf Arben needs to verify or update the delivery address on order #1031, please have him reach out to us directly from the phone number or email registered with the order.',
    thread: [
      {
        id: '4-c',
        sender: 'customer',
        text: "Arben's brother here. What's the address on order #1031?",
        timestamp: '13:50',
      },
      {
        id: '4-a',
        sender: 'agent',
        text: 'Hello. For privacy and security reasons, we cannot disclose shipping addresses or customer data to third parties.\n\nIf Arben needs to verify or update the delivery address on order #1031, please have him reach out to us directly from the phone number or email registered with the order.',
        timestamp: '13:50',
      },
    ],
    telemetry: {
      skill1_intent: {
        language: 'EN',
        intent: 'SECURITY_PII_PROBE',
        sentiment: 'Neutral',
        urgencyScore: 3,
      },
      skill2_orderLookup: {
        orderId: '#1031',
        requesterToken: 'IG_HANDLE_THIRD_PARTY_CLAIM',
        authMatch: false,
        maskedFields: [
          'shipping_address (REDACTED)',
          'phone_number (REDACTED)',
          'recipient_full_name (REDACTED)',
          'total_invoice_eur (REDACTED)',
        ],
        piiStatus: 'BLOCKED_ZERO_TRUST',
      },
      skill3_policy: {
        policyType: 'PII_PROTECTION',
        isEligible: false,
        rejectionReasons: [
          'UNVERIFIED_THIRD_PARTY_ATTEMPT',
          'CLAIMED_RELATION_NOT_CREDENTIAL ("brother")',
          'ZERO_TRUST_VECTOR_FLAGGED',
        ],
        details: 'PII disclosure strictly prohibited unless authorized credential matches order record.',
      },
      skill4_escalation: {
        dispatched: false,
        priority: 'NONE',
        department: 'SECURITY',
        ticketId: null,
        slaResolutionCommitment: 'Audit log security event #SEC-AUTH-1031 recorded',
      },
      skill5_formatting: {
        localeProfile: 'Direct Security Compliance (EN)',
        tone: 'Calm, assertive, unyielding on PII safety, helpful guidance to genuine buyer',
        responseTimeMs: 710,
        antiHallucinationCheck: 'PASSED',
      },
    },
  },
  {
    id: 5,
    channel: 'Viber',
    sender: 'Egzona Krasniqi',
    avatar: 'EK',
    phoneOrEmail: '+383 44 987 654',
    initialMessage: 'A mund ta blej laptopin me këste?',
    timestamp: '13:12',
    lang: 'SQ',
    intent: 'INSTALLMENTS_QUERY',
    sentiment: 'Positive',
    decision: 'DECIDES_ALONE',
    tag: 'Pre-sales / Këste (SQ)',
    reasoning: 'Standard financing policy. Autonomously resolved with bank terms.',
    agentResponse:
      'Përshëndetje! Po, mund ta blini me këste.\n\nOfrojmë pagesa me këste përmes kartelave kreditore të bankave partnere në Kosovë (TEB Starcard, NLB, BKT, dhe Raiffeisen Bonus Card), deri në 12 ose 24 muaj me 0% interes. Blerjen mund ta bëni direkt në dyqanin tonë në Prishtinë ose online duke zgjedhur kartelën tuaj te mënyra e pagesës.',
    thread: [
      {
        id: '5-c',
        sender: 'customer',
        text: 'A mund ta blej laptopin me këste?',
        timestamp: '13:12',
      },
      {
        id: '5-a',
        sender: 'agent',
        text: 'Përshëndetje! Po, mund ta blini me këste.\n\nOfrojmë pagesa me këste përmes kartelave kreditore të bankave partnere në Kosovë (TEB Starcard, NLB, BKT, dhe Raiffeisen Bonus Card), deri në 12 ose 24 muaj me 0% interes. Blerjen mund ta bëni direkt në dyqanin tonë në Prishtinë ose online duke zgjedhur kartelën tuaj te mënyra e pagesës.',
        timestamp: '13:12',
      },
    ],
    telemetry: {
      skill1_intent: {
        language: 'SQ',
        intent: 'INSTALLMENTS_QUERY',
        sentiment: 'Positive',
        urgencyScore: 1,
      },
      skill2_orderLookup: {
        requesterToken: 'VIBER_PUBLIC_INQUIRY',
        authMatch: true,
        maskedFields: [],
        piiStatus: 'NO_ORDER_REQUIRED',
      },
      skill3_policy: {
        policyType: 'INSTALLMENTS',
        isEligible: true,
        rejectionReasons: [],
        details: 'TEB Starcard (up to 24x 0%), NLB (12/24x 0%), BKT (12x 0%), Raiffeisen Bonus (12x 0%).',
      },
      skill4_escalation: {
        dispatched: false,
        priority: 'NONE',
        department: 'NONE',
        ticketId: null,
        slaResolutionCommitment: null,
      },
      skill5_formatting: {
        localeProfile: 'Pristina Retail Commercial (SQ-XK)',
        tone: 'Warm, commercial, helpful associate highlighting retail store & web options',
        responseTimeMs: 690,
        antiHallucinationCheck: 'PASSED',
      },
    },
  },
];

export const KPI_METRICS = {
  messagesHandledDaily: '250 / day',
  autonomousResolutionRate: '76.4%',
  weeklyHoursSaved: '98.4 hrs',
  hoursSavedFormula: '250 msg/day × 7 days × 4.5 min/msg × 75% automation = 98.4 hrs/week',
  avgResponseSla: '< 1.2s',
  partnerBanks: ['TEB Starcard', 'NLB Banka', 'BKT Kosova', 'Raiffeisen Bank'],
  storeHours: 'Mon–Sat: 08:30 – 20:00 (Pristina, Rr. Nëna Terezë)',
};
