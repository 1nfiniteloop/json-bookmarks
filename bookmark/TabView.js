export class TabView
{
  #tabView;
  #observer;

  constructor(tabView)
  {
    this.#tabView = tabView;
  }

  observe(node)
  {
    const config = {
      attributeFilter: ["class"],
      attributeOldValue: true
    }
    this.#observer = new MutationObserver((mutationList) =>
    {
      mutationList.forEach((mutation) => { this.#onAttributeChange(mutation) })
    });
    this.#observer.observe(node, config);
  }

  #onAttributeChange(mutation)
  {
    if (mutation.attributeName == "class")
    {
      if (this.#isActivated(mutation))
      {
        this.#tabView.onInit();
      }
      else if (this.#isDeactivated(mutation))
      {
        this.#tabView.onExit();
      }
      else
      {
        // some other class was removed or added.
      }
    }
  }

  #isActivated(mutation)
  {
    return mutation.target.classList.contains("active")
      && !mutation.oldValue.includes("active")
  }

  #isDeactivated(mutation)
  {
    return !mutation.target.classList.contains("active")
      && mutation.oldValue.includes("active");
  }
}
