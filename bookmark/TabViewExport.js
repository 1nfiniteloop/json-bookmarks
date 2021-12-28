import { BookmarkExporter } from "./BookmarkExporter.js";
import { BookmarkTreeExport } from "./BookmarkTreeExport.js";
import { BookmarkFile } from "./BookmarkFile.js";
import { BookmarkFormatterV2 } from "./BookmarkFormatterV2.js";

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
      exporter.setBookmarkTree(this.#bookmarkTree)
      exporter.setSelection(this.#tree.getSelectedBookmarksId());
      let formatter = new BookmarkFormatterV2();
      let bookmarks = formatter.write(exporter.export());
      let fileWriter = new BookmarkFile();
      fileWriter.setVersion(formatter.getVersion());
      fileWriter.setBookmarks(bookmarks);
      fileWriter.save();
    }
  }
}