/* jshint node:true */

var execSync = require('child_process').execSync;
var existsSync = require('exists-sync');

function run(command) {
  console.log('running: "' + command + '"');
  var output = execSync(command, { encoding: 'utf8' });
  console.log(output);
}

module.exports = {
  // Publish the new release to NPM after a successful push
  afterPush: function(project, versions) {
    run('ember build');

    if (!existsSync('../ember-mocha-builds')) {
      run('cd .. && git clone git@github.com:switchfly/ember-mocha-builds.git');
    }

    run('cp ./dist/*.* ../ember-mocha-builds/');
    run('cd ../ember-mocha-builds && git add --all');
    run('cd ../ember-mocha-builds && git commit --message="Release ' + versions.next + '"');
    run('cd ../ember-mocha-builds && git tag ' + versions.next);
    run('cd ../ember-mocha-builds && git push origin master --tags');

    run('npm publish');
  }
};
