# Change Log

## [v0.10.0](https://github.com/emberjs/ember-mocha/tree/v0.10.0) (2016-11-29)
[Full Changelog](https://github.com/emberjs/ember-mocha/compare/v0.9.4...v0.10.0)

**Merged pull requests:**

- Update "ember-test-helpers" to v0.6.0-beta.1 [\#114](https://github.com/emberjs/ember-mocha/pull/114) ([Turbo87](https://github.com/Turbo87))
- Remove "chai" vendor shim [\#109](https://github.com/emberjs/ember-mocha/pull/109) ([Turbo87](https://github.com/Turbo87))

## [v0.9.4](https://github.com/emberjs/ember-mocha/tree/v0.9.4) (2016-11-27)
[Full Changelog](https://github.com/emberjs/ember-mocha/compare/v0.9.3...v0.9.4)

**Implemented enhancements:**

- CI: Publish tags for NPM and Bower automatically [\#99](https://github.com/emberjs/ember-mocha/issues/99)
- CI: Publish tags to NPM [\#105](https://github.com/emberjs/ember-mocha/pull/105) ([Turbo87](https://github.com/Turbo87))

**Fixed bugs:**

- Fix broken context cleanup [\#111](https://github.com/emberjs/ember-mocha/pull/111) ([Turbo87](https://github.com/Turbo87))
- Context is not being reset between test runs [\#110](https://github.com/emberjs/ember-mocha/issues/110)
- Export new test setup functions as globals [\#102](https://github.com/emberjs/ember-mocha/pull/102) ([Turbo87](https://github.com/Turbo87))

## [v0.9.3](https://github.com/emberjs/ember-mocha/tree/v0.9.3) (2016-11-23)
[Full Changelog](https://github.com/emberjs/ember-mocha/compare/v0.9.2...v0.9.3)

**Implemented enhancements:**

- mocha-module: Add upgrade guide URL to the deprecation message [\#108](https://github.com/emberjs/ember-mocha/pull/108) ([Turbo87](https://github.com/Turbo87))
- package.json: Add "files" section [\#107](https://github.com/emberjs/ember-mocha/pull/107) ([Turbo87](https://github.com/Turbo87))

## [v0.9.2](https://github.com/emberjs/ember-mocha/tree/v0.9.2) (2016-11-23)
[Full Changelog](https://github.com/emberjs/ember-mocha/compare/v0.9.1...v0.9.2)

**Implemented enhancements:**

- Add "Upgrade Guide" to the README [\#106](https://github.com/emberjs/ember-mocha/pull/106) ([Turbo87](https://github.com/Turbo87))
- CI: Publish releases to "ember-mocha-builds" repo [\#100](https://github.com/emberjs/ember-mocha/pull/100) ([Turbo87](https://github.com/Turbo87))

**Fixed bugs:**

- Write upgrade guide for old test helpers [\#104](https://github.com/emberjs/ember-mocha/issues/104)
- Release instructions aka. "ember-mocha-builds" repository needs an update [\#95](https://github.com/emberjs/ember-mocha/issues/95)
- Trouble with visit + andThen in acceptance [\#77](https://github.com/emberjs/ember-mocha/issues/77)
- Using ember-mocha without Ember Data [\#49](https://github.com/emberjs/ember-mocha/issues/49)
- Fix tests by using the ESLint nodes correctly [\#101](https://github.com/emberjs/ember-mocha/pull/101) ([Turbo87](https://github.com/Turbo87))

**Closed issues:**

- Enable TravisCI [\#98](https://github.com/emberjs/ember-mocha/issues/98)
- Add repository information to package.json [\#93](https://github.com/emberjs/ember-mocha/issues/93)
- "set" method undefined when using needs [\#61](https://github.com/emberjs/ember-mocha/issues/61)
- Setting test reporter [\#37](https://github.com/emberjs/ember-mocha/issues/37)
- Set 'timeout' globally? [\#28](https://github.com/emberjs/ember-mocha/issues/28)
- consider deprecating callbacks [\#14](https://github.com/emberjs/ember-mocha/issues/14)

**Merged pull requests:**

- Update README [\#97](https://github.com/emberjs/ember-mocha/pull/97) ([Turbo87](https://github.com/Turbo87))
- Update CHANGELOG [\#96](https://github.com/emberjs/ember-mocha/pull/96) ([Turbo87](https://github.com/Turbo87))
- Cleanup package.json [\#94](https://github.com/emberjs/ember-mocha/pull/94) ([Turbo87](https://github.com/Turbo87))

## [v0.9.1](https://github.com/emberjs/ember-mocha/tree/v0.9.1) (2016-09-12)
[Full Changelog](https://github.com/emberjs/ember-mocha/compare/v0.9.0...v0.9.1)

**Merged pull requests:**

- Share Mocha's test context in setup-test-factory. [\#91](https://github.com/emberjs/ember-mocha/pull/91) ([dgeb](https://github.com/dgeb))

## [v0.9.0](https://github.com/emberjs/ember-mocha/tree/v0.9.0) (2016-09-12)
[Full Changelog](https://github.com/emberjs/ember-mocha/compare/v0.8.11...v0.9.0)

**Closed issues:**

- Component Integration \(non-block component\) Test Fails in Ember-Engine [\#82](https://github.com/emberjs/ember-mocha/issues/82)
- Accidentally checking in .only [\#80](https://github.com/emberjs/ember-mocha/issues/80)
- Setup Questions [\#74](https://github.com/emberjs/ember-mocha/issues/74)
- You can then choose to include the global \(ember-mocha.js\)  [\#73](https://github.com/emberjs/ember-mocha/issues/73)
- Tests fail with v0.8.9 [\#71](https://github.com/emberjs/ember-mocha/issues/71)
- Unlock Mocha dependency [\#68](https://github.com/emberjs/ember-mocha/issues/68)

**Merged pull requests:**

- Preserve suite context in outer test function [\#90](https://github.com/emberjs/ember-mocha/pull/90) ([dgeb](https://github.com/dgeb))
- Share Mocha's test context. [\#89](https://github.com/emberjs/ember-mocha/pull/89) ([dgeb](https://github.com/dgeb))
- Use predefined ESLint test generator [\#88](https://github.com/emberjs/ember-mocha/pull/88) ([Turbo87](https://github.com/Turbo87))
- Add changelog file [\#86](https://github.com/emberjs/ember-mocha/pull/86) ([Turbo87](https://github.com/Turbo87))
- Replace JSHint with ESLint [\#85](https://github.com/emberjs/ember-mocha/pull/85) ([Turbo87](https://github.com/Turbo87))
- New testing API [\#84](https://github.com/emberjs/ember-mocha/pull/84) ([Turbo87](https://github.com/Turbo87))
- Update NPM dependencies [\#83](https://github.com/emberjs/ember-mocha/pull/83) ([Turbo87](https://github.com/Turbo87))
- Adjust "mocha" dependency to allow 2.3, 2.4, ... releases [\#76](https://github.com/emberjs/ember-mocha/pull/76) ([Turbo87](https://github.com/Turbo87))

## [v0.8.11](https://github.com/emberjs/ember-mocha/tree/v0.8.11) (2016-02-01)
[Full Changelog](https://github.com/emberjs/ember-mocha/compare/v0.8.10...v0.8.11)

## [v0.8.10](https://github.com/emberjs/ember-mocha/tree/v0.8.10) (2016-02-01)
[Full Changelog](https://github.com/emberjs/ember-mocha/compare/v0.8.9...v0.8.10)

**Merged pull requests:**

- Ensure builds of ember-test-helpers are properly transpiled. [\#72](https://github.com/emberjs/ember-mocha/pull/72) ([rwjblue](https://github.com/rwjblue))

## [v0.8.9](https://github.com/emberjs/ember-mocha/tree/v0.8.9) (2016-01-31)
[Full Changelog](https://github.com/emberjs/ember-mocha/compare/v0.8.8...v0.8.9)

**Closed issues:**

- afterEach block in describeComponent [\#67](https://github.com/emberjs/ember-mocha/issues/67)

## [v0.8.8](https://github.com/emberjs/ember-mocha/tree/v0.8.8) (2015-12-07)
[Full Changelog](https://github.com/emberjs/ember-mocha/compare/v0.8.7...v0.8.8)

**Closed issues:**

- v0.8.7 release is actually v0.8.6 [\#66](https://github.com/emberjs/ember-mocha/issues/66)

## [v0.8.7](https://github.com/emberjs/ember-mocha/tree/v0.8.7) (2015-11-10)
[Full Changelog](https://github.com/emberjs/ember-mocha/compare/v0.8.6...v0.8.7)

## [v0.8.6](https://github.com/emberjs/ember-mocha/tree/v0.8.6) (2015-10-27)
[Full Changelog](https://github.com/emberjs/ember-mocha/compare/v0.8.5...v0.8.6)

**Merged pull requests:**

- Expose chai configuration object [\#65](https://github.com/emberjs/ember-mocha/pull/65) ([mupkoo](https://github.com/mupkoo))

## [v0.8.5](https://github.com/emberjs/ember-mocha/tree/v0.8.5) (2015-10-21)
[Full Changelog](https://github.com/emberjs/ember-mocha/compare/v0.8.4...v0.8.5)

**Closed issues:**

- Use new ember-test-helpers release featuring this.register and this.inject.service [\#63](https://github.com/emberjs/ember-mocha/issues/63)

## [v0.8.4](https://github.com/emberjs/ember-mocha/tree/v0.8.4) (2015-10-02)
[Full Changelog](https://github.com/emberjs/ember-mocha/compare/v0.8.3...v0.8.4)

**Merged pull requests:**

- Update ember-test-helers to 0.5.11 [\#62](https://github.com/emberjs/ember-mocha/pull/62) ([mattmcmanus](https://github.com/mattmcmanus))
- Add shim for context [\#59](https://github.com/emberjs/ember-mocha/pull/59) ([SaladFork](https://github.com/SaladFork))

## [v0.8.3](https://github.com/emberjs/ember-mocha/tree/v0.8.3) (2015-09-13)
[Full Changelog](https://github.com/emberjs/ember-mocha/compare/v0.8.2...v0.8.3)

**Closed issues:**

- ember-test-helpers 0.5.9 [\#56](https://github.com/emberjs/ember-mocha/issues/56)

**Merged pull requests:**

- Update minimum version of ember-test-helpers. [\#58](https://github.com/emberjs/ember-mocha/pull/58) ([rwjblue](https://github.com/rwjblue))
- Make `beforeEach` and `afterEach` use Ember.run [\#57](https://github.com/emberjs/ember-mocha/pull/57) ([cowboyd](https://github.com/cowboyd))

## [v0.8.2](https://github.com/emberjs/ember-mocha/tree/v0.8.2) (2015-08-28)
[Full Changelog](https://github.com/emberjs/ember-mocha/compare/v0.8.1...v0.8.2)

**Merged pull requests:**

- Update ember-test-helpers minimum version. [\#55](https://github.com/emberjs/ember-mocha/pull/55) ([rwjblue](https://github.com/rwjblue))

## [v0.8.1](https://github.com/emberjs/ember-mocha/tree/v0.8.1) (2015-08-13)
[Full Changelog](https://github.com/emberjs/ember-mocha/compare/v0.8.0...v0.8.1)

**Closed issues:**

- Issues with async code [\#53](https://github.com/emberjs/ember-mocha/issues/53)
- \[Question\] Does a test module provide access to the container? [\#50](https://github.com/emberjs/ember-mocha/issues/50)
- Update to ember-test-helpers 0.5.2. [\#46](https://github.com/emberjs/ember-mocha/issues/46)
- Consider sync with ember-test-helpers [\#42](https://github.com/emberjs/ember-mocha/issues/42)
- Context [\#40](https://github.com/emberjs/ember-mocha/issues/40)
- Test failures report `\[object Object\]` rather than error message [\#24](https://github.com/emberjs/ember-mocha/issues/24)

**Merged pull requests:**

- remove resetViews from 'it' [\#48](https://github.com/emberjs/ember-mocha/pull/48) ([jeffreybiles](https://github.com/jeffreybiles))
- Update ember test helpers for Ember 2.0.0-beta.3. [\#47](https://github.com/emberjs/ember-mocha/pull/47) ([Robdel12](https://github.com/Robdel12))
- Remove usage of deprecated `Ember.keys` [\#45](https://github.com/emberjs/ember-mocha/pull/45) ([tstirrat](https://github.com/tstirrat))
- Update ember-test-helpers [\#43](https://github.com/emberjs/ember-mocha/pull/43) ([sly7-7](https://github.com/sly7-7))

## [v0.8.0](https://github.com/emberjs/ember-mocha/tree/v0.8.0) (2015-06-19)
[Full Changelog](https://github.com/emberjs/ember-mocha/compare/v0.7.0...v0.8.0)

**Closed issues:**

- Minor version bump, please. [\#36](https://github.com/emberjs/ember-mocha/issues/36)
- acceptance testing window like qunit [\#33](https://github.com/emberjs/ember-mocha/issues/33)
- Add integration test module [\#26](https://github.com/emberjs/ember-mocha/issues/26)

**Merged pull requests:**

- Update ember-test-helpers to 0.5.0. [\#39](https://github.com/emberjs/ember-mocha/pull/39) ([eriktrom](https://github.com/eriktrom))

## [v0.7.0](https://github.com/emberjs/ember-mocha/tree/v0.7.0) (2015-05-14)
[Full Changelog](https://github.com/emberjs/ember-mocha/compare/v0.6.3...v0.7.0)

## [v0.6.3](https://github.com/emberjs/ember-mocha/tree/v0.6.3) (2015-05-13)
[Full Changelog](https://github.com/emberjs/ember-mocha/compare/v0.6.2...v0.6.3)

**Merged pull requests:**

- Bump ember-test-helpers, mocha, and chai [\#35](https://github.com/emberjs/ember-mocha/pull/35) ([dgeb](https://github.com/dgeb))

## [v0.6.2](https://github.com/emberjs/ember-mocha/tree/v0.6.2) (2015-04-04)
[Full Changelog](https://github.com/emberjs/ember-mocha/compare/v0.6.1...v0.6.2)

## [v0.6.1](https://github.com/emberjs/ember-mocha/tree/v0.6.1) (2015-04-04)
[Full Changelog](https://github.com/emberjs/ember-mocha/compare/v0.6.0...v0.6.1)

**Closed issues:**

- Publish 0.6.0 on NPM [\#30](https://github.com/emberjs/ember-mocha/issues/30)

**Merged pull requests:**

- Update to use newer ember-mocha-adapter [\#32](https://github.com/emberjs/ember-mocha/pull/32) ([ef4](https://github.com/ef4))

## [v0.6.0](https://github.com/emberjs/ember-mocha/tree/v0.6.0) (2015-03-25)
[Full Changelog](https://github.com/emberjs/ember-mocha/compare/v0.5.2...v0.6.0)

**Merged pull requests:**

- Update ember-test-helpers [\#29](https://github.com/emberjs/ember-mocha/pull/29) ([dfreeman](https://github.com/dfreeman))
- Expose Chai helpers for custom assertions [\#27](https://github.com/emberjs/ember-mocha/pull/27) ([dfreeman](https://github.com/dfreeman))

## [v0.5.2](https://github.com/emberjs/ember-mocha/tree/v0.5.2) (2015-03-11)
[Full Changelog](https://github.com/emberjs/ember-mocha/compare/v0.5.1...v0.5.2)

**Closed issues:**

- Ember testing helpers not found [\#25](https://github.com/emberjs/ember-mocha/issues/25)

## [v0.5.1](https://github.com/emberjs/ember-mocha/tree/v0.5.1) (2015-02-22)
[Full Changelog](https://github.com/emberjs/ember-mocha/compare/v0.5.0...v0.5.1)

## [v0.5.0](https://github.com/emberjs/ember-mocha/tree/v0.5.0) (2015-02-22)
[Full Changelog](https://github.com/emberjs/ember-mocha/compare/v0.4.4...v0.5.0)

## [v0.4.4](https://github.com/emberjs/ember-mocha/tree/v0.4.4) (2015-02-22)
[Full Changelog](https://github.com/emberjs/ember-mocha/compare/v0.4.3...v0.4.4)

**Closed issues:**

- Provide a `mocha` module shim. [\#22](https://github.com/emberjs/ember-mocha/issues/22)

**Merged pull requests:**

- Add chai and mocha ES6 shims. [\#23](https://github.com/emberjs/ember-mocha/pull/23) ([rwjblue](https://github.com/rwjblue))

## [v0.4.3](https://github.com/emberjs/ember-mocha/tree/v0.4.3) (2015-02-19)
[Full Changelog](https://github.com/emberjs/ember-mocha/compare/v0.4.2...v0.4.3)

**Closed issues:**

- Overwriting application to use DS.FixtureAdapter in start-app.js [\#21](https://github.com/emberjs/ember-mocha/issues/21)

## [v0.4.2](https://github.com/emberjs/ember-mocha/tree/v0.4.2) (2015-02-10)
[Full Changelog](https://github.com/emberjs/ember-mocha/compare/v0.4.1...v0.4.2)

## [v0.4.1](https://github.com/emberjs/ember-mocha/tree/v0.4.1) (2015-02-08)
[Full Changelog](https://github.com/emberjs/ember-mocha/compare/v0.4.0...v0.4.1)

**Merged pull requests:**

- Switch from broccoli-cli to ember-cli. [\#20](https://github.com/emberjs/ember-mocha/pull/20) ([dgeb](https://github.com/dgeb))
- Upgrade ember to 1.10.0 and remove handlebars. [\#19](https://github.com/emberjs/ember-mocha/pull/19) ([dgeb](https://github.com/dgeb))
- Use git-repo-version instead of git-repo-info directly. [\#18](https://github.com/emberjs/ember-mocha/pull/18) ([dgeb](https://github.com/dgeb))
- Fixed broken test [\#17](https://github.com/emberjs/ember-mocha/pull/17) ([johanneswuerbach](https://github.com/johanneswuerbach))
- ensure that context is preserved in setup/teardown [\#16](https://github.com/emberjs/ember-mocha/pull/16) ([cowboyd](https://github.com/cowboyd))
- allow .skip and .only on top level modules. [\#15](https://github.com/emberjs/ember-mocha/pull/15) ([cowboyd](https://github.com/cowboyd))

## [v0.4.0](https://github.com/emberjs/ember-mocha/tree/v0.4.0) (2015-02-01)
[Full Changelog](https://github.com/emberjs/ember-mocha/compare/v0.3.0...v0.4.0)

## [v0.3.0](https://github.com/emberjs/ember-mocha/tree/v0.3.0) (2015-01-25)
[Full Changelog](https://github.com/emberjs/ember-mocha/compare/v0.2.2...v0.3.0)

## [v0.2.2](https://github.com/emberjs/ember-mocha/tree/v0.2.2) (2015-01-25)
[Full Changelog](https://github.com/emberjs/ember-mocha/compare/v0.2.1...v0.2.2)

**Closed issues:**

- testing non-container objects [\#10](https://github.com/emberjs/ember-mocha/issues/10)

**Merged pull requests:**

- Add broccoli-cli for running tests [\#12](https://github.com/emberjs/ember-mocha/pull/12) ([backspace](https://github.com/backspace))

## [v0.2.1](https://github.com/emberjs/ember-mocha/tree/v0.2.1) (2014-12-12)
[Full Changelog](https://github.com/emberjs/ember-mocha/compare/v0.1.4...v0.2.1)

**Closed issues:**

- Model test `needs` block is too needy? [\#8](https://github.com/emberjs/ember-mocha/issues/8)

**Merged pull requests:**

- toString method of wrapper of it should forward to callback.toString ins... [\#9](https://github.com/emberjs/ember-mocha/pull/9) ([lyonlai](https://github.com/lyonlai))

## [v0.1.4](https://github.com/emberjs/ember-mocha/tree/v0.1.4) (2014-11-26)
[Full Changelog](https://github.com/emberjs/ember-mocha/compare/v0.1.3...v0.1.4)

## [v0.1.3](https://github.com/emberjs/ember-mocha/tree/v0.1.3) (2014-11-26)
[Full Changelog](https://github.com/emberjs/ember-mocha/compare/v0.1.2...v0.1.3)

**Merged pull requests:**

- Add mocha to generated bower.json. [\#7](https://github.com/emberjs/ember-mocha/pull/7) ([rwjblue](https://github.com/rwjblue))

## [v0.1.2](https://github.com/emberjs/ember-mocha/tree/v0.1.2) (2014-11-26)
[Full Changelog](https://github.com/emberjs/ember-mocha/compare/v0.1.1...v0.1.2)

**Merged pull requests:**

- preserve mocha test context in both setup and assertion blocks [\#6](https://github.com/emberjs/ember-mocha/pull/6) ([cowboyd](https://github.com/cowboyd))
- Globalized fixes [\#5](https://github.com/emberjs/ember-mocha/pull/5) ([cowboyd](https://github.com/cowboyd))
- allow `it`, `xit`, `it.skip` and `it.only` forms. [\#4](https://github.com/emberjs/ember-mocha/pull/4) ([cowboyd](https://github.com/cowboyd))
- call to it caused infinite loop in global build [\#2](https://github.com/emberjs/ember-mocha/pull/2) ([cowboyd](https://github.com/cowboyd))

## [v0.1.1](https://github.com/emberjs/ember-mocha/tree/v0.1.1) (2014-11-20)
[Full Changelog](https://github.com/emberjs/ember-mocha/compare/v0.1.0...v0.1.1)

**Closed issues:**

- Getting started guide [\#1](https://github.com/emberjs/ember-mocha/issues/1)

## [v0.1.0](https://github.com/emberjs/ember-mocha/tree/v0.1.0) (2014-11-11)


\* *This Change Log was automatically generated by [github_changelog_generator](https://github.com/skywinder/Github-Changelog-Generator)*
