$(function() {
    function PrinterAlertsViewModel(parameters) {
        var self = this;
		
		self.settingsViewModel = parameters[0];
		
		self.autoClose = ko.observable();
		self.enableSpeech = ko.observable();
		self.speechVoice = ko.observable();
		self.speechVolume = ko.observable();
		self.speechPitch = ko.observable();
		self.speechRate = ko.observable();
		self.voices = ko.observableArray();
		self.speechEnabledBrowser = ko.observable();
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
						name : 'Success',
						value : 'success'
					}, {
						name : 'Disabled',
						value : 'disabled'
					}
				]);

		self.onDataUpdaterPluginMessage = function(plugin, data) {
            if (plugin != "PrinterAlerts") {
				 console.log('Ignoring '+plugin);
                return;
            }
			
			if(data.type == "popup") {
				// console.log(data.msg);
				if(self.settingsViewModel.settings.plugins.PrinterAlerts.msgType() != "disabled"){
					new PNotify({
						title: 'Printer Alert',
						text: data.msg,
						type: self.settingsViewModel.settings.plugins.PrinterAlerts.msgType(),
						hide: self.settingsViewModel.settings.plugins.PrinterAlerts.autoClose()
						});
				}
				if(self.enableSpeech() && ('speechSynthesis' in window)){
					var msg = new SpeechSynthesisUtterance(data.msg);
					msg.volume = self.settingsViewModel.settings.plugins.PrinterAlerts.speechVolume();
					msg.pitch = self.settingsViewModel.settings.plugins.PrinterAlerts.speechPitch();
					msg.rate = self.settingsViewModel.settings.plugins.PrinterAlerts.speechRate();
					msg.voice = speechSynthesis.getVoices().filter(function(voice){return voice.name == self.settingsViewModel.settings.plugins.PrinterAlerts.speechVoice(); })[0];
					speechSynthesis.cancel();
					speechSynthesis.speak(msg);
				}
			}
		}
		
		self.onBeforeBinding = function() {
            self.msgType(self.settingsViewModel.settings.plugins.PrinterAlerts.msgType());
            self.autoClose(self.settingsViewModel.settings.plugins.PrinterAlerts.autoClose());
			self.enableSpeech(self.settingsViewModel.settings.plugins.PrinterAlerts.enableSpeech());
			self.speechVoice(self.settingsViewModel.settings.plugins.PrinterAlerts.speechVoice());
			self.speechVolume(self.settingsViewModel.settings.plugins.PrinterAlerts.speechVolume());
			self.speechPitch(self.settingsViewModel.settings.plugins.PrinterAlerts.speechPitch());
			self.speechRate(self.settingsViewModel.settings.plugins.PrinterAlerts.speechRate());
        }
		
		self.onEventSettingsUpdated = function (payload) {            
            self.msgType = self.settingsViewModel.settings.plugins.PrinterAlerts.msgType();
            self.autoClose = self.settingsViewModel.settings.plugins.PrinterAlerts.autoClose();
			self.enableSpeech(self.settingsViewModel.settings.plugins.PrinterAlerts.enableSpeech());
			self.speechVoice(self.settingsViewModel.settings.plugins.PrinterAlerts.speechVoice());
			self.speechVolume(self.settingsViewModel.settings.plugins.PrinterAlerts.speechVolume());
			self.speechPitch(self.settingsViewModel.settings.plugins.PrinterAlerts.speechPitch());
			self.speechRate(self.settingsViewModel.settings.plugins.PrinterAlerts.speechRate());
        }
		
		self.testPopUp = function(data) {
			self.onDataUpdaterPluginMessage("PrinterAlertPopUp", {'msg':'Printer Alert Pop up message example.','type':'popup'});
		}
			
		speechSynthesis.onvoiceschanged = function(e) {
			if (self.voices().length > 0)
				return;
			var voicenames = speechSynthesis.getVoices();
			voicenames.forEach(function(voice, i) {
				self.voices.push({'name':voice.name,'value':voice.name})
				});
		};
    }

    // This is how our plugin registers itself with the application, by adding some configuration
    // information to the global variable OCTOPRINT_VIEWMODELS
    ADDITIONAL_VIEWMODELS.push([
        // This is the constructor to call for instantiating the plugin
        PrinterAlertsViewModel,

        // This is a list of dependencies to inject into the plugin, the order which you request
        // here is the order in which the dependencies will be injected into your view model upon
        // instantiation via the parameters argument
        ["settingsViewModel"],

        // Finally, this is the list of selectors for all elements we want this view model to be bound to.
        ["#settings_plugin_PrinterAlerts_form"]
    ]);
});
