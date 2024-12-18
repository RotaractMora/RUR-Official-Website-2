module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "google",
    "plugin:@typescript-eslint/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: ["tsconfig.json", "tsconfig.dev.json"],
    sourceType: "module",
  },
  ignorePatterns: [
    "/lib/**/*", // Ignore built files.
    "/generated/**/*", // Ignore generated files.
  ],
  plugins: [
    "@typescript-eslint",
    "import",
  ],
  rules: {
    "quotes": ["error", "double"],
    "import/no-unresolved": 0,
    "indent": ["error", 2],
    // Disable warning for require statements in ES Modules
    "@typescript-eslint/no-var-requires": "off", // Allow 'require' in ESM
    "import/no-commonjs": "off", // Allow 'require' in ESM, commonjs modules
    // Change linebreak-style from error to warning
    "linebreak-style": ["warn", "unix"],
    "max-len": ["error", {"code": 120}],
  },
};
