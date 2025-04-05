module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom", // اگر برای تست‌های React از jsdom استفاده می‌کنید
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
    "^.+\\.(js|jsx)$": "babel-jest", // برای فایل‌های JS و JSX
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1", // مسیرهای کوتاه را به مسیرهای نسبی تبدیل می‌کند
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
};
