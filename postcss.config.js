module.exports = {
  map: false,
  plugins: {
    'postcss-preset-env': {
      stage: 0,
      browsers: ['last 5 versions', 'not ie < 11'],
      autoprefixer: {
        grid: true,
        cascade: false
      }
    },
    'postcss-pxtorem': {
      rootValue: 16,
      propList: ['*']
    },
    'cssnano': {
      preset: 'default'
    }
  }
};