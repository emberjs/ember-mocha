/* globals mocha */

(function() {
  mocha.setup('bdd');

  window.addEventListener('DOMContentLoaded', function() {
    let currentLocation = new URL(document.location);
    let params = currentLocation.searchParams;
    if (params.has('container_hidden')) {
      document.querySelector('#hide-container').checked = true;
      document.querySelector('#ember-testing-container').classList.add('hidden');
    }
    if (params.has('container_zoomed')) {
      document.querySelector('#zoom-container').checked = true;
      document.querySelector('#ember-testing-container').classList.add('zoomed');
    }
    document.querySelector('#hide-container').addEventListener('change', ({ target }) => {
      document.querySelector('#ember-testing-container').classList.toggle('hidden');
      if (target.checked) {
        params.set('container_hidden', 'true');
      } else {
        params.delete('container_hidden');
      }
      window.history.replaceState('', document.title, currentLocation.toString())
    });
    document.querySelector('#zoom-container').addEventListener('change', ({ target }) => {
      document.querySelector('#ember-testing-container').classList.toggle('zoomed');
      if (target.checked) {
        params.set('container_zoomed', 'true');
      } else {
        params.delete('container_zoomed');
      }
      window.history.replaceState('', document.title, currentLocation.toString())
    });
  });
})();
