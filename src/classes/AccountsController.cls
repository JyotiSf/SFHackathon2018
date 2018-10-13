public class AccountsController {
  @AuraEnabled
  public static List <Account> getAccounts() {
    return [SELECT Name,AccountNumber,Owner.name,AccountSource,AnnualRevenue,Type,Industry,CreatedBy.name FROM Account ORDER BY CreatedDate DESC LIMIT 15];
  }
        
    @AuraEnabled
    public static List<Account> delteAccountById(String accid)
    {
        System.debug('In controller delteAccountById method..');
        Account delAccount=[Select Id from Account where id=:accid];
        delete delAccount;
        return [Select Name,AccountNumber,Owner.name,AccountSource,AnnualRevenue,Type,Industry,CreatedBy.name from Account ORDER BY CreatedDate DESC   LIMIT 15];
    }
       @AuraEnabled
    public static List<String> getAccountSourcePickval() {
        List<String> options = new List<String>();

        Schema.DescribeFieldResult fieldResult = account.Accountsource.getDescribe();

        List<Schema.PicklistEntry> ple = fieldResult.getPicklistValues();

        for (Schema.PicklistEntry f: ple) {
            options.add(f.getLabel());
        }       
        return options;
    }
    @AuraEnabled
    public static List<Account> updateAccountSource(String accountSource, List<Account> accountList) {
         
        List<Account> updatedAccountList = new  List<Account>();
        for(Account accountitem : accountList )
        {
            accountitem.AccountSource = accountSource;
            updatedAccountList.add(accountitem);
        }
        update updatedAccountList;
        return [SELECT Name,AccountNumber,Owner.name,AccountSource,AnnualRevenue,Type,Industry,CreatedBy.name FROM Account ORDER BY CreatedDate DESC LIMIT 15];
  
    }
        @AuraEnabled
    public static List<Account> delteAllAccount(List<Account> accountList)
    {
        
        delete accountList;
        return [Select Name,AccountNumber,Owner.name,AccountSource,AnnualRevenue,Type,Industry,CreatedBy.name from Account ORDER BY CreatedDate DESC LIMIT 15];
    }
    
}