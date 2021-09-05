# Json Bookmarks

This web extension exports and imports bookmarks in a json formatted file.
The reason I built this extensioin was to support the use cases:

* Backup bookmaks in a simple format, possible to read raw and easily stored in
  a git repository.
* Sync bookmarks between browsers offline.
* Export and import subset of bookmarks as different files.

The extension is ported and compatible with chrome browsers with help of
Mozilla'a official polyfill, see more @
<https://github.com/mozilla/webextension-polyfill>.

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

### Build and develop

1. Install third party libraries with `tools/install_third_party`.
2. Load the extension locally from Mozilla Firefox:
   <about:debugging#/runtime/this-firefox> and from
   Chrome: <chrome://extensions/>.
3. Package with `package_mozilla` and `package_chrome`.
4. Distribute for Mozilla
  <https://extensionworkshop.com/documentation/publish/package-your-extension/>
  and for Chrome <https://developer.chrome.com/docs/webstore/publish/>.
