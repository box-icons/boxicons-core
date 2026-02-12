module.exports = {
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          removeViewBox: false,
          removeXMLNS: false,
        },
      },
    },
    'removeDimensions',
    {
      name: 'addAttributesToSVGElement',
      params: {
        attributes: [
          { viewBox: '0 0 24 24' }
        ]
      }
    }
  ]
};
