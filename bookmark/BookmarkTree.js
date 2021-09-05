export class BookmarkTree
{
  getSelectedBookmarksIdFrom(elementTree)
  {
    let selectedItems = new Set();
    for (let adj of elementTree.querySelectorAll("span.selected"))
    {
      if (adj.id)
      {
        selectedItems.add(adj.id);
      }
    }
    return selectedItems;
  }

  createListItem(title, id = null)
  {
    let text = document.createElement("span");
    text.innerText = title;
    text.addEventListener("click", (ev) => this.#onClick(ev));
    if (id != null)
    {
      text.id = id;
    }
    let listItem = document.createElement("li");
    listItem.appendChild(text);
    return listItem;
  }

  #onClick(ev)
  {
    ev.stopPropagation();  // Don't bubble event up to parent elements
    if (ev.currentTarget.classList.contains("selected"))
    {
      this.#unselectRecursive(ev.currentTarget);
    }
    else
    {
      this.#selectRecursive(ev.currentTarget);
    }
  }

  #selectRecursive(element)
  {
    for (let adj of element.parentElement.querySelectorAll("span"))
    {
      adj.classList.add("selected");
    }
  }

  #unselectRecursive(element)
  {
    for (let adj of element.parentElement.querySelectorAll("span"))
    {
      adj.classList.remove("selected");
    }
  }

}