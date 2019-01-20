module.exports = {
  presets: [
    "@babel/react",
    "@babel/typescript",
    ["@babel/preset-env", {"modules": false}]
  ],
  plugins: [
    "transform-class-properties"
  ]
};
