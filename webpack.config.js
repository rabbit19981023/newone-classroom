const path = require('path')

module.exports = {
  // 設定多個Chunck
  // <chunck name>: 'single entry file' | [multiple entry files]
  entry: {
    main: './public/webpack.main.js',
    index: './public/webpack.index.js'
  },
  output: {
    filename: '[name].bundle.js', // output files name depends on chuncks name
    path: path.resolve(__dirname, 'public/dist')
  },
  module: {
    // webpack會從進入點開始查找所有import的JS模組，以'test', 'include', 'exclude'等作為查找的條件
    // 以use物件裡的內容決定要套用的插件功能
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
        use: [
          // webpack會由下而上依序執行，因此以下的Loader置放順序非常重要！如果webpack報錯了，優先查看這裡
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: ['postcss-preset-env']
              }
            }
          },
        ]
      }
    ]
  }
}
