const { join } = require('path');
const { utils } = require('umi');
const {  copyFileSync, statSync } = require('fs');

export default (api) => {
  let generatedOnce = false;
  api.onGenerateFiles(() => {
    if (generatedOnce) return;
    generatedOnce = true;
    const cwd = join(__dirname, 'public');
    const files = utils.glob.sync('**/*', {
      cwd,
    });
    const base = join(api.paths.absSrcPath, '../public/plugin-browser');
    utils.mkdirp.sync(base);

    files.forEach(file => {
      const source = join(cwd, file);
      const target = join(base, file);
      if (statSync(source).isDirectory()) {
        utils.mkdirp.sync(target);
      } else {
        copyFileSync(source, target);
      }
    });
  });

  // 默认配置
  api.modifyDefaultConfig(config => {
    if(config.targets.ie === undefined) {
      config.targets.ie = 11;
    }
    return config;
  });

  api.addHTMLHeadScripts(() => {
    return [
      {
        src: api.config.publicPath + 'plugin-browser/browser.js',
      },
      {
        src: api.config.publicPath + 'plugin-browser/index.js',
        id: 'plugin-bowser-script',
        public: api.config.publicPath,
        ...api.config.targets
      },
    ];
  });
}