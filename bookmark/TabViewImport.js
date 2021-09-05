import { BookmarkFileReader } from "./BookmarkFileReader.js";
import { BookmarkImporter } from "./BookmarkImporter.js";
import { BookmarkTreeImport } from "./BookmarkTreeImport.js";

export class TabViewImport
{
  #fileReader;
  #tree;

  constructor()
  {
    document
      .getElementById("btn-import")
      .addEventListener("click", () => this.#importBookmarks());
  }

  async onInit()
  {
    console.info("init view: import");
    this.#fileReader = new BookmarkFileReader();
    try
    {
      await this.#fileReader.openFile();
    }
    catch(err)
    {
      alert(err);
    }
    this.#tree = new BookmarkTreeImport();
    this.#tree.setElementRoot(document.getElementById("import"));
    this.#tree.setBookmarks(this.#fileReader.readContent());
    this.#tree.render();
  }

  onExit()
  {
    console.info("exit view: import");
    this.#tree.teardown();
    this.#tree = null;
    this.#fileReader = null;
  }

  async #importBookmarks()
  {
    const selectedBookmarks = this.#tree.getSelectedBookmarksId();
    const importer = new BookmarkImporter();
    importer.setFileReader(this.#fileReader);
    importer.setSelection(selectedBookmarks);
    try
    {
      await importer.import();
    }
    catch(err)
    {
      alert(err);
    }
  }
}
