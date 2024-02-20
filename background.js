// Entrypoint for extension in Mozilla which only supports background script in
// manifest version 3.
browser.action.onClicked.addListener((tab) => {
  browser.tabs.create({ url: "bookmarks.html" });
});
