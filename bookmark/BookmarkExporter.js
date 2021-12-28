import { Bookmark } from "./Bookmark.js";

export class BookmarkExporter
{
  #bookmarkTree;
  #selection = new Set();

  setBookmarkTree(bookmarkTree)
  {
    this.#bookmarkTree = bookmarkTree;
  }

  setSelection(selection)
  {
    this.#selection = selection;
  }

  export()
  {
    return this.#getBookmarks();
  }

  #getBookmarks()
  {
    let bookmarks = [];
    if (this.#selection.size)
    {
      this.#walkTree(this.#bookmarkTree, [], bookmarks);
    }
    return bookmarks;
  }

  #walkTree(bookmark, path, out)
  {
    if (bookmark.url && bookmark.title)
    {
      if (this.#selection.has(bookmark.id))
      {
        out.push(new Bookmark(
          bookmark.title,
          bookmark.url,
          Array.from(path)));
      }
    }
    if (bookmark.children)
    {
      path.push(bookmark.title);  // name of current folder
      for (let child of bookmark.children)
      {
        this.#walkTree(child, path, out);
      }
      path.pop();
    }
  }
}
