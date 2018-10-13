({
		closeModal:function(component,event,helper){    
		var cmpTarget = component.find('Modalbox');
		var cmpBack = component.find('Modalbackdrop');
		$A.util.removeClass(cmpBack,'slds-backdrop--open');
		$A.util.removeClass(cmpTarget, 'slds-fade-in-open');

    	},
            deleteAccount : function(component, event) {
        var accountToDelete = component.get('v.selectedAccounts');
        var action = component.get('c.delteAllAccount');
        // Set up the callback
         action.setParams({ accountList : accountToDelete });
        action.setCallback(this, function(actionResult) {
            var appEvent = $A.get("e.c:RefreshAccount");
        appEvent.setParams({
            "AllAccounts" : actionResult.getReturnValue() });
        appEvent.fire();
        });
        $A.enqueueAction(action);
	}
})