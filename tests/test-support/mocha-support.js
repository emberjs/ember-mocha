/**
 * Captures mocha grep options for a. That way you can run describe
 * block or an `it` block that may narrow the mocha test run, but
 * those options will be reset afterwards. E.g.
 *
 *   var grep = grepFor(function() {
 *     it.skip('this is skipped');
 *   })
 *   console.log(grep) //=> /this is skipped/
*/
export function grepFor(fn) {
  var options = window.mocha.options;
  var originalMochaGrep = options.grep;
  try {
    fn();
    return options.grep;
  } finally {
    options.grep = originalMochaGrep;
  }
}
