export class BookmarkImporter
{
  #fileReader;
  #selection;
  #bookmarkTree;
  #cachedLeafNode = {};

  setFileReader(fileReader)
  {
    this.#fileReader = fileReader;
  }

  setSelection(selection)
  {
    this.#selection = selection;
  }

  async import()
  {
    const bookmarks = this.#fileReader.readContent();
    this.#bookmarkTree = await this.#getBookmarkTree();
    for (let i of this.#selection)
    {
      const data = bookmarks[i];
      await this.#tryImportBookmark(data.path, data.title, data.url)
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
      bookmark = await browser.bookmarks.create({
        title: title,
        url: url,
        parentId: folder.id
      });
    }
    else
    {
      console.debug("No import, bookmark already exists: " + title);
    }
  }

  async #getOrCreatePathCached(path)
  {
    if (path in this.#cachedLeafNode)
    {
      console.debug("Using cached path: " + path);
      return this.#cachedLeafNode[path];
    }
    else
    {
      console.debug("Walking tree to find path: " + path);
      const folder = await this.#getOrCreatePath(path);
      this.#cachedLeafNode[path] = folder;
      return folder;
    }
  }

  async #getOrCreatePath(path)
  {
    const index = 1; // skip first array element (which is empty)
    return await this.#walk(
      this.#bookmarkTree,
      path.split("/"),
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
