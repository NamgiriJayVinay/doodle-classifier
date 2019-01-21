const path = require('path');
const ManifestPlugin = require('webpack-manifest-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');


module.exports = {

  entry: "./src/index.tsx",


  output: {
    path: path.resolve(__dirname, "../server/public/"),
    filename: "[name].bundle.[chunkhash:8].js",
    publicPath: "public/"
  },


  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"]
  },


  module: {
    rules: [
      {
        oneOf: [
          // "url" loader works like "file" loader except that it embeds assets
          // smaller than specified limit in bytes as data URLs to avoid requests.
          // A missing `test` is equivalent to a match.
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.svg$/],
            loader: require.resolve('url-loader'),
            options: {
              limit: 10000,
              name: 'media/[name].[hash:8].[ext]',
            },
          },
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
          // "file" loader makes sure those assets get served by WebpackDevServer.
          // When you `import` an asset, you get its (virtual) filename.
          // In production, they would get copied to the `build` folder.
          // This loader doesn't use a "test" so it will catch all modules
          // that fall through the other loaders.
          {
            loader: require.resolve('file-loader'),
            // Exclude `js` files to keep "css" loader working as it injects
            // its runtime that would otherwise be processed through "file" loader.
            // Also exclude `html` and `json` extensions so they get processed
            // by webpacks internal loaders.
            exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
            options: {
              name: 'media/[name].[hash:8].[ext]',
            },
          }

        ]
      }
    ]
  },


  plugins: [
    new CleanWebpackPlugin(['public'], {
      root: __dirname + '/../server'
    }
    ),
    new ManifestPlugin()
  ]
};
