export class BookmarkFileWriter
{
  #version = "1";
  #bookmarks = [];

  setBookmarks(bookmarks)
  {
    this.#bookmarks = bookmarks;
  }

  save()
  {
    const filename = "bookmarks.json";
    let blob = new Blob([this.#fmtJson(this.#bookmarks)], { type: "text/plain;charset=utf-8" });
    saveAs(blob, filename);   // from "third_party/FileSaver.js", import as module not available.
  }

  #fmtJson(bookmarks)
  {
    let json = {
      version: this.#version,
      bookmarks: bookmarks
    };
    const indent = 2;
    const replacer = null;
    return JSON.stringify(json, replacer, indent);
  }
}