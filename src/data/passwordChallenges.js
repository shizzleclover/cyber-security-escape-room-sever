/**
 * Password Room Challenge Data
 * 4 challenges that progressively teach password security concepts.
 */
const passwordChallenges = [
  {
    id: 1,
    type: 'rank-passwords',
    title: 'Rate These Passwords',
    instruction: 'Drag these passwords from weakest (top) to strongest (bottom), or select the correct ranking.',
    teachingPoint: 'Length matters more than complexity. A long passphrase beats a short complex password every time.',
    passwords: [
      {
        id: 'a',
        value: 'password123',
        strength: 1,
        crackTime: 'Less than 1 second',
        explanation: 'This is one of the most commonly used passwords in the world. Hackers try it first.',
      },
      {
        id: 'b',
        value: 'J@m3s!',
        strength: 2,
        crackTime: 'About 5 minutes',
        explanation: 'Short passwords with symbol substitutions look complex but are easily cracked. Only 6 characters long.',
      },
      {
        id: 'c',
        value: 'Sunshine2024!',
        strength: 3,
        crackTime: 'About 3 days',
        explanation: 'Better length, but uses a common word with a predictable pattern (word + year + symbol).',
      },
      {
        id: 'd',
        value: 'correct-horse-battery-staple',
        strength: 4,
        crackTime: 'Over 500 years',
        explanation: 'Long passphrases made of random words are extremely strong. 28 characters of pure length makes brute-force practically impossible.',
      },
    ],
    correctOrder: ['a', 'b', 'c', 'd'],
    externalLink: { text: 'NCSC Password Guidance', url: 'https://www.ncsc.gov.uk/collection/passwords' }
  },
  {
    id: 2,
    type: 'build-password',
    title: 'Build a Strong Password',
    instruction: 'Create a password that meets all the requirements below. Watch the strength meter as you type.',
    teachingPoint: 'The best passwords are long, memorable passphrases. Try combining 3-4 random words with a number or symbol between them.',
    requirements: [
      { id: 'length', label: 'At least 12 characters long', check: (pw) => pw.length >= 12 },
      { id: 'noCommon', label: 'Not a common word or phrase', check: null }, // checked against list
      { id: 'noPersonal', label: 'Does not contain names, dates, or personal info', check: null },
      { id: 'mixed', label: 'Contains at least one number or symbol', check: (pw) => /[\d!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/.test(pw) },
    ],
    commonPasswords: [
      'password', 'password123', '123456', 'qwerty', 'letmein', 'welcome',
      'monkey', 'dragon', 'master', 'football', 'shadow', 'sunshine',
      'trustno1', 'iloveyou', 'batman', 'access', 'hello', 'charlie',
    ],
    strengthLevels: [
      { min: 0, max: 20, label: 'Very Weak', colour: '#ef4444', time: 'Instantly' },
      { min: 21, max: 40, label: 'Weak', colour: '#f97316', time: 'Minutes to hours' },
      { min: 41, max: 60, label: 'Fair', colour: '#eab308', time: 'Days to weeks' },
      { min: 61, max: 80, label: 'Strong', colour: '#22c55e', time: 'Months to years' },
      { min: 81, max: 100, label: 'Very Strong', colour: '#10b981', time: 'Centuries' },
    ],
    externalLink: { text: 'Test Your Password Strength', url: 'https://www.security.org/how-secure-is-my-password/' }
  },
  {
    id: 3,
    type: 'reuse-scenario',
    title: 'The Danger of Password Reuse',
    instruction: 'You used the same password for all these accounts. A hacker just got your password from a data breach at one site. Select ALL accounts that are now at risk.',
    teachingPoint: 'Never reuse passwords. When one site is breached, attackers try your password on every other popular service. This is called "credential stuffing."',
    scenario: {
      breachedSite: 'FitnessPal (fitness tracking app)',
      password: 'MyDog2019!',
      accounts: [
        { id: 'email', name: 'Gmail', samePassword: true, icon: 'mail' },
        { id: 'bank', name: 'Online Banking', samePassword: true, icon: 'bank' },
        { id: 'social', name: 'Facebook', samePassword: true, icon: 'users' },
        { id: 'shopping', name: 'Amazon', samePassword: true, icon: 'shopping-cart' },
        { id: 'streaming', name: 'Netflix', samePassword: false, icon: 'tv' },
        { id: 'work', name: 'Work Email', samePassword: false, icon: 'briefcase' },
      ],
    },
    correctAnswers: ['email', 'bank', 'social', 'shopping'],
    explanation: 'Every account where you used the same password is now compromised. The hacker will try your email and password combination on banking, social media, and shopping sites within minutes of getting it.',
    externalLink: { text: 'Check if you have been breached', url: 'https://haveibeenpwned.com/' }
  },
  {
    id: 4,
    type: 'password-manager',
    title: 'Your Digital Key Ring',
    instruction: 'A password manager is like a secure key ring for all your passwords. Explore how it works below.',
    teachingPoint: 'A password manager lets you have a unique, strong password for every account while only needing to remember one master password.',
    demo: {
      masterPassword: 'my-favourite-sunset-beach-2024',
      storedAccounts: [
        { site: 'Gmail', username: 'margaret.smith@gmail.com', password: 'kX9#mP2$vL7@nQ4w' },
        { site: 'AIB Banking', username: 'margaret.smith', password: 'Hy8&jR3!bN5*cT9z' },
        { site: 'Facebook', username: 'margaret.smith@gmail.com', password: 'wQ4#fK7$mX2@pL6n' },
        { site: 'Amazon', username: 'margaret.smith@gmail.com', password: 'nT5&hJ8!vR3*yW7q' },
        { site: 'Netflix', username: 'margaret.smith@gmail.com', password: 'cL2#bX9$kM4@jF6p' },
      ],
      benefits: [
        'You only remember ONE master password',
        'Every account gets a unique, uncrackable password',
        'If one site is breached, your other accounts stay safe',
        'The manager can auto-fill passwords so you never need to type them',
        'Many are free to use (Bitwarden, Apple Keychain, Google Password Manager)',
      ],
    },
    questions: [
      {
        question: 'How many passwords do you need to remember when using a password manager?',
        options: ['One (the master password)', 'One for each account', 'None, it remembers everything', 'Two (master + backup)'],
        correctAnswer: 0,
      },
      {
        question: 'Which of these is a FREE password manager?',
        options: ['All password managers cost money', 'Bitwarden', 'Only Apple users get free ones', 'You have to pay monthly'],
        correctAnswer: 1,
      },
    ],
    externalLink: { text: 'Get Bitwarden (Free Password Manager)', url: 'https://bitwarden.com/' }
  },
];

module.exports = passwordChallenges;
