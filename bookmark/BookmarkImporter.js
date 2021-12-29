export class BookmarkImporter
{
  #selection;
  #bookmarkTree;
  #cachedLeafNode = {};
  #statistics;

  constructor()
  {
    this.#statistics = this.#resetStatistics();
  }

  #resetStatistics()
  {
    this.#statistics = {
      newBookmarks: 0,
      existingBookmarks: 0,
    };
  }

  setSelection(selection)
  {
    this.#selection = selection;
  }

  getImportedStatistics()
  {
    return this.#statistics;
  }

  async import(bookmarks)
  {
    this.#resetStatistics();
    this.#bookmarkTree = await this.#getBookmarkTree();
    for (let i of this.#selection)
    {
      const bookmark = bookmarks[i];
      await this.#tryImportBookmark(bookmark.path, bookmark.title, bookmark.url)
    }
  }

  async #getBookmarkTree()
  {
    const bookmarks = await browser.bookmarks.getTree();
    return bookmarks[0];
  }

  async #tryImportBookmark(path, title, url)
  {
    try
    {
      const folder = await this.#getOrCreatePathCached(path);
      await this.#tryCreateBookmarkIn(folder, title, url);
    }
    catch(err)
    {
      throw `Failed to import bookmark: ${err} title: "${title}", path: "${path}"`;
    }
  }

  async #tryCreateBookmarkIn(folder, title, url)
  {
    const children = await browser.bookmarks.getChildren(folder.id);
    let bookmark = children
      .find(child => child.title == title && child.url == url);
    if (!bookmark)
    {
      console.debug("Create new bookmark: " + title);
      ++this.#statistics.newBookmarks;
      bookmark = await browser.bookmarks.create({
        title: title,
        url: url,
        parentId: folder.id
      });
    }
    else
    {
      ++this.#statistics.existingBookmarks;
      console.debug("No import, bookmark already exists: " + title);
    }
  }

  async #getOrCreatePathCached(path)
  {
    const key = path.join("/");
    if (key in this.#cachedLeafNode)
    {
      console.debug("Using cached path: " + path);
      return this.#cachedLeafNode[key];
    }
    else
    {
      console.debug("Walking tree to find path: " + path);
      const folder = await this.#getOrCreatePath(path);
      this.#cachedLeafNode[key] = folder;
      return folder;
    }
  }

  async #getOrCreatePath(path)
  {
    const index = 1; // skip first array element (which is empty)
    return await this.#walk(
      this.#bookmarkTree,
      path,
      index);
  }

  async #walk(parent, path, currentIndex)
  {
    if (currentIndex < path.length)
    {
      const current = await this.#getOrCreateFolder(
        parent,
        path[currentIndex]);
      return await this.#walk(current, path, ++currentIndex);
    }
    else
    {
      return parent;
    }
  }

  async #getOrCreateFolder(parent, title)
  {
    const children = await browser.bookmarks.getChildren(parent.id);
    let folder = children.find(child => child.title == title);
    if (!folder)
    {
      console.debug("Creating new folder: %s", title);
      folder = await browser.bookmarks.create({
        title: title,
        parentId: parent.id
      });
    }
    else
    {
      console.debug("Found existing folder: %s", title);
    }
    return folder;
  }
}
