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

  // TODO: ignore empty folders and horizontal lines
  #walkTree(bookmark)
  {
    let listItem = this.#tree.createListItem(
      bookmark.title,
      bookmark.id);
    if (bookmark.children)
    {
      let children = document.createElement("ul");
      for (let child of bookmark.children)
      {
        children.appendChild(this.#walkTree(child));
      }
      listItem.appendChild(children);
    }
    return listItem;
  }
}