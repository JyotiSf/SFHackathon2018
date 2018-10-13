({
        doInit : function(component, event, helper) {
        var action = component.get("c.getAccountSourcePickval");
        var inputsel = component.find("InputSelectDynamic");
        var opts=[];
        action.setCallback(this, function(a) {
            for(var i=0;i< a.getReturnValue().length;i++){
                opts.push({"class": "optionClass", label: a.getReturnValue()[i], value: a.getReturnValue()[i]});
            }
            inputsel.set("v.options", opts);
            component.set("v.selectedAccountSource", opts[0].value); 
        }
                                   
                          );
        $A.enqueueAction(action); 
        },
    onPicklistChange: function(component, event, helper) {
        // get the value of select option
        component.set('v.selectedAccountSource', event.getSource().get("v.value"));
    },
	closeModal:function(component,event,helper){    
		var cmpTarget = component.find('Modalbox');
		var cmpBack = component.find('Modalbackdrop');
		$A.util.removeClass(cmpBack,'slds-backdrop--open');
		$A.util.removeClass(cmpTarget, 'slds-fade-in-open'); 
    	},
	openmodal:function(component,event,helper) {
         
		var cmpTarget = component.find('Modalbox');
		var cmpBack = component.find('Modalbackdrop');
		$A.util.addClass(cmpTarget, 'slds-fade-in-open');
		$A.util.addClass(cmpBack, 'slds-backdrop--open'); 
       
	},
    /* aeHandlerController.js */
    handleApplicationEvent : function(component, event) {
        var message = event.getParam("selectedAccounts");

        // set the handler attributes based on event data
        component.set("v.selectedAccounts", message);
    },
    updateAccounts : function(component, event,helper) {
       var accountsToUpdate = component.get('v.selectedAccounts');
       var accountSource = component.get('v.selectedAccountSource');
        var action = component.get('c.updateAccountSource');
        // Set up the callback accountSource, List<Account> accountList
        action.setParams({ accountSource : accountSource ,accountList :accountsToUpdate });
        action.setCallback(this, function(actionResult) {
                      var appEvent = $A.get("e.c:RefreshAccount");
        appEvent.setParams({
            "AllAccounts" : actionResult.getReturnValue() });
        appEvent.fire();
        });
     
        $A.enqueueAction(action);
        helper.closeModal(component, event) ;
    },
        newAccount: function (component, event, helper) {
              var createRecordEvent = $A.get('e.force:createRecord');
        if ( createRecordEvent ) {
            createRecordEvent.setParams({
                'entityApiName': 'Account',
            });
            createRecordEvent.fire();
        } else {
            /* Create Record Event is not supported */
            alert("Account creation not supported");
        } 
    },
        deleteSelectedAccount: function (component, event, helper) {
        if (confirm('Are you sure?')) helper.deleteAccount(component, event);
    },
})