const path = require('path')

module.exports = {
  entry: './webpack.index.js',
  output: {
    filename: 'index.bundle.js',
    path: path.resolve(__dirname, 'public/dist')
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'] // 這兩個loader放的前後順序天差地別！！倒過來就報錯了！！
      }
    ]
  }
}
