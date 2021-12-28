import { BookmarkTree } from "./BookmarkTree.js";

export class BookmarkTreeImport
{
  #tree = new BookmarkTree();
  #elementRoot = null;
  #cachedPaths = {};
  #bookmarks = [];

  setElementRoot(elementRoot)
  {
    this.#elementRoot = elementRoot;
  }

  setBookmarks(bookmarks)
  {
    this.#bookmarks = bookmarks;
  }

  render()
  {
    for (let i = 0; i < this.#bookmarks.length; ++i)
    {
      const bookmark = this.#bookmarks[i];
      const listItem = this.#tree.createListItem(bookmark.title, i);
      const currentFolder = this.#getOrCreatePathCached(bookmark.path)
      currentFolder.appendChild(listItem);
    }
  }

  getSelectedBookmarksId()
  {
    return this.#tree.getSelectedBookmarksIdFrom(this.#elementRoot);
  }

  teardown()
  {
    let bookmarkTree = this.#elementRoot.querySelector("ul");
    if (bookmarkTree)
    {
      bookmarkTree.remove();
    }
  }

  #getOrCreatePathCached(path)
  {
    let key = path.join("/");
    if (key in this.#cachedPaths)
    {
      console.debug("Using cached path: " + path);
      return this.#cachedPaths[key];
    }
    else
    {
      let leafNode = this.#getOrCreatePath(path);
      this.#cachedPaths[key] = leafNode;
      return leafNode;
    }
  }

  #getOrCreatePath(path)
  {
    console.debug("Parsing path: " + path);
    let root = this.#elementRoot.querySelector("ul");
    if (root == null)
    {
      root = document.createElement("ul");
      this.#elementRoot.appendChild(root);
    }
    return this.#getTreeFromPath(root, path);
  }

  #getTreeFromPath(root, path)
  {
    let current = root;  // always "ul"
    for (let folderName of path)
    {
      if (!folderName)   // special case for root.
      {
        folderName = "/";
      }
      let adjacent = this.#tryGetAdjacentFolderOf(current, folderName);
      if (adjacent == null)
      {
        console.debug("Creating folder: " + folderName);

        let listItem = this.#tree.createListItem(folderName);
        adjacent = document.createElement("ul");
        listItem.appendChild(adjacent);
        current.appendChild(listItem);
      }
      current = adjacent;
    }
    return current;
  }

  #tryGetAdjacentFolderOf(element, folderName)
  {
    let folder = null;
    for (let listItem of element.children)
    {
      const text = listItem.querySelector("span");
      if (text.innerText == folderName)
      {
        console.debug("Found folder: " + folderName);
        folder = listItem.querySelector("ul");
        break;
      }
    }
    return folder;
  }
}