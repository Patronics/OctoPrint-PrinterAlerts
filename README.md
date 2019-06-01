# OctoPrint-PrinterAlerts

Octoprint plugin to use OctoPrint's built in alerting system to notify users about "Printer Waiting for user" messages.

Note: this plugin might NOT work with files on the SD card. (Untested)

![screenshot](screenshot.png)

![screenshot](settings.png)


### Setup

Install via the bundled Plugin Manager or manually using this URL:

https://github.com/Patronics/OctoPrint-PrinterAlerts/archive/master.zip

### Changelog



* Version 0.1.0 In development as of 6/1/2019
   * Initial version modified from M117PopUp to PrinterAlerts. Implemented minimum functionality (no settings yet)

* Version 0.0.6.0 released 12/24/2016
  * updated configuration model from the deprecated 3 tuple method.

* Version 0.0.5.0 released 09/25/2016
  * added settings interface
  * new settings
    * Message Type: [type](https://sciactive.com/pnotify/#demos-simple) to be used for PNotify parameters.
    * Auto Close: if enabled pop up will disappear after a period of time.

Thanks to jneilliii for the M117PopUp plugin this was heavily based on, you can access it at https://github.com/jneilliii/OctoPrint-M117PopUp/
