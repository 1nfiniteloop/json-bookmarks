// Global
const BROWSER_FIREFOX = "Firefox";
const BROWSER_CHROME = "Chrome";
var BROWSER_VENDOR = "undefined";

if (typeof chrome !== "undefined")
{
  if (typeof browser !== "undefined")
  {
    BROWSER_VENDOR = BROWSER_FIREFOX;
  }
  else
  {
    BROWSER_VENDOR = BROWSER_CHROME;
  }
}
