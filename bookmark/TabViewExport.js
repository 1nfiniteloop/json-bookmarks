import { BookmarkExporter } from "./BookmarkExporter.js";
import { BookmarkTreeExport } from "./BookmarkTreeExport.js";
import { BookmarkFileWriter } from "./BookmarkFileWriter.js";

export class TabViewExport
{
  #tree;
  #bookmarkTree;

  constructor()
  {
    document
      .getElementById("btn-export")
      .addEventListener("click", () => this.#exportBookmarks());
  }

  async onInit()
  {
    console.info("init view: export");
    this.#bookmarkTree = await this.#getBookmarkTree();
    this.#tree = new BookmarkTreeExport();
    this.#tree.setBookmarkTree(this.#bookmarkTree);
    this.#tree.setElementRoot(document.getElementById("export"));
    this.#tree.render();
  }

  async #getBookmarkTree()
  {
    const bookmarks = await browser.bookmarks.getTree();
    return bookmarks[0];
  }

  onExit()
  {
    console.info("exit view: export");
    this.#tree.teardown();
    this.#tree = null;
    this.#bookmarkTree = null;
  }

  #exportBookmarks()
  {
    if (this.#tree && this.#bookmarkTree)
    {
      const exporter = new BookmarkExporter();
      exporter.setFileWriter(new BookmarkFileWriter());
      exporter.setBookmarkTree(this.#bookmarkTree)
      exporter.setSelection(this.#tree.getSelectedBookmarksId());
      exporter.export();
    }
  }
}