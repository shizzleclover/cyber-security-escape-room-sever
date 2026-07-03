/**
 * Phishing Room Email Data
 * 10 emails in progressive difficulty order.
 * Mix of phishing (6) and legitimate (4) emails.
 * Each has a lesson and externalLink for deep explanation.
 */
const phishingEmails = [
  {
    id: 1,
    type: 'phishing',
    difficulty: 'easy',
    senderName: 'Securty Team',
    senderEmail: 'security-alert@acc0unt-verify.com',
    subject: 'URGENT: Your Account Has Been Compromised!!!',
    timestamp: '10:23 AM',
    body: `Dear Valued Customer,

We have detected suspicous activity on your account. Your account will be permanantly locked within 24 hours unless you verify your identity immediatly.

Click the link below to secure your account:
[Verify My Account Now](http://acc0unt-verify.com/secure-login)

Failure to act will result in permanent account suspension.

Regards,
The Securty Team`,
    links: [
      { text: 'Verify My Account Now', actualUrl: 'http://acc0unt-verify.com/secure-login' },
    ],
    redFlags: [
      'Misspelled sender name ("Securty" instead of "Security")',
      'Suspicious email domain (acc0unt-verify.com with a zero)',
      'Multiple spelling errors in the body (suspicous, permanantly, immediatly)',
      'Creates extreme urgency ("24 hours")',
      'Generic greeting ("Dear Valued Customer")',
      'Threatening language about account suspension',
    ],
    hint: 'Look carefully at the sender\'s email address. Does the domain look like it belongs to a real company?',
    lesson: 'Phishing emails often rely on spelling mistakes and urgency. Legitimate companies will never threaten you with immediate account suspension.',
    externalLink: { text: 'NCSC: Spotting Phishing Emails', url: 'https://www.ncsc.gov.uk/collection/phishing-scams' }
  },
  {
    id: 2,
    type: 'legitimate',
    difficulty: 'easy',
    senderName: 'Netflix',
    senderEmail: 'info@mailer.netflix.com',
    subject: 'New on Netflix this week: shows we think you\'ll love',
    timestamp: '2:15 PM',
    body: `Hi there,

Here's what's new on Netflix this week that we think you'll enjoy based on your viewing history:

• The Night Agent: Season 3
• A new documentary about ocean conservation
• Comedy specials from your favourite comedians

Happy watching!

The Netflix Team

To manage your email preferences, visit your account settings.
Unsubscribe from marketing emails.`,
    links: [
      { text: 'account settings', actualUrl: 'https://www.netflix.com/account' },
      { text: 'Unsubscribe', actualUrl: 'https://www.netflix.com/email-preferences' },
    ],
    redFlags: [],
    legitimateIndicators: [
      'Sender email uses official Netflix subdomain (mailer.netflix.com)',
      'No urgency or threats',
      'Personalised content based on viewing history',
      'Links point to genuine netflix.com domain',
      'Includes unsubscribe option (required by law for marketing emails)',
      'No request for personal information',
    ],
    hint: 'Check where the links actually lead. Do they go to a real Netflix address?',
    lesson: 'Legitimate marketing emails usually come from a subdomain (like mailer.netflix.com) and do not contain urgent threats.',
    externalLink: { text: 'How to verify email senders', url: 'https://www.actionfraud.police.uk/a-z-of-fraud/phishing' }
  },
  {
    id: 3,
    type: 'phishing',
    difficulty: 'medium',
    senderName: 'Royal Mail Delivery',
    senderEmail: 'delivery-notification@royalmail-tracking.co',
    subject: 'Your parcel could not be delivered - action required',
    timestamp: '9:41 AM',
    body: `Hello,

We attempted to deliver your parcel today but no one was available to sign for it.

To reschedule your delivery, please confirm your address and pay the redelivery fee of £1.99:

[Reschedule My Delivery](http://royalmail-tracking.co/redelivery?id=RM29485721)

Your parcel will be returned to sender if not rescheduled within 48 hours.

Royal Mail Customer Service
Tracking Reference: RM29485721GB`,
    links: [
      { text: 'Reschedule My Delivery', actualUrl: 'http://royalmail-tracking.co/redelivery?id=RM29485721' },
    ],
    redFlags: [
      'Domain is "royalmail-tracking.co" not the real "royalmail.com"',
      'Asks for payment (Royal Mail does not charge redelivery fees)',
      'Creates urgency ("48 hours" or returned)',
      'No specific parcel details or your actual name',
      'Uses HTTP not HTTPS',
    ],
    hint: 'Royal Mail\'s real website is royalmail.com. Look at the domain in the sender\'s email address carefully.',
    lesson: 'Scammers often impersonate delivery services because many people are expecting packages. Royal Mail will never ask you for a fee in an email.',
    externalLink: { text: 'Royal Mail: Typical Scams', url: 'https://www.royalmail.com/help/scam-examples' }
  },
  {
    id: 4,
    type: 'legitimate',
    difficulty: 'medium',
    senderName: 'Tesco Clubcard',
    senderEmail: 'clubcard@email.tesco.com',
    subject: 'Your monthly Clubcard statement is ready',
    timestamp: '8:00 AM',
    body: `Hi Margaret,

Your Clubcard statement for May is now available.

This month you earned:
• 142 points from in-store shopping
• 28 points from Tesco online

Your total balance: 3,847 points (worth £38.47 in vouchers)

Your vouchers expire on 30 November 2026. You can spend them in store or exchange them for Reward Partner vouchers worth up to 3x more.

View your full statement in the Tesco app or at tesco.com/clubcard.

Thanks for shopping with us,
Tesco Clubcard Team`,
    links: [
      { text: 'tesco.com/clubcard', actualUrl: 'https://www.tesco.com/clubcard' },
    ],
    redFlags: [],
    legitimateIndicators: [
      'Sender uses official Tesco subdomain (email.tesco.com)',
      'Addresses you by name',
      'Contains specific account details only Tesco would know',
      'No urgency or pressure to click immediately',
      'Links go to genuine tesco.com',
      'Does not ask for any personal information or payment',
    ],
    hint: 'Look at the specific details in this email. Would a scammer know your exact Clubcard points balance?',
    lesson: 'Personalization is key. Legitimate businesses will often use information that only they know about your account history.',
    externalLink: { text: 'Report a Scam to ActionFraud', url: 'https://www.actionfraud.police.uk/reporting-fraud-and-cyber-crime' }
  },
  {
    id: 5,
    type: 'phishing',
    difficulty: 'medium',
    senderName: 'Apple ID Support',
    senderEmail: 'noreply@id-apple-support.com',
    subject: 'Your Apple ID was used to sign in on a new device',
    timestamp: '11:52 PM',
    body: `Dear Customer,

Your Apple ID (m****@gmail.com) was used to sign in to iCloud on a new device:

Device: iPhone 15 Pro
Location: Lagos, Nigeria
Time: 23:47 GMT

If this wasn't you, your account may be compromised. Secure your account immediately:

[Review Account Activity](http://id-apple-support.com/verify)

If you did sign in on this device, you can ignore this email.

Apple Support`,
    links: [
      { text: 'Review Account Activity', actualUrl: 'http://id-apple-support.com/verify' },
    ],
    redFlags: [
      'Domain is "id-apple-support.com" not Apple\'s real "apple.com"',
      'Sent at unusual time (11:52 PM) to create panic',
      'Foreign location designed to alarm you',
      'Partially masked email creates false sense of legitimacy',
      'Uses HTTP not HTTPS',
      'Apple\'s real alerts come from appleid@id.apple.com',
    ],
    hint: 'Apple\'s real emails always come from addresses ending in @apple.com or @id.apple.com. Check the sender\'s domain.',
    lesson: 'Scammers use frightening locations to induce panic, forcing you to click out of fear before examining the domain.',
    externalLink: { text: 'Recognize Apple Phishing', url: 'https://support.apple.com/en-us/HT204759' }
  },
  {
    id: 6,
    type: 'phishing',
    difficulty: 'hard',
    senderName: 'HR Department',
    senderEmail: 'hr@yourcompany-portal.com',
    subject: 'Action Required: Updated Employee Handbook Acknowledgement',
    timestamp: '9:15 AM',
    body: `Team,

Please review and acknowledge the updated Employee Code of Conduct and Leave Policy by 5:00 PM today. Failure to acknowledge will result in temporary suspension of system access.

[View Document (PDF)](http://yourcompany-portal.com/auth/login)

Thank you,
Human Resources`,
    links: [
      { text: 'View Document (PDF)', actualUrl: 'http://yourcompany-portal.com/auth/login' },
    ],
    redFlags: [
      'Domain is "yourcompany-portal.com", not your actual company domain',
      'Generic greeting ("Team")',
      'Aggressive deadline ("by 5:00 PM today")',
      'The link says PDF but points to a login portal (credential harvesting)',
    ],
    hint: 'Does your HR normally threaten suspension over an email handbook? Where does that link actually go?',
    lesson: 'Spear phishing targets employees using internal jargon (HR, handbooks) to harvest login credentials.',
    externalLink: { text: 'NCSC: Mitigating Phishing in the Workplace', url: 'https://www.ncsc.gov.uk/guidance/phishing' }
  },
  {
    id: 7,
    type: 'legitimate',
    difficulty: 'hard',
    senderName: 'AIB',
    senderEmail: 'alerts@aib.ie',
    subject: 'Important: Changes to our terms and conditions',
    timestamp: '3:30 PM',
    body: `Dear Customer,

We're writing to let you know about upcoming changes to our terms and conditions that will take effect from 1 August 2026.

Key changes include:
• Updated data protection policies in line with new EU regulations
• Changes to our overdraft fee structure
• Updated terms for contactless payment limits

You don't need to do anything right now. The full updated terms will be available on aib.ie/terms from 15 July 2026.

If you have any questions, you can:
• Visit any AIB branch
• Call us on 0818 724 724
• Message us through the AIB app

Kind regards,
AIB Customer Communications

This is an automated message. Please do not reply to this email.`,
    links: [
      { text: 'aib.ie/terms', actualUrl: 'https://www.aib.ie/terms' },
    ],
    redFlags: [],
    legitimateIndicators: [
      'Sender uses official AIB domain (aib.ie)',
      'Does NOT ask you to click a link urgently',
      'Explicitly says "you don\'t need to do anything right now"',
      'Provides multiple contact methods (branch, phone, app)',
      'Professional tone without pressure or threats',
      'Links to genuine aib.ie domain',
      'Informational only, no action required',
    ],
    hint: 'Not all emails from banks are scams. Look at whether this email is asking you to DO something or just informing you.',
    lesson: 'Banks do email customers, but legitimate bank emails rarely ask you to log in via a link to resolve an issue.',
    externalLink: { text: 'Take Five To Stop Fraud', url: 'https://www.takefive-stopfraud.org.uk/' }
  },
  {
    id: 8,
    type: 'phishing',
    difficulty: 'hard',
    senderName: 'Revenue - Irish Tax & Customs',
    senderEmail: 'refunds@revenue-ie-online.com',
    subject: 'Tax Refund Notification - €847.63 owed to you',
    timestamp: '1:15 PM',
    body: `Dear Taxpayer,

After reviewing your annual tax return, we have determined that you are owed a refund of €847.63.

To process your refund, we need to verify your bank details. Please complete the secure verification form:

[Claim Your Refund](https://revenue-ie-online.com/refund-form)

Please note: Refunds not claimed within 14 days will be forfeited and cannot be reissued.

This is an automated notification from Revenue Online Service (ROS).

Revenue Commissioners
Irish Tax and Customs
Dublin Castle, Dublin 2`,
    links: [
      { text: 'Claim Your Refund', actualUrl: 'https://revenue-ie-online.com/refund-form' },
    ],
    redFlags: [
      'Domain is "revenue-ie-online.com" not the real "revenue.ie"',
      'Revenue never emails asking for bank details',
      'Specific refund amount designed to seem credible',
      'Creates urgency ("14 days or forfeited")',
      'Revenue refunds are processed through ROS, not email links',
      'Uses HTTPS to appear more legitimate (sophisticated tactic)',
    ],
    hint: 'Revenue\'s real website is revenue.ie. They process refunds through your ROS account, never through email links.',
    lesson: 'Government tax agencies will never ask for bank details via email. If you owe or are owed money, they communicate via secure portals.',
    externalLink: { text: 'ActionFraud: Fake Tax Scams', url: 'https://www.actionfraud.police.uk/a-z-of-fraud/hmrc-scams' }
  },
  {
    id: 9,
    type: 'phishing',
    difficulty: 'hard',
    senderName: 'WhatsApp',
    senderEmail: 'verify@whatsapp-business-support.com',
    subject: 'Action Required: Verify your WhatsApp account',
    timestamp: '4:08 PM',
    body: `Hi,

We've noticed your WhatsApp account hasn't been verified with our new security system. All accounts must complete verification by 30 June 2026 to continue using the service.

Verification takes less than 2 minutes:

[Complete Verification](https://whatsapp-business-support.com/verify)

What happens if you don't verify:
• Your message history may be lost
• Your account could be deactivated
• You won't be able to receive messages

This is a one-time security measure to protect your account.

WhatsApp Support Team
Meta Platforms, Inc.`,
    links: [
      { text: 'Complete Verification', actualUrl: 'https://whatsapp-business-support.com/verify' },
    ],
    redFlags: [
      'WhatsApp never sends emails asking for account verification',
      'Domain is "whatsapp-business-support.com" not "whatsapp.com"',
      'WhatsApp verifies accounts through the app itself, not email',
      'Threatens loss of messages and deactivation',
      'Creates a deadline to pressure action',
      'WhatsApp is free and never requires "verification" via external links',
    ],
    hint: 'Think about how WhatsApp actually works. Does it normally communicate with you through email?',
    lesson: 'Apps like WhatsApp verify you via SMS or in-app notifications, never via external emails demanding links to be clicked.',
    externalLink: { text: 'WhatsApp Security Advice', url: 'https://faq.whatsapp.com/1381395802436402' }
  },
  {
    id: 10,
    type: 'legitimate',
    difficulty: 'hard',
    senderName: 'GitHub',
    senderEmail: 'noreply@github.com',
    subject: '[GitHub] A new public key was added to your account',
    timestamp: '2:11 AM',
    body: `A new public key was added to your account (username).

If this was you, you can safely ignore this email.

If you did not add this key, your account may be compromised. Please review your SSH keys immediately:

[Review SSH Keys](https://github.com/settings/keys)

Thanks,
The GitHub Team`,
    links: [
      { text: 'Review SSH Keys', actualUrl: 'https://github.com/settings/keys' }
    ],
    redFlags: [],
    legitimateIndicators: [
      'Sent from genuine github.com domain',
      'Links go to exactly the correct settings page (github.com)',
      'Offers a clear "If this was you, ignore this" statement without panic',
    ],
    hint: 'Examine the domain exactly. Does the link look exactly like the site you expect?',
    lesson: 'Legitimate security alerts will point to exact domains and offer "If you did this, ignore" without inducing panic deadlines.',
    externalLink: { text: 'NCSC: Understanding MFA and Security Keys', url: 'https://www.ncsc.gov.uk/guidance/multi-factor-authentication-mfa' }
  }
];

module.exports = phishingEmails;
