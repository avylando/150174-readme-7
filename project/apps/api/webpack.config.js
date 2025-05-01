const { composePlugins, withNx } = require('@nx/webpack');
const { join } = require('path');

// Nx plugins for webpack.
module.exports = composePlugins(
  withNx({
    compiler: 'tsc',
    main: join(__dirname, './src/main.ts'),
    tsConfig: join(__dirname, './tsconfig.app.json'),
    assets: [join(__dirname, './src/assets')],
    optimization: false,
    outputHashing: 'none',
    transformers: [
      {
        name: '@nestjs/swagger/plugin',
      },
    ],
  }),
  (config) => {
    // Update the webpack config as needed here.
    // e.g. `config.plugins.push(new MyPlugin())`
    return config;
  },
);
