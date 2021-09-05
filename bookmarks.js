
import { TabView } from "./bookmark/TabView.js";
import { TabViewImport } from "./bookmark/TabViewImport.js";
import { TabViewExport } from "./bookmark/TabViewExport.js";


class Application
{
  #tabViewImport = new TabView(new TabViewImport());
  #tabViewExport = new TabView(new TabViewExport());

  init()
  {
    this.#tabViewImport.observe(document.getElementById("import"));
    this.#tabViewExport.observe(document.getElementById("export"));
    this.#initDefaultTab();
  }

  #initDefaultTab()
  {
    document.getElementById("export-tab").click();
  }
}

const application = new Application();

document.addEventListener('DOMContentLoaded', function ()
{
  application.init();
});