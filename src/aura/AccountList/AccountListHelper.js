({
      // Fetch the accounts from the Apex controller
      getAccountList: function(component) {
        var action = component.get('c.getAccounts');
        // Set up the callback
        action.setCallback(this, function(actionResult) {
         component.set('v.accounts', actionResult.getReturnValue());
        });
        $A.enqueueAction(action);
      },
        deleteAccount : function(component, event) {
        var accountToDelete = event.getSource().get("v.name").Id;
        var action = component.get('c.delteAccountById');
        // Set up the callback
         action.setParams({ accid : accountToDelete });
        action.setCallback(this, function(actionResult) {
         component.set('v.accounts', actionResult.getReturnValue());
        });
        $A.enqueueAction(action);
	},
})