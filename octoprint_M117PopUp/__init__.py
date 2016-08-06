# coding=utf-8

import octoprint.plugin

class M117PopUp(octoprint.plugin.OctoPrintPlugin):
	def AlertM117(self, comm_instance, phase, cmd, cmd_type, gcode, *args, **kwargs):
		if gcode and gcode.startswith("M117"):
			self._logger.info(cmd.replace("M117 ",""))
		return

__plugin_name__ = "M117PopUp"

def __plugin_load__():
	global __plugin_implementation__
	__plugin_implementation__ = M117PopUp()

	global __plugin_hooks__
	__plugin_hooks__ = {
		"octoprint.comm.protocol.gcode.queuing": __plugin_implementation__.AlertM117
	}