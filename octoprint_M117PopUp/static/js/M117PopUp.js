$(function() {
    function M117PopUpViewModel(parameters) {
        var self = this;
		
		self.settings = parameters[0];

		self.onDataUpdaterPluginMessage = function(plugin, data) {
            if (plugin != "M117PopUp") {
                return;
            }
			
			if(data.type == "popup") {
				new PNotify({
					title: 'M117 Pop Up Message',
					text: data.msg
					)};
			}
    }

    OCTOPRINT_VIEWMODELS.push([
        M117PopUpViewModel,

        // This is a list of dependencies to inject into the plugin, the order which you request here is the order
        // in which the dependencies will be injected into your view model upon instantiation via the parameters
        // argument
        [],

        // Finally, this is the list of all elements we want this view model to be bound to.
        []
    ]);
});