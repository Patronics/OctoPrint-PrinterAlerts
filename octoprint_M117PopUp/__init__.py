# coding=utf-8

import octoprint.plugin
import re

class PrinterAlerts(octoprint.plugin.AssetPlugin,
				octoprint.plugin.TemplatePlugin,
                octoprint.plugin.SettingsPlugin):
				
	def AlertWaitingForUser(self, comm, line, *args, **kwargs):
		if "echo:busy: paused for user" in line:
			self._plugin_manager.send_plugin_message(self._identifier, dict(type="popup", msg="Printer Paused for User"))
			return
	
	##-- AssetPlugin hooks
	#def get_assets(self):
	#	return dict(js=["js/M117PopUp.js"])
		
	##-- Settings hooks
	#def get_settings_defaults(self):
	#	return dict(msgType="info",autoClose=True,enableSpeech=False,speechVoice="",speechVolume=1,speechPitch=1,speechRate=1)	
	
	##-- Template hooks
	#def get_template_configs(self):
	#	return [dict(type="settings",custom_bindings=True)]
		
	##~~ Softwareupdate hook
	def get_version(self):
		return self._plugin_version
		
	def get_update_information(self):
		return dict(
			PrinterAlerts=dict(
				displayName="PrinterAlerts",
				displayVersion=self._plugin_version,

				# version check: github repository
				type="github_release",
				user="Patronics",
				repo="OctoPrint-PrinterAlerts",
				current=self._plugin_version,

				# update method: pip
				pip="https://github.com/Patronics/OctoPrint-PrinterAlerts/archive/{target_version}.zip"
			)
		)

__plugin_name__ = "PrinterAlerts"

def __plugin_load__():
	global __plugin_implementation__
	__plugin_implementation__ = PrinterAlerts()

	global __plugin_hooks__
	__plugin_hooks__ = {
		"octoprint.comm.protocol.gcode.received": __plugin_implementation__.AlertWaitingForUser,
		"octoprint.plugin.softwareupdate.check_config": __plugin_implementation__.get_update_information
	}
