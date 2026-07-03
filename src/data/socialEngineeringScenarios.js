/**
 * Social Engineering Room Scenario Data
 * 5 scenarios presented as simulated communications.
 * Each has a setup, decision point, consequences, lesson, and externalLink.
 */
const socialEngineeringScenarios = [
  {
    id: 1,
    type: 'text-message',
    title: 'The Prize Winner',
    difficulty: 'easy',
    setup: 'You receive the following text message on your phone:',
    messages: [
      {
        sender: 'unknown',
        senderLabel: '+44 7911 234567',
        text: 'Congratulations! You have been selected as the winner of our £5,000 Summer Prize Draw! To claim your prize, reply with your full name and bank sort code so we can transfer your winnings. Reply STOP to opt out.',
        timestamp: '14:32',
      },
    ],
    decisionPrompt: 'What do you do?',
    options: [
      {
        id: 'a',
        text: 'Reply with your name and bank details to claim the prize',
        isCorrect: false,
        consequence: 'You send your bank sort code. Within hours, the scammers use this information combined with other data to set up a direct debit on your account. You lose £340 before you notice.',
        lesson: 'Never share bank details with unknown contacts. Legitimate prize draws never ask for banking information via text message.',
        externalLink: { text: 'Report Text Scams to NCSC', url: 'https://www.ncsc.gov.uk/collection/phishing-scams/report-scam-text-message' }
      },
      {
        id: 'b',
        text: 'Reply STOP to opt out of future messages',
        isCorrect: false,
        consequence: 'By replying at all, you confirm to the scammers that your phone number is active and monitored. You start receiving even more scam messages over the following weeks.',
        lesson: 'Do not reply to suspicious messages at all, even to "unsubscribe." Replying confirms your number is active.',
        externalLink: { text: 'ActionFraud Advice on Smishing', url: 'https://www.actionfraud.police.uk/a-z-of-fraud/smishing' }
      },
      {
        id: 'c',
        text: 'Delete the message and block the number',
        isCorrect: true,
        consequence: 'You delete the message and block the sender. The scam attempt fails completely. You report the number to 7726 (the spam reporting service).',
        lesson: 'If you did not enter a competition, you cannot have won one. Delete and block suspicious messages. You can report scam texts by forwarding them to 7726.',
        externalLink: { text: 'How to Report Smishing', url: 'https://www.actionfraud.police.uk/a-z-of-fraud/smishing' }
      },
    ],
    redFlags: [
      'You never entered a "Summer Prize Draw"',
      'Legitimate prizes never require bank details via text',
      'The message comes from an unknown mobile number, not a company',
      'Creates excitement to override your judgment',
    ],
    hint: 'Ask yourself: did you actually enter any competition recently?',
  },
  {
    id: 2,
    type: 'phone-call',
    title: 'The Tech Support Call',
    difficulty: 'medium',
    setup: 'Your phone rings. The caller says:',
    messages: [
      {
        sender: 'caller',
        senderLabel: 'Unknown Caller',
        text: '"Good afternoon. I\'m calling from Microsoft Technical Support. We\'ve detected that your computer has been sending error reports to our server, which indicates you may have a serious virus. I can help you fix this right now if you have a few minutes. Could you please go to your computer?"',
        timestamp: '15:45',
      },
    ],
    followUp: {
      trigger: 'If you stay on the line, they say:',
      message: '"I\'ll need you to open your web browser and go to a website where you can download our remote support tool. This will let me see your screen and remove the virus for you. The website is support-fix-now.com."',
    },
    decisionPrompt: 'What do you do?',
    options: [
      {
        id: 'a',
        text: 'Follow their instructions and go to the website',
        isCorrect: false,
        consequence: 'You install their "support tool" which is actually remote access software. The caller now has full control of your computer. They access your banking, install real malware, and demand £299 for "virus removal." Your bank account is compromised.',
        lesson: 'Microsoft (and other tech companies) will NEVER call you unsolicited about computer problems. They have no way to detect issues on your personal computer.',
        externalLink: { text: 'Microsoft Scam Reporting', url: 'https://www.microsoft.com/en-gb/concern/scam' }
      },
      {
        id: 'b',
        text: 'Ask them to prove they are from Microsoft by giving you a reference number',
        isCorrect: false,
        consequence: 'They give you a fake reference number: "MS-SEC-2024-7742." This sounds official but means nothing. Feeling reassured, you follow their instructions. The scam proceeds as planned.',
        lesson: 'Scammers can make up reference numbers, employee IDs, and department names. These prove nothing. The only way to verify is to contact the company yourself through their official channels.',
        externalLink: { text: 'Microsoft Scam Reporting', url: 'https://www.microsoft.com/en-gb/concern/scam' }
      },
      {
        id: 'c',
        text: 'Hang up immediately without engaging further',
        isCorrect: true,
        consequence: 'You hang up. The scammer moves on to their next target. Your computer and accounts remain secure. You were never at risk because Microsoft does not make unsolicited support calls.',
        lesson: 'Hang up on unsolicited tech support calls. Microsoft, Apple, and your internet provider will never call you out of the blue about computer problems. If you are worried, contact the company directly using a number from their official website.',
        externalLink: { text: 'Protect Yourself from Tech Scams', url: 'https://www.actionfraud.police.uk/a-z-of-fraud/computer-software-service-fraud' }
      },
    ],
    redFlags: [
      'Microsoft never makes unsolicited phone calls about computer issues',
      'They cannot detect "error reports" from your personal computer',
      'They want you to install remote access software',
      'They create urgency ("serious virus")',
      'The "support website" is not a Microsoft domain',
    ],
    hint: 'Has Microsoft ever called you before? Do they even have your phone number?',
  },
  {
    id: 3,
    type: 'text-message',
    title: 'The Grandchild in Trouble',
    difficulty: 'hard',
    setup: 'You receive these WhatsApp messages from an unknown number:',
    messages: [
      {
        sender: 'unknown',
        senderLabel: 'Unknown Number',
        text: 'Hi Gran, it\'s Emma 💕',
        timestamp: '18:22',
      },
      {
        sender: 'unknown',
        senderLabel: 'Unknown Number',
        text: 'I dropped my phone in water and it\'s completely broken 😭 I\'m using my friend\'s phone',
        timestamp: '18:22',
      },
      {
        sender: 'unknown',
        senderLabel: 'Unknown Number',
        text: 'I\'m in a bit of trouble Gran. I need to pay my rent by tonight or I\'ll be kicked out of my flat. My bank card is linked to my old phone and I can\'t access my money. Could you transfer me £500? I\'ll pay you back on Friday when I get paid, I promise 🙏',
        timestamp: '18:23',
      },
      {
        sender: 'unknown',
        senderLabel: 'Unknown Number',
        text: 'Please don\'t tell Mum, she\'ll worry. Here are my friend\'s bank details for the transfer: Sort code 20-45-78, Account 41829365',
        timestamp: '18:24',
      },
    ],
    decisionPrompt: 'What do you do?',
    options: [
      {
        id: 'a',
        text: 'Transfer the money quickly so Emma doesn\'t lose her flat',
        isCorrect: false,
        consequence: 'You transfer £500 to the account provided. It is not Emma\'s friend\'s account. It belongs to a money mule working for criminals. The money is gone within minutes and cannot be recovered. When you later call Emma on her real number, she has no idea what you are talking about. Her phone is fine.',
        lesson: 'This is called a "grandparent scam" or "Hi Mum/Dad" scam. Criminals send these messages to thousands of people hoping some will have a grandchild with that name. They exploit your love and protective instincts.',
        externalLink: { text: 'ActionFraud on WhatsApp Scams', url: 'https://www.actionfraud.police.uk/alert/warning-issued-over-whatsapp-scam-that-has-already-cost-victims-1-5m' }
      },
      {
        id: 'b',
        text: 'Ask "Emma" a personal question that only she would know',
        isCorrect: false,
        consequence: 'You ask what you got her for Christmas. The scammer does not reply for 10 minutes, then says "Gran I\'m really stressed right now, can we do this later? I just really need the money." The emotional pressure continues. Many people give in at this point.',
        lesson: 'While asking a verification question is better than sending money immediately, scammers may find answers on social media or simply deflect with emotional pressure. The safest approach is always to verify through a separate channel.',
        externalLink: { text: 'ActionFraud on WhatsApp Scams', url: 'https://www.actionfraud.police.uk/alert/warning-issued-over-whatsapp-scam-that-has-already-cost-victims-1-5m' }
      },
      {
        id: 'c',
        text: 'Call Emma on her usual phone number to check if this is really her',
        isCorrect: true,
        consequence: 'You call Emma\'s normal number. She answers immediately. Her phone is fine. She is at home watching television and has no idea about these messages. You have just avoided losing £500 to a scammer.',
        lesson: 'Always verify unexpected requests for money by contacting the person through their normal number or another trusted channel. Never use contact details provided in the suspicious message itself.',
        externalLink: { text: 'Learn about the "Hi Mum" Scam', url: 'https://www.which.co.uk/consumer-rights/advice/how-to-spot-a-whatsapp-scam-aO72U1X9YxT1' }
      },
    ],
    redFlags: [
      'Message comes from an unknown number claiming to be a family member',
      'Explains why they are on a different number (broken phone)',
      'Asks for money urgently with a deadline',
      'Asks you not to tell other family members',
      'Provides bank details belonging to a "friend"',
      'Uses emotional pressure and familiarity',
    ],
    hint: 'Before sending any money, is there a way you could confirm this is actually your grandchild?',
  },
  {
    id: 4,
    type: 'phone-call',
    title: 'The Authority Figure',
    difficulty: 'hard',
    setup: 'You receive a phone call. The caller sounds very professional and serious:',
    messages: [
      {
        sender: 'caller',
        senderLabel: 'Withheld Number',
        text: '"Good morning. This is Officer David Walsh calling from the Garda National Economic Crime Bureau. I\'m calling regarding a serious matter involving your bank account. We have evidence that your account has been used in a money laundering operation. I need to verify some details with you to clear this up. This is a confidential investigation, so please do not discuss this call with anyone, including your bank."',
        timestamp: '10:15',
      },
    ],
    followUp: {
      trigger: 'If you express concern, they continue:',
      message: '"I understand this is alarming. You are not in trouble yourself, but we need to move your funds to a secure government account while we investigate. I\'ll give you the account details now. This is standard procedure in these cases. Can you confirm your current bank and account number first?"',
    },
    decisionPrompt: 'What do you do?',
    options: [
      {
        id: 'a',
        text: 'Cooperate with the officer and provide your bank details',
        isCorrect: false,
        consequence: 'You provide your bank details. The "officer" then asks you to transfer your savings to a "safe account." You transfer £12,000. The account belongs to criminals. The Gardaí never asked you to do this because it is not something any real police force would ever request.',
        lesson: 'No police force, tax authority, or government agency will ever ask you to transfer money to a "safe account." This is always a scam, no matter how official the caller sounds.',
        externalLink: { text: 'Police Impersonator Scams', url: 'https://www.actionfraud.police.uk/a-z-of-fraud/courier-fraud' }
      },
      {
        id: 'b',
        text: 'Ask for their badge number and say you will call the Garda station to verify',
        isCorrect: false,
        consequence: 'They give you a badge number: "GS-4471." They say "Of course, you can verify. Call the main Garda switchboard." However, they stay on the line. When you think you have hung up and dialled the Garda number, you are actually still connected to the scammer, who answers pretending to be the switchboard.',
        lesson: 'Scammers can keep the phone line open even after you think you have hung up (especially on landlines). Always use a DIFFERENT phone to verify, or wait at least 5 minutes before calling back.',
        externalLink: { text: 'Protect Yourself from Phone Fraud', url: 'https://www.takefive-stopfraud.org.uk/' }
      },
      {
        id: 'c',
        text: 'Hang up, wait 5 minutes, then call the Gardaí directly on their published number using a different phone if possible',
        isCorrect: true,
        consequence: 'You hang up and use your mobile to call your local Garda station. They confirm that no such investigation exists and that this is a known scam. They thank you for reporting it. Your money is safe.',
        lesson: 'Real police will never ask you to transfer money, keep a call secret from your bank, or pressure you to act immediately. Always verify by calling the organisation directly on a number you find yourself, ideally from a different phone.',
        externalLink: { text: 'Take Five To Stop Fraud', url: 'https://www.takefive-stopfraud.org.uk/' }
      },
    ],
    redFlags: [
      'Unsolicited call about a "serious matter" involving your money',
      'Asks you not to tell anyone, including your bank',
      'Requests you to move money to a "secure" or "safe" account',
      'Creates fear and urgency',
      'No legitimate authority would ask for bank transfers over the phone',
      'Caller ID can be spoofed to show any number',
    ],
    hint: 'Would the real police ever ask you to transfer your money somewhere over the phone?',
  },
  {
    id: 5,
    type: 'phone-call',
    title: 'The Fake Colleague',
    difficulty: 'hard',
    setup: 'You receive a phone call at work:',
    messages: [
      {
        sender: 'caller',
        senderLabel: 'IT Department',
        text: '"Hi, this is Mark from IT Support. We are doing an emergency update on the VPN server and I noticed your account is throwing errors. I need to re-sync your credentials right away or you will lose access to all company systems in 10 minutes. Can you quickly read me the 6-digit code from your authenticator app?"',
        timestamp: '14:20',
      },
    ],
    decisionPrompt: 'What do you do?',
    options: [
      {
        id: 'a',
        text: 'Give them the 6-digit code from your app',
        isCorrect: false,
        consequence: 'You read them the code. The caller immediately uses the code to bypass your 2FA and access the company network. They deploy ransomware across the entire company network. You just bypassed your own security.',
        lesson: 'Never share an authenticator code, SMS code, or password with anyone, even IT support. Real IT will never need your password or 2FA code to fix an issue.',
        externalLink: { text: 'NCSC Guidance on MFA', url: 'https://www.ncsc.gov.uk/guidance/multi-factor-authentication-mfa' }
      },
      {
        id: 'b',
        text: 'Tell them you will call them back on the internal IT helpdesk extension',
        isCorrect: true,
        consequence: 'You hang up and dial the internal IT number. The real IT department confirms there is no issue with your account and no "Mark" working there. You just saved the company from a major breach.',
        lesson: 'Always verify unexpected requests for credentials by calling back via an established, trusted internal channel. Never trust caller ID.',
        externalLink: { text: 'NCSC Social Engineering Guidance', url: 'https://www.ncsc.gov.uk/collection/phishing-scams' }
      },
      {
        id: 'c',
        text: 'Ask for their employee ID before giving the code',
        isCorrect: false,
        consequence: 'They confidently rattle off an ID number "IT-4991". You give them the code. They breach your account. Employee IDs mean nothing if the caller cannot be verified through official channels.',
        lesson: 'Scammers have no problem making up fake IDs or using stolen information to sound legitimate.',
        externalLink: { text: 'Take Five To Stop Fraud', url: 'https://www.takefive-stopfraud.org.uk/' }
      },
    ],
    redFlags: [
      'Unsolicited call from someone claiming to be IT',
      'Asks for a 2FA code (which should never be shared)',
      'Creates urgency ("lose access in 10 minutes")',
    ],
    hint: 'Should you ever share a 2FA or password code with ANYONE over the phone?',
  }
];

module.exports = socialEngineeringScenarios;
