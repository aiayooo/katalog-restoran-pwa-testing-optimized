const assert = require('assert');

Feature('Unliking Restaurants');

Before(({ I }) => {
  I.amOnPage('/#/like');
});

Scenario('showing empty liked restaurant', ({ I }) => {
  I.dontSeeElement('.post-item');
});

Scenario('unliking one restaurant', async ({ I }) => {
  I.dontSeeElement('.post-item');
  I.amOnPage('/');
  I.waitForElement('.post-item');
  I.seeElement('.post-item_title a');

  const firstRestaurant = locate('.post-item_title a').first();
  const firstRestaurantTitle = await I.grabTextFrom(firstRestaurant);
  I.click(firstRestaurant);

  I.waitForElement('#likeButton');
  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/like');
  I.seeElement('.post-item');
  const likedRestaurantTitle = await I.grabTextFrom('.post-item_title a');

  assert.strictEqual(firstRestaurantTitle, likedRestaurantTitle);

  I.seeElement('.post-item_title a');
  await I.grabTextFrom(firstRestaurant);
  I.click(firstRestaurant);

  I.waitForElement('#likeButton');
  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/like');
  I.dontSeeElement('.post-item');
});
