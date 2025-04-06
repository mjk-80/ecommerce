module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom", // اگر برای تست‌های React از jsdom استفاده می‌کنید
  transform: {
    "@^.+\\.(ts|tsx)$": "ts-jest",
    "@^.+\\.(js|jsx)$": "babel-jest", // برای فایل‌های JS و JSX
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
};
