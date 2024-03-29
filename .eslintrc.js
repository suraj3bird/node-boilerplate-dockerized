module.exports = {
    env: {
      browser: true,
      es2021: true,
      node: true,
    },
    extends: [
      "eslint:recommended",
      "plugin:@typescript-eslint/recommended",
      "prettier",
      "prettier/@typescript-eslint",
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
      ecmaVersion: 12,
      sourceType: "module",
    },
    plugins: ["@typescript-eslint", "prettier"],
    rules: {
      "prettier/prettier": [
        "error",
        {
          trailingComma: "all",
          semi: true,
          endOfLine: "auto",
        },
      ],
      indent: ["error", 2, { SwitchCase: 1 }],
      "linebreak-style": "off",
    },
  };
  