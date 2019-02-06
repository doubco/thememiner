module.exports = {
  env: {
    browser: true,
    node: true
  },
  parser: "babel-eslint",
  plugins: ["prettier", "import"],
  rules: {
    "import/named": "off",
    "import/export": "error",
    "import/no-named-as-default": "error",
    "import/no-named-as-default-member": "error",
    "prettier/prettier": "error",
    "no-alert": "warn",
    "no-duplicate-imports": "error",
    "no-useless-constructor": "error",
    "no-useless-escape": "error",
    "no-undef": "error",
    "no-undef-init": "error"
  }
};
