import { Bookmark } from "./Bookmark.js";

export class BookmarkFormatterV1
{
  #version = 1;

  read(rawJson)
  {
    let bookmarks = [];
    for (let obj of rawJson)
    {
      bookmarks.push(new Bookmark(
        obj["title"],
        obj["url"],
        obj["path"].split("/")));
    }
    return bookmarks;
  }

  write(bookmarks)
  {
    let rawJson = [];
    for (let bookmark of bookmarks)
    {
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
}
