
export class BookmarkExporter
{
  #bookmarkTree;
  #fileWriter;
  #selection = new Set();

  setBookmarkTree(bookmarkTree)
  {
    this.#bookmarkTree = bookmarkTree;
  }

  setSelection(selection)
  {
    this.#selection = selection;
  }

  setFileWriter(fileWriter)
  {
    this.#fileWriter = fileWriter;
  }

  export()
  {
    this.#fileWriter.setBookmarks(
        this.#getBookmarks());
    this.#fileWriter.save();
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
        out.push(this.#fmtJson(bookmark, path));
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

  #fmtJson(bookmark, path)
  {
    return {
      title: bookmark.title,
      url: bookmark.url,
      path: path.join("/")
    }
  }
}
