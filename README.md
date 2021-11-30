# Json Bookmarks

This add-on exports and imports bookmarks with a json formatted file for:

* Easily share bookmarks between each other using a simple file.
* Store bookmarks in a simple readable file format, example in a git repository.
* Sync bookmarks between Chrome & Firefox.

The add-on is published for Firefox here:
<https://addons.mozilla.org/en-US/firefox/addon/json-bookmarks/>. The add-on
works for Chrome also but is not yet published on Chrome Web Store.

## Format

Chrome and Firefox uses different names for the built-in bookmarks root folders:

* Mozilla Firefox uses folder __"Bookmarks Toolbar"__ while Chrome uses
  __"Bookmarks bar"__.
* Mozilla Firefox uses folder __"Bookmarks Menu"__  while Chrome uses
  __"Other bookmarks"__.

This command can be used to adjust paths from Mozilla Firefox to be compatible
with Chrome:

    sed -r 's|"path": "/Bookmarks Toolbar(.*)"$|"path": "/Bookmarks bar\1"|g; s|"path": "/Bookmarks Menu(.*)"$|"path": "/Other bookmarks\1"|g' \
      bookmarks-mozilla.json > bookmarks-chrome.json

## Build and develop

1. Install third party libraries with `tools/install_third_party`.
2. Load the extension locally from Mozilla Firefox:
   `about:debugging#/runtime/this-firefox` and from
   Chrome: `chrome://extensions/`.
3. Package with `tools/package`.
4. Distribute for Mozilla
  <https://extensionworkshop.com/documentation/publish/package-your-extension/>
  and for Chrome <https://developer.chrome.com/docs/webstore/publish/>.
