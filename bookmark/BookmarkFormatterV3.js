import { Bookmark } from "./Bookmark.js";
import { BuiltinBookmark } from "./BuiltinBookmark.js";


class PathFormatter
{
  encode(paths)
  {
    return paths.map((path) => path.replace(/\//g, "\\\/")).join("/"); // replace "/" with "\/" in folder names
  }

  decode(url)
  {
    const paths = url.split(/(?<!\\)\//g); // split on "/", but not on escaped slashes "\/" in folder names
    return paths.map((path) => path.replace(/\\\//g, "/")); // replace "\/" with "/"
  }
}


export class BookmarkFormatterV3
{
  #builtinBookmark = new BuiltinBookmark();
  #version = 3;

  async init()
  {
    await this.#builtinBookmark.init();
  }

  read(rawJson)
  {
    let bookmarks = [];
    for (let obj of rawJson)
    {
      let fmt = new PathFormatter();
      let path = fmt.decode(obj["path"]);
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
      let fmt = new PathFormatter();
      rawJson.push({
        title: bookmark.title,
        url: bookmark.url,
        path: fmt.encode(bookmark.path)
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
