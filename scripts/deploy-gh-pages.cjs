'use strict';

/**
 * gh-pages checks out the remote gh-pages branch under node_modules/.cache;
 * deep paths + long filenames can exceed Windows MAX_PATH during checkout.
 * GIT_CONFIG_* applies to all Git child processes for this Node invocation.
 */
process.env.GIT_CONFIG_COUNT = '1';
process.env.GIT_CONFIG_KEY_0 = 'core.longpaths';
process.env.GIT_CONFIG_VALUE_0 = 'true';

const path = require('path');
const ghpages = require('gh-pages');

const buildDir = path.join(__dirname, '..', 'build');

ghpages.publish(buildDir, {}, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log('Published');
});
