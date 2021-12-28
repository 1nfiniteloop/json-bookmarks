// Global
var BROWSER_VENDOR = "undefined";

if (typeof chrome !== "undefined")
{
  if (typeof browser !== "undefined")
  {
    BROWSER_VENDOR = "Firefox";
  }
  else
  {
    BROWSER_VENDOR = "Chrome";
  }
}
