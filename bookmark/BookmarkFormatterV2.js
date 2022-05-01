import { Bookmark } from "./Bookmark.js";
import { BuiltinBookmark } from "./BuiltinBookmark.js";

export class BookmarkFormatterV2
{
  #builtinBookmark = new BuiltinBookmark();
  #version = 2;

  async init()
  {
    await this.#builtinBookmark.init();
  }

  read(rawJson)
  {
    let bookmarks = [];
    for (let obj of rawJson)
    {
      let path = obj["path"].split("/");
      this.#expandRootNodeIn(path);
      bookmarks.push(new Bookmark(
        obj["title"],
        obj["url"],
        path));
    }
    return bookmarks;
  }

  write(bookmarks)
  {
    let rawJson = [];
    for (let bookmark of bookmarks)
    {
      this.#substituteRootNodeIn(bookmark.path);
      rawJson.push({
        title: bookmark.title,
        url: bookmark.url,
        path: bookmark.path.join("/")
      });
    }
    return rawJson;
  }

  getVersion()
  {
    return this.#version;
  }

  #expandRootNodeIn(path)
  {
    path[1] = this.#builtinBookmark.expand(path[1]);
  }

  #substituteRootNodeIn(path)
  {
    path[1] = this.#builtinBookmark.substitute(path[1]);
  }
}
