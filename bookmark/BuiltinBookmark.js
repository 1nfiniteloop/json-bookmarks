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
    this.#createMappingFor(
      await this.#getBookmarkNameFrom(this.#getNodeIdForBookmarksBar()),
      "${BOOKMARKS_BAR}");
    this.#createMappingFor(
      await this.#getBookmarkNameFrom(this.#getNodeIdForBookmarksMenu()),
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

  #getNodeIdForBookmarksBar()
  {
    if (BROWSER_VENDOR == BROWSER_FIREFOX)
    {
      return "toolbar_____";
    }
    else if (BROWSER_VENDOR == BROWSER_CHROME)
    {
      return "1";
    }
    else
    {
      throw `Unsupported browser vendor: ${BROWSER_VENDOR}`
    }
  }

  #getNodeIdForBookmarksMenu()
  {
    if (BROWSER_VENDOR == BROWSER_FIREFOX)
    {
      return "menu________";
    }
    else if (BROWSER_VENDOR == BROWSER_CHROME)
    {
      return "2";
    }
    else
    {
      throw `Unsupported browser vendor: ${BROWSER_VENDOR}`;
    }
  }
}