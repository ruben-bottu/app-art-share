import { module, test } from 'qunit';
import { setupTest } from 'frontend/tests/helpers';

module('Unit | Controller | artworks/new', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    let controller = this.owner.lookup('controller:artworks/new');
    assert.ok(controller);
  });
});
