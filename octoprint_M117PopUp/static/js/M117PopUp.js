$(function() {
    function M117PopUpViewModel(parameters) {
        var self = this;
<<<<<<< HEAD
		
		self.settings = parameters[0];
=======
>>>>>>> d6ec879c5cf76668c7288e86b51809e0df1adbea

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

<<<<<<< HEAD
    OCTOPRINT_VIEWMODELS.push([
=======
    ADDITIONAL_VIEWMODELS.push([
>>>>>>> d6ec879c5cf76668c7288e86b51809e0df1adbea
        M117PopUpViewModel,

        // This is a list of dependencies to inject into the plugin, the order which you request here is the order
        // in which the dependencies will be injected into your view model upon instantiation via the parameters
        // argument
        [],

        // Finally, this is the list of all elements we want this view model to be bound to.
        []
    ]);
});