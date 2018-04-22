const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');


module.exports = {
  entry: './scripts/main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'eval-source-map',
  devServer: {
    contentBase: './dist'
  },
  plugins: [
    new UglifyJsPlugin({ sourceMap: true }),
    new CleanWebpackPlugin(['dist']),
    new CopyWebpackPlugin([
            {from:'images',to:'images'}
        ]),
    new HtmlWebpackPlugin({
      title:'Portfolio',
      template: './index.html',
      inject: 'body',
      minify: {
        html5: true,
        collapseWhitespace: true,
        useShortDoctype: true
      }
    })
  ],
  module: {
    rules: [
      {
       test: /\.js$/,
       exclude: [
         /node_modules/,
         /spec/
       ],
       loader: "babel-loader",
       options: {
         presets: ['es2015']
       }
     },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "eslint-loader"
      },
      {
        test: /\.(png|jp(e*)g|svg)$/,
        use: [{
            loader: 'url-loader',
            options: {
                limit: 8000, // Convert images < 8kb to base64 strings
                name: 'images/[hash]-[name].[ext]'
            }
        }]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'images/',
              publicPath: 'images/'
            }
          },
          {
            loader:'image-webpack-loader',
            options: {

            }
          }
        ]
      }
    ]
  }
};
