export class BookmarkFileReader
{
  #importedData = { bookmarks: [] };
  #version = "1";

  async openFile()
  {
    this.#importedData = await this.#openFile();
    if (this.#importedData.version != this.#version)
    {
      throw `Version: ${this.#version} required but file has: ${this.#importedData.version}`
    }
  }

  readContent()
  {
    return this.#importedData.bookmarks;
  }

  async #openFile()
  {
    let file = await this.#openFileDialog();
    let text = await file.text();
    return JSON.parse(text);
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