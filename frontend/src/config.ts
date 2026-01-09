const getEnv = (key: string, defaultValue: string = ''): string => {
  const value = import.meta.env[key] || defaultValue;
  if (!value) console.warn(`Missing env var: ${key}`);
  return value;
};

export const config = {
  baseUrl: getEnv('VITE_BASE_URL', 'http://localhost:3000'),

  auth: {
    googleClientId: getEnv('VITE_GOOGLE_CLIENT_ID'),
  },
  
  platforms: {
    mentorpickUrl: getEnv('VITE_LINK_MENTORPICK', 'https://mentorpick.com'),
    leetcodeUrl: getEnv('VITE_LINK_LEETCODE', 'https://leetcode.com/accounts'),
    codechefUrl: getEnv('VITE_LINK_CODECHEF', 'https://www.codechef.com'),
    codeforcesUrl: getEnv('VITE_LINK_CODEFORCES', 'https://codeforces.com'),
    linkedinUrl: getEnv('VITE_LINK_LINKEDIN', 'https://www.linkedin.com'),
    githubUrl: getEnv('VITE_LINK_GITHUB', 'https://github.com'),
  }
};