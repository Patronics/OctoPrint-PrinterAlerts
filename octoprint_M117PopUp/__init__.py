# coding=utf-8

import octoprint.plugin

class M117PopUp(octoprint.plugin.AssetPlugin):
	def AlertM117(self, comm_instance, phase, cmd, cmd_type, gcode, *args, **kwargs):
		if gcode and gcode.startswith("M117"):
			self._plugin_manager.send_plugin_message(self._identifier, dict(type="popup", msg=cmd.replace("M117 ","")))
			
	def get_assets(self):
		return dict(js=["js/M117PopUp.js"])
		
	def get_version(self):
		return self._plugin_version
		
	##~~ Softwareupdate hook
	def get_update_information(self):
		return dict(
			m117popup=dict(
				displayName="M117PopUp",
				displayVersion=self._plugin_version,

				# version check: github repository
				type="github_release",
				user="jneilliii",
				repo="OctoPrint-M117PopUp",
				current=self._plugin_version,

				# update method: pip
				pip="https://github.com/jneilliii/OctoPrint-M117PopUp/archive/{target_version}.zip"
			)
		)

__plugin_name__ = "M117PopUp"

def __plugin_load__():
	global __plugin_implementation__
	__plugin_implementation__ = M117PopUp()

	global __plugin_hooks__
	__plugin_hooks__ = {
		"octoprint.comm.protocol.gcode.queuing": __plugin_implementation__.AlertM117,
		"octoprint.plugin.softwareupdate.check_config": __plugin_implementation__.get_update_information
	}