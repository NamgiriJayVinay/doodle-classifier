module.exports = {
  entry: [
    './src/index.jsx'
  ],
  module: {
    rules: [
    {
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: ['babel-loader']
    },
    {
      test: /\.(css)$/,
      exclude: /node_modules/,
      use: ["style-loader", "css-loader"]
    }
    ]
  },
  output: {
    path: __dirname + '/../server/static',
    filename: 'bundle.js'
  }
};
