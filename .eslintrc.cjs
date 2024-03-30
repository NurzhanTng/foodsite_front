module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended"
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh"],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true }
    ],
    "import/no-internal-modules": [
      "error",
      {
        "allow": ["src/**/*"],
        "forbid": ["src/app/**", "src/features/**", "src/entities/**", "src/pages/**", "src/shared/**", "src/widget/**"]
      }
    ]
  }
};
