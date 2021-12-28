import { BookmarkFile } from "./BookmarkFile.js";
import { BookmarkFormatterV1 } from "./BookmarkFormatterV1.js";
import { BookmarkFormatterV2 } from "./BookmarkFormatterV2.js";
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
    this.#fileReader = new BookmarkFile();
    await this.#fileReader.load();
    this.#tree = new BookmarkTreeImport();
    this.#tree.setElementRoot(document.getElementById("import"));
    try
    {
      this.#tree.setBookmarks(this.#getLoadedBookmarks());
    }
    catch(err)
    {
      alert(err);
    }
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
    importer.setSelection(selectedBookmarks);
    try
    {
      await importer.import(this.#getLoadedBookmarks());
    }
    catch(err)
    {
      alert(err);
    }
  }

  #getLoadedBookmarks()
  {
    const version = this.#fileReader.getVersion();
    const formatter = {
      "1": new BookmarkFormatterV1(),
      "2": new BookmarkFormatterV2(),
    };
    if (version in formatter)
    {
      return formatter[version].read(this.#fileReader.getBookmarks());
    }
    else
    {
      let versions = Object.keys(formatter).join(",");
      throw `Supported version(s): ${versions} but chosen file has version: ${version}`;
    }
  }
}
