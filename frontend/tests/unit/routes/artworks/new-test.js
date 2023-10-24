import { module, test } from 'qunit';
import { setupTest } from 'frontend/tests/helpers';

module('Unit | Route | artworks/new', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:artworks/new');
    assert.ok(route);
  });
});
