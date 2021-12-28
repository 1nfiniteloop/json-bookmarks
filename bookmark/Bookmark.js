export class Bookmark
{
  #title = "";
  #url = "";
  #path = [];

  constructor(title, url, path)
  {
    this.#title = title;
    this.#url = url;
    this.#path = path;
  }

  get title()
  {
    return this.#title;
  }

  get url()
  {
    return this.#url;
  }

  get path()
  {
    return this.#path;
  }
}
