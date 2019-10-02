const path = require('path')

module.exports = {
  mode: 'development',
  entry: './src/main.ts',

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist'
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  devServer: {
    contentBase : [path.join(__dirname, '/'),path.join(__dirname, 'assets')]
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
     /*   {
            test: /\.(png|gltf|bin)$/,
            use: [
            'file-loader'
        ]
     }*/
    ]
  },
  watchOptions: {
    ignored: /node_modules/
  }
}
