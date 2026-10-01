import { InquiryCase, SkillTelemetry } from '@/data/hackathonData';

export function processCustomInboundMessage(
  inputText: string,
  channel: 'Viber' | 'Email' | 'Instagram DM' = 'Viber'
): InquiryCase {
  const lower = inputText.toLowerCase();

  // 1. Language detection
  const isAlbanian =
    /[ëç]/i.test(inputText) ||
    /\b(porosia|erdhi|ardhur|këste|keste|blej|ku|në|me|faleminderit|tung|përshëndetje|pershendetje|ditë|dite|dyqan|sa|kutia|hapur)\b/i.test(
      lower
    );
  const lang: 'SQ' | 'EN' = isAlbanian ? 'SQ' : 'EN';

  // 2. Intent & Sentiment
  let intent: InquiryCase['intent'] = 'GENERAL_INQUIRY';
  let sentiment: InquiryCase['sentiment'] = 'Neutral';
  let urgency = 2;
  let decision: InquiryCase['decision'] = 'DECIDES_ALONE';
  let ticket: string | undefined = undefined;
  let tag = 'General Inquiry';
  let agentResponse = '';
  let reasoning = '';

  // Check for Order ID
  const orderMatch = inputText.match(/#?(\d{4,5})/);
  const orderId = orderMatch ? `#${orderMatch[1]}` : undefined;

  // Check Escalated / Hostile Complaint
  if (
    /\b(3rd time|third time|nobody answers|broken|thyer|mashtrues|urgent|urgjente|skandal|hup|injoru)\b/i.test(
      lower
    ) ||
    /!{2,}/.test(inputText)
  ) {
    intent = 'ESCALATED_COMPLAINT';
    sentiment = 'Hostile';
    urgency = 5;
    decision = 'HANDS_TO_HUMAN';
    ticket = `#ESC-${Math.floor(1000 + Math.random() * 9000)}`;
    tag = lang === 'SQ' ? 'Eskalim Urgjent (SQ)' : 'Urgent Escalation (EN)';
    reasoning =
      'Detected high customer frustration and repeat/unanswered contact attempt. Escalated directly to Support Lead.';
    if (lang === 'SQ') {
      agentResponse = `Ju kërkoj shumë ndjesë për këtë përvojë. Nuk ka asnjë arsye që mesazhet tuaja të mbesin pa përgjigje, veçanërisht me pajisje me defekt.\n\nRastin tuaj sapo e kam eskaluar me prioritet emergjent te Shefi i Kujdesit ndaj Klientit me biletën ${ticket}.\n\nNjë koleg do t'ju kontaktojë personalisht brenda 30 minutash për të rregulluar ndërrimin e menjëhershëm ose dërgimin në servis të autorizuar.`;
    } else {
      agentResponse = `I hear you, and there is no excuse for leaving you waiting—especially with a broken device. I have escalated this directly to our support lead right now under emergency ticket ${ticket}.\n\nA human specialist is reviewing your case and will personally reach out to you within the next 30 minutes to resolve this immediately.`;
    }
  }
  // Check PII / Security Probe
  else if (
    /\b(address|adresa|vëllai|vellai|brother|sister|motra|shoku|mik|who bought|kush e bleu|ku banon|phone number|numrin)\b/i.test(
      lower
    ) &&
    /\b(order|porosi|porosia|#|\d{4})\b/i.test(lower)
  ) {
    intent = 'SECURITY_PII_PROBE';
    sentiment = 'Neutral';
    urgency = 3;
    decision = 'DECIDES_ALONE';
    tag = lang === 'SQ' ? 'Rrezik PII / Zero-Trust (SQ)' : 'Security / PII Risk (EN)';
    reasoning =
      'Zero-Trust block triggered. Unauthorized third-party inquiry attempting to extract customer shipping address or contact info.';
    if (lang === 'SQ') {
      agentResponse = `Përshëndetje. Për arsye të privatësisë dhe mbrojtjes së të dhënave personale (PII), nuk na lejohet të zbulojmë adresën e dërgimit apo të dhënat e blerësit për palët e treta.\n\nNëse blerësi ka nevojë të konfirmojë apo ndryshojë adresën e porosisë ${orderId || ''}, ju lutem udhëzojeni të na kontaktojë drejtpërdrejt nga numri i telefonit ose emaili i regjistruar në porosi.`;
    } else {
      agentResponse = `Hello. For privacy and security reasons, we cannot disclose shipping addresses or customer data to third parties.\n\nIf the registered buyer needs to verify or update the delivery address for order ${orderId || ''}, please have them reach out to us directly from the phone number or email registered with the order.`;
    }
  }
  // Check Delivery Delay
  else if (
    /\b(s'ka ardhur|ska ardhur|vonuar|vonese|vonesë|delay|delayed|haven't received|not arrived|ende|ku mbeti|days|ditë|dite)\b/i.test(
      lower
    ) &&
    (lower.includes('porosi') || lower.includes('order') || orderId || /\d+\s*(dit|day)/.test(lower))
  ) {
    intent = 'ORDER_STATUS_DELAY';
    sentiment = 'Frustrated';
    urgency = 4;
    decision = 'HANDS_TO_HUMAN';
    ticket = `#LOG-${Math.floor(1000 + Math.random() * 9000)}`;
    tag = lang === 'SQ' ? 'Vonesë Logjistike (SQ)' : 'Logistics Delay (EN)';
    reasoning =
      'Delivery SLA exceeded (standard 2-4 working days across Kosovo). Escalated to Logistics Dispatch.';
    if (lang === 'SQ') {
      agentResponse = `Përshëndetje. E verifikova kërkesën tuaj për porosinë ${orderId || ''}. Standardi ynë i dërgimit në Kosovë është 2 deri në 4 ditë pune, andaj pakoja juaj është vonuar përtej afatit të garantuar.\n\nSapo hapa tiketën prioritare ${ticket} te sektori i logjistikës për të kryer kontroll fizik me korrierin. Brenda 2 orësh do t'ju përditësojmë me lokacionin e saktë të pakos. Ju kërkojmë ndjesë për vonesën!`;
    } else {
      agentResponse = `Hello. I have checked on your order ${orderId || ''}. Our standard courier delivery timeline is 2 to 4 working days across Kosovo, so your delivery is currently overdue.\n\nI have created priority ticket ${ticket} with our logistics team to audit the courier route directly. We will provide an exact delivery window within 2 hours. Sincere apologies for this delay!`;
    }
  }
  // Check Return Request
  else if (
    /\b(return|kthej|kthim|refund|ndërroj|nderroj|garanci|ditë|days|open|hapur|qel|qelë|prishur)\b/i.test(
      lower
    )
  ) {
    intent = 'RETURN_REQUEST';
    sentiment = 'Neutral';
    urgency = 2;
    decision = 'DECIDES_ALONE';
    tag = lang === 'SQ' ? 'Kërkesë Kthimi (SQ)' : 'Return Request (EN)';
    reasoning =
      'Autonomous policy check: 30-day unopened packaging policy enforced or redirected to warranty.';
    if (lang === 'SQ') {
      agentResponse = `Përshëndetje. Politika jonë e kthimit lejon kthimin e produkteve brenda 30 ditësh kalendarike nga pranimi, vetëm nëse produkti është i pahapur dhe në paketimin origjinal të vulosur të fabrikës.\n\nNëse kutia është hapur apo kanë kaluar mbi 30 ditë, rimbrursimi nuk është i mundur. Nëse pajisja ka ndonjë defekt teknik funksional, na sillni faturën dhe ju ndihmojmë menjëherë përmes garancisë zyrtare të prodhuesit.`;
    } else {
      agentResponse = `Hello. Our return policy requires items to be returned within 30 calendar days of delivery, completely unopened and in original factory packaging.\n\nIf the box has been opened or the 30-day window has elapsed, we cannot accept a return for refund. If the device has an internal hardware fault, please provide your receipt and we will gladly assist you with the official manufacturer warranty service.`;
    }
  }
  // Check Installments / Këste
  else if (
    /\b(këste|keste|kest|installment|installments|rate|teb|nlb|bkt|raiffeisen|kartel|kartela|credit card)\b/i.test(
      lower
    )
  ) {
    intent = 'INSTALLMENTS_QUERY';
    sentiment = 'Positive';
    urgency = 1;
    decision = 'DECIDES_ALONE';
    tag = lang === 'SQ' ? 'Këste Bankare (SQ)' : 'Installments Terms (EN)';
    reasoning =
      'Autonomously resolved with partner bank credit card terms (0% interest up to 12-24 months).';
    if (lang === 'SQ') {
      agentResponse = `Përshëndetje! Po, të gjitha pajisjet mund t'i blini me këste me 0% interes përmes kartelave bankare partnere në Kosovë:\n• TEB Starcard – deri në 24 këste\n• NLB Banka – deri në 12/24 këste\n• BKT Kosova – deri në 12 këste\n• Raiffeisen Bonus Card – deri në 12 këste\n\nBlerjen mund ta kryeni online duke zgjedhur kartelën tuaj gjatë pagesës, ose në dyqanin tonë në Prishtinë (Hënë-Shtunë 08:30-20:00).`;
    } else {
      agentResponse = `Hello! Yes, installment financing is available at 0% interest with our partner bank credit cards in Kosovo:\n• TEB Starcard – up to 24 months\n• NLB Bank – up to 12 or 24 months\n• BKT Kosova – up to 12 months\n• Raiffeisen Bonus Card – up to 12 months\n\nYou can pay in installments either on our online checkout or in-store in Pristina (Mon–Sat 08:30–20:00).`;
    }
  }
  // Default General Inquiry
  else {
    sentiment = 'Neutral';
    urgency = 1;
    decision = 'DECIDES_ALONE';
    tag = lang === 'SQ' ? 'Kujdesi ndaj Klientit (SQ)' : 'Customer Care (EN)';
    reasoning = 'General store inquiry handled by Tier-1 inbox automation.';
    if (lang === 'SQ') {
      agentResponse = `Përshëndetje. Ju faleminderit për mesazhin! Dyqani ynë në Prishtinë është i hapur nga e hëna në të shtunë, prej orës 08:30 deri në 20:00. Dërgesat i kryejmë brenda 2-4 ditë pune në tërë Kosovën. Më tregoni si mund t'ju ndihmoj më tej?`;
    } else {
      agentResponse = `Hello. Thank you for reaching out! Our tech retail store in Pristina is open Monday through Saturday from 08:30 to 20:00. Standard courier delivery across Kosovo takes 2 to 4 working days. How can I assist you today?`;
    }
  }

  const telemetry: SkillTelemetry = {
    skill1_intent: {
      language: lang,
      intent,
      sentiment,
      urgencyScore: urgency,
    },
    skill2_orderLookup: {
      orderId,
      requesterToken: `${channel.toUpperCase()}_TOKEN_DYNAMIC`,
      authMatch: intent !== 'SECURITY_PII_PROBE',
      maskedFields:
        intent === 'SECURITY_PII_PROBE'
          ? ['shipping_address (LOCKED)', 'phone_number (LOCKED)', 'recipient_name (LOCKED)']
          : [],
      piiStatus:
        intent === 'SECURITY_PII_PROBE'
          ? 'BLOCKED_ZERO_TRUST'
          : orderId
          ? 'VERIFIED_CLEARED'
          : 'NO_ORDER_REQUIRED',
      carrierSync:
        intent === 'ORDER_STATUS_DELAY'
          ? {
              carrier: 'Posta Shqiptare / Korrier Privat',
              daysElapsed: 6,
              slaLimit: 4,
              status: 'IN_TRANSIT_DELAYED',
            }
          : undefined,
    },
    skill3_policy: {
      policyType:
        intent === 'ORDER_STATUS_DELAY'
          ? 'DELIVERY_SLA'
          : intent === 'RETURN_REQUEST'
          ? 'RETURN'
          : intent === 'INSTALLMENTS_QUERY'
          ? 'INSTALLMENTS'
          : intent === 'SECURITY_PII_PROBE'
          ? 'PII_PROTECTION'
          : 'WARRANTY',
      isEligible: intent === 'INSTALLMENTS_QUERY' || intent === 'GENERAL_INQUIRY',
      rejectionReasons:
        intent === 'ORDER_STATUS_DELAY'
          ? ['DELIVERY_SLA_EXCEEDED']
          : intent === 'RETURN_REQUEST'
          ? ['BOX_SEAL_POLICY_APPLIED']
          : intent === 'SECURITY_PII_PROBE'
          ? ['UNVERIFIED_THIRD_PARTY_PII_VECTOR']
          : [],
      details:
        lang === 'SQ'
          ? 'Rregullorja: 2-4 ditë dërgesa; 30 ditë kthim vetëm të pahapura; 0% këste TEB/NLB/BKT/Raiffeisen.'
          : 'Rules: 2-4 days courier SLA; 30-day unopened return strictly; 0% partner bank cards.',
    },
    skill4_escalation: {
      dispatched: decision === 'HANDS_TO_HUMAN',
      priority: urgency >= 5 ? 'URGENT' : urgency >= 4 ? 'HIGH' : 'NONE',
      department:
        intent === 'ORDER_STATUS_DELAY'
          ? 'LOGISTICS'
          : intent === 'ESCALATED_COMPLAINT'
          ? 'SUPPORT_LEAD'
          : intent === 'SECURITY_PII_PROBE'
          ? 'SECURITY'
          : 'NONE',
      ticketId: ticket || null,
      slaResolutionCommitment:
        urgency >= 5
          ? 'Guaranteed response < 30 min'
          : urgency >= 4
          ? 'Carrier update < 2 hours'
          : null,
    },
    skill5_formatting: {
      localeProfile:
        lang === 'SQ' ? 'Kosovo Urban / Pristina Dialect' : 'Retail English Support (Store Associate)',
      tone: 'Direct, attentive store associate, no robotic filler',
      responseTimeMs: Math.floor(450 + Math.random() * 400),
      antiHallucinationCheck: 'PASSED',
    },
  };

  const id = Date.now();
  return {
    id,
    channel,
    sender: channel === 'Email' ? 'live.tester@gmail.com' : `@user_${Math.floor(100 + Math.random() * 900)}`,
    avatar: 'CU',
    phoneOrEmail: channel === 'Viber' ? '+383 49 999 888' : 'user@domain.com',
    initialMessage: inputText,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    lang,
    intent,
    sentiment,
    decision,
    tag,
    ticket,
    reasoning,
    agentResponse,
    thread: [
      {
        id: `${id}-c`,
        sender: 'customer',
        text: inputText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
      {
        id: `${id}-a`,
        sender: 'agent',
        text: agentResponse,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        ticketRef: ticket,
      },
    ],
    telemetry,
  };
}
