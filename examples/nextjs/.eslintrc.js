module.exports = {
  env: {
    node: true,
    browser: true
  },
  parser: "babel-eslint",
  plugins: ["prettier", "react", "react-hooks", "import"],
  rules: {
    "import/no-unresolved": "error",
    "import/named": "error",
    "import/export": "error",
    "import/no-named-as-default": "error",
    "import/no-named-as-default-member": "error",
    "prettier/prettier": "error",
    "no-alert": "error",
    "no-duplicate-imports": "error",
    "no-useless-constructor": "error",
    "no-useless-escape": "error",
    "no-undef": "error",
    "no-undef-init": "error",
    "react/jsx-no-undef": "error",
    "react/jsx-uses-react": "error",
    "react/jsx-uses-vars": "error",
    "react/no-did-mount-set-state": "error",
    "react/no-did-update-set-state": "error",
    "react/no-unknown-property": "error",
    "react/react-in-jsx-scope": "error",
    "react/self-closing-comp": "error",
    "react/jsx-wrap-multilines": "error",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn"
  }
};
