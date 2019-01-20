const path = require('path');
const ManifestPlugin = require('webpack-manifest-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');


module.exports = {
  mode: "production",

  entry: "./src/index.tsx",


  output: {
    path: path.resolve(__dirname, "../server/public/"),
    filename: "[name].bundle.[chunkhash].js",
    publicPath: "public/"
  },


  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"]
  },


  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'babel-loader',
      },
      {
        test: /\.js$/,
        use: ["source-map-loader"],
        enforce: "pre"
      },
      {
        test: /\.(css)$/,
        exclude: /node_modules/,
        use: ["style-loader", "css-loader"]
      },
      // {
      //   test: /\.svg$/,
      //   loader: 'svg-inline-loader'
      // },
      {
        test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
        loader: "file-loader"
      }
    ]
  },


  plugins: [
    new CleanWebpackPlugin(['public'], {
      root: __dirname + '/../server'
    }
    ),
    new ManifestPlugin()
  ],


  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendor",
          chunks: "initial"
        }
      }
    }
  }
};
