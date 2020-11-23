module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/essential", "eslint:recommended", "@vue/prettier"],
  parserOptions: {
    parser: "babel-eslint"
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "off" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "off" : "off",
    "prettier/prettier": "off",
    "generator-star-spacing": "off",
    "no-tabs": "off",
    "no-unused-vars": "off",
    "no-irregular-whitespace": "off"
  }
};
