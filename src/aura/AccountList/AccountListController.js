({
    doInit: function (component, event, helper) {
        // Fetch the account list from the Apex controller
        helper.getAccountList(component);
    },
    displayDetails:function (component, event, helper) {
     component.set('v.selectedAccounts',(event.getSource().get('v.name')));
         $A.util.removeClass(component.find("Details"), "slds-hide");
         $A.util.addClass(component.find("AllDetails"), "slds-hide");
    },
    
    selectoptionvalue: function (component, event, helper) {
        component.set(
            'v.selectedAccounts',
            component.get('v.accounts').filter(account => account.selected));
        var selectedAccounts = component.get('v.selectedAccounts');
          var appEvent = $A.get("e.c:SelectedAccount");
        appEvent.setParams({
            "selectedAccounts" : selectedAccounts });
        appEvent.fire();
        $A.util.addClass(component.find("Details"), "slds-hide");
        $A.util.removeClass(component.find("AllDetails"), "slds-hide");
        if(selectedAccounts =='')
        {  
          $A.util.addClass(component.find("AllDetails"), "slds-hide");  
        }
    },
        handleApplicationEvent : function(cmp, event) {
        var message = event.getParam("AllAccounts");
        cmp.set("v.accounts", message);
    },
    
        editAccount: function (component, event, helper) {
        var accountToEdit = event.getSource().get('v.name').Id;
        var editRecordEvent = $A.get('e.force:editRecord');
        editRecordEvent.setParams({
            'recordId': accountToEdit,
        });
        editRecordEvent.fire();
    },
        deleteAccount: function (component, event, helper) {
        if (confirm('Are you sure?')) helper.deleteAccount(component, event);
    },
    
})