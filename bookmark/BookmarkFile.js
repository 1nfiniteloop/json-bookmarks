export class BookmarkFile
{
  #version = "0";
  #bookmarks = [];

  getVersion()
  {
    return this.#version;
  }

  setVersion(version)
  {
    this.#version = version;
  }

  getBookmarks()
  {
    return this.#bookmarks;
  }

  setBookmarks(bookmarks)
  {
    this.#bookmarks = bookmarks;
  }

  save()
  {
    const filename = `bookmarks.v${this.#version}.json`;
    let blob = new Blob([this.#fmtJson(this.#bookmarks)], { type: "text/plain;charset=utf-8" });
    saveAs(blob, filename);   // from "third_party/FileSaver.js", import as module not available.
  }

  #fmtJson(bookmarks)
  {
    let fmt = {
      version: this.#version,
      reference: "https://github.com/1nfiniteloop/json-bookmarks",
      bookmarks: bookmarks
    };
    const indent = 2;
    const replacer = null;
    return JSON.stringify(fmt, replacer, indent);
  }

  async load()
  {
    let file = await this.#openFileDialog();
    let text = await file.text();
    const importedData = JSON.parse(text);
    this.#version = importedData.version;
    this.#bookmarks = importedData.bookmarks;
  }

  #openFileDialog()
  {
    // Note: promise won't resolve if user press cancel in file chooser dialog,
    // i.e. this execution path will get stuck for ever.
    return new Promise((resolve) =>
    {
      const input = document.createElement('input');
      input.type = 'file';
      input.addEventListener('change', () =>
      {
        resolve(input.files[0]);
      });
      input.click();
    });
  }
}