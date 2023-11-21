/** @type {import("prettier").Config} */
const config = {
  trailingComma: "all",
  tabWidth: 2,
  useTabs: false,
  semi: true,
  experimentalTernaries: true,
  printWidth: 80,
  plugins: ["prettier-plugin-organize-imports"],
};

module.exports = config;
