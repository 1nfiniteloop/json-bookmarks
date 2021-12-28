import { BookmarkTree } from "./BookmarkTree.js";

export class BookmarkTreeExport
{
  #tree = new BookmarkTree();
  #elementRoot = null;
  #bookmarkTree = null;

  setElementRoot(elementRootNode)
  {
    this.#elementRoot = elementRootNode;
  }

  setBookmarkTree(bookmarkTree)
  {
    this.#bookmarkTree = bookmarkTree;
  }

  render()
  {
    let root = document.createElement("ul");
    let tree = this.#walkTree(this.#bookmarkTree);
    tree.querySelector("span").innerText = "/";     // root node has no tile
    root.appendChild(tree);
    this.#elementRoot.appendChild(root);
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

  #walkTree(bookmark)
  {
    let listItem = null;
    if (this.#isExportableNode(bookmark))
    {
      listItem = this.#tree.createListItem(
        bookmark.title,
        bookmark.id);
      if (bookmark.children)
      {
        let children = document.createElement("ul");
        for (let child of bookmark.children)
        {
          let childNode = this.#walkTree(child);
          if (childNode)
          {
            children.appendChild(childNode);
          }
        }
        listItem.appendChild(children);
      }
    }
    return listItem;
  }

  // Ignore empty folders and horizontal lines. Note that root node has children
  // but no title.
  #isExportableNode(bookmark)
  {
    return bookmark.children || bookmark.title;
  }
}