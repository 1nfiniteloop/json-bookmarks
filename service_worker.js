// Entrypoint for extension in Chrome which only supports service workers in
// manifest version 3.
import "./third_party/browser-polyfill.min.js";

browser.action.onClicked.addListener((tab) => {
  browser.tabs.create({ url: "bookmarks.html" });
});
