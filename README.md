# Json Bookmarks

![json-bookmarks](https://user-images.githubusercontent.com/31454564/147612138-4c9d6bb4-49d3-41ae-bed0-274a23d21c66.png)

This add-on exports and imports bookmarks with a json formatted file for:

* Easily share bookmarks between each other using a simple file.
* Store bookmarks in a simple readable file format, example in a git repository.
* Sync bookmarks between Chrome & Firefox.

## Install

The add-on is published for Firefox here:
<https://addons.mozilla.org/en-US/firefox/addon/json-bookmarks/>.

The add-on also works for Chrome but is not yet published on Chrome Web Store.
Thus, install from locally until further:

1. Download latest release from
   <https://github.com/1nfiniteloop/json-bookmarks/releases>.
2. Unpack in any folder, example create
   `<profile_path>/Extensions Local/json-bookmarks`, where your profile path
   can be obtained from `chrome://version/`.
3. Install locally from `chrome://extensions/` -> Toggle "Developer mode" ->
   "Load unpacked".

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
4. Distribute for Mozilla
  <https://extensionworkshop.com/documentation/publish/package-your-extension/>
  and for Chrome <https://developer.chrome.com/docs/webstore/publish/>.
