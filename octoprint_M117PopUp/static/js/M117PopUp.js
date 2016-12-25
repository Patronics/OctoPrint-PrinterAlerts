$(function() {
    function M117PopUpViewModel(parameters) {
        var self = this;
		
		self.settingsViewModel = parameters[0];
		
		self.autoClose = ko.observable();
		self.msgType = ko.observable();
		self.msgTypes = ko.observableArray([{
						name : 'Notice',
						value : 'notice'
					}, {
						name : 'Error',
						value : 'error'
					}, {
						name : 'Info',
						value : 'info'
					}, {
						name : 'success',
						value : 'success'
					}
				]);

		self.onDataUpdaterPluginMessage = function(plugin, data) {
            if (plugin != "M117PopUp") {
				// console.log('Ignoring '+plugin);
                return;
            }
			
			if(data.type == "popup") {
				// console.log(data.msg);
				new PNotify({
					title: 'M117 Pop Up Message',
					text: data.msg,
					type: self.settingsViewModel.settings.plugins.M117PopUp.msgType(),
					hide: self.settingsViewModel.settings.plugins.M117PopUp.autoClose()
					});
			}
		}
		
		self.onBeforeBinding = function() {
            self.msgType(self.settingsViewModel.settings.plugins.M117PopUp.msgType());
            self.autoClose(self.settingsViewModel.settings.plugins.M117PopUp.autoClose());
        }
		
		self.onEventSettingsUpdated = function (payload) {            
            self.msgType = self.settingsViewModel.settings.plugins.M117PopUp.msgType();
            self.autoClose = self.settingsViewModel.settings.plugins.M117PopUp.autoClose();
        }
    }

	// updated for new configuration model from old 3 tuple method
	OCTOPRINT_VIEWMODELS.push({
        construct: M117PopUpViewModel,
        additionalNames: ["M117PopUpViewModel"],
        dependencies: ["settingsViewModel"],
        optional: [],
        elements: ["#settings_plugin_M117PopUp_form"]
    });
});