# Json Bookmarks

![json-bookmarks](https://user-images.githubusercontent.com/31454564/147612138-4c9d6bb4-49d3-41ae-bed0-274a23d21c66.png)

This add-on uses a simple json file format for exporting and importing bookmarks
in Firefox and Chrome. This makes it easy to sync bookmarks offline between
browsers, share subset of your bookmarks with others or backup in a git repository.

## Install

* Firefox: <https://addons.mozilla.org/en-US/firefox/addon/json-bookmarks/>.
* Chrome: <https://chromewebstore.google.com/detail/json-bookmarks/nalfimhmhafapgfcmajjjgeohmcnlfeh>

## Format

Chrome and Firefox uses different names for the built-in bookmarks root folders.
The bookmarks file format handles this by:

* Substituting __"Bookmarks Toolbar"__ in Mozilla Firefox and __"Bookmarks bar"__ in Chrome
  with `${BOOKMARKS_BAR}`.
* Substituting __"Bookmarks Menu"__ in Mozilla Firefox and __"Other bookmarks"__ in Chrome
  with `${BOOKMARKS_MENU}`.

## Build and develop

1. Install third party libraries with `tools/install_third_party`.
2. Load the extension locally from Mozilla Firefox:
   `about:debugging#/runtime/this-firefox` and from
   Chrome: `chrome://extensions/`.
3. Package with `tools/package`.
4. Distribute for Mozilla <https://addons.mozilla.org> and for Chrome:
   <https://chrome.google.com/webstore/devconsole>.
