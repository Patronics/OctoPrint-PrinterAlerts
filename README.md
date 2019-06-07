# OctoPrint-PrinterAlerts

Octoprint plugin to use OctoPrint's built in alerting system to notify users about "Printer Waiting for user" messages.

Note: this plugin might NOT work with files on the SD card. (Untested)

![screenshot](screenshot.png)

![screenshot](settings.png)


### Setup

Install via the bundled Plugin Manager or manually using this URL:

https://github.com/Patronics/OctoPrint-PrinterAlerts/archive/master.zip

### Features
* Will bring up a standard alert in octoprint when the printer is waiting for your input.
* Configurable alert severity, from "Error" and "Warning", to "Info", and "Sucess"
* Set alerts to auto-hide, or to stay on screen
 * Note: For printer like the Prusas that repeatedly give the same message while waiting, I strongly recommend leaving this set to Auto Close.
* Optionally can speak the alerts as well


### Compatibility 
* This plugin was designed to work with the Prusa i3 Mk3s MMU2 3D printer, and will likely work with other Prusa printers as well. 
* It will work with any non-prusa printers that output the same message "echo:busy: paused for user" when waiting for user input
* For other printers that have a different waiting for user message, create an issue on github, and I'll be happy to try to implement it for those messages as well


### Changelog

* Version 0.7.4 Released on 6/2/2019
  * Removed Nonfunctional Test Button

* Version 0.7.3 Released on 6/2/2019
  * First version to be functional and officially released

* Version 0.7.0 In development as of 6/1/2019
   * Initial version modified from M117PopUp to PrinterAlerts. Implemented basic functionality


Thanks to jneilliii for the M117PopUp plugin this was heavily based on, you can access it at https://github.com/jneilliii/OctoPrint-M117PopUp/
