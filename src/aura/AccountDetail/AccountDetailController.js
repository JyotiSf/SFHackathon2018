({
	handleApplicationEvent : function(component, event) {
        var message = event.getParam("AllAccounts");
        $A.util.addClass(component.find("Details"), "slds-hide");
    },
})