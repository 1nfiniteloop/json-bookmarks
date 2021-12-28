import { Bookmark } from "./Bookmark.js";

export class BookmarkFormatterV2
{
  #mapping = {
    "Firefox": {
      "Bookmarks Menu" : "${BOOKMARKS_MENU}",
      "Bookmarks Toolbar": "${BOOKMARKS_BAR}"
    },
    "Chrome": {
      "Other bookmarks" : "${BOOKMARKS_MENU}",
      "Bookmarks bar": "${BOOKMARKS_BAR}",
    }
  };

  #mappingIn = {};
  #mappingOut = {};

  #version = 2;

  constructor()
  {
    const mapping = this.#mapping[BROWSER_VENDOR];
    this.#mappingOut = mapping;
    this.#mappingIn = this.#reverseMappingOf(mapping);
  }

  #reverseMappingOf(mapping)
  {
    let reverse = {};
    for (let key of Object.keys(mapping))
    {
      reverse[mapping[key]] = key;
    }
    return reverse;
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
    let key = path[1];
    path[1] = this.#mappingIn[key];
  }

  #substituteRootNodeIn(path)
  {
    let key = path[1];
    path[1] = this.#mappingOut[key];
  }
}
