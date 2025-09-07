/**
 * The two built-in root node's name differs between Firefox and Chrome, and
 * also depend on the system language. In english the names is:
 *
 * - "Bookmarks Toolbar" in Mozilla Firefox and "Bookmarks bar" in Chrome,
 *   which is substituted with "${BOOKMARKS_BAR}".
 * - "Bookmarks Menu" in Mozilla Firefox and "Other bookmarks" in Chrome,
 *   which is substituted with "${BOOKMARKS_MENU}".
 */
export class BuiltinBookmark
{
  #mapping = {};
  #mappingReverse = {};

  async init()
  {
    const bookmarksBarNodeId = await this.#getNodeIdForBookmarksBar()

    this.#createMappingFor(
        await this.#getBookmarkNameFrom(bookmarksBarNodeId),
        "${BOOKMARKS_BAR}");

    const bookmarksMenuNodeId = await this.#getNodeIdForBookmarksMenu()

    this.#createMappingFor(
        await this.#getBookmarkNameFrom(bookmarksMenuNodeId),
        "${BOOKMARKS_MENU}");
  }

  substitute(name)
  {
    return this.#mapping[name];
  }

  expand(substitutedName)
  {
    return this.#mappingReverse[substitutedName];
  }

  #createMappingFor(name, substitutedName)
  {
    console.debug(`Create mapping for \"${name}\" : ${substitutedName}`);
    this.#mapping[name] = substitutedName;
    this.#mappingReverse[substitutedName] = name;
  }

  async #getBookmarkNameFrom(id)
  {
    const bookmarkNode = await browser.bookmarks.get(id);
    if (bookmarkNode.length == 1)
    {
      return bookmarkNode[0].title;
    }
    else
    {
      throw `Failed to find bookmark root node with id: ${id}`;
    }
  }

  async #getNodeIdForBookmarksBar()
  {
    if (BROWSER_VENDOR == BROWSER_FIREFOX)
    {
      return "toolbar_____";
    }
    else if (BROWSER_VENDOR == BROWSER_CHROME)
    {
      return this.#getChromeSpecialFolderId('bookmarks-bar')
    }
    else
    {
      throw `Unsupported browser vendor: ${BROWSER_VENDOR}`
    }
  }

  async #getNodeIdForBookmarksMenu()
  {
    if (BROWSER_VENDOR == BROWSER_FIREFOX)
    {
      return "menu________";
    }
    else if (BROWSER_VENDOR == BROWSER_CHROME)
    {
      return this.#getChromeSpecialFolderId('other')
    }
    else
    {
      throw `Unsupported browser vendor: ${BROWSER_VENDOR}`;
    }
  }

  /**
   * Returns node id for special folders in Chrome.
   * @param {('bookmarks-bar'|'managed'|'mobile'|'other')} folderType
   * @returns {Promise<*>}
   */
  async #getChromeSpecialFolderId(folderType)
  {
    const bookmarks = await browser.bookmarks.getTree();
    const otherBookmarks = bookmarks[0].children.find(i => i.folderType === folderType)

    return otherBookmarks.id
  }
}