function main() {
  
  var today = Utilities.formatDate(new Date(), "CST", "yyyy-MM-dd"); //make sure you set your timezone
  var labelCount = GmailApp.getMessagesForThreads(GmailApp.getUserLabelByName("somelabel").getThreads()).length;
  var unreadCount = GmailApp.getInboxUnreadCount();
  var starredCount = GmailApp.getMessagesForThreads(GmailApp.getStarredThreads()).length;  
  var sentTodayCount = GmailApp.getMessagesForThreads(GmailApp.search("from:me after:" + today)).length;
  var receivedTodayCount = GmailApp.getMessagesForThreads(GmailApp.search("from:(!me) after:" + today)).length;
  
  var unamepass ='API_KEY:ignore';
  var digest = Utilities.base64Encode(unamepass);
  var digestfull = "Basic "+digest; 
  var httpheaders = { 
    "Authorization" : digestfull,
    "Accept" : "application/json"
  };
  
  var options = {
    "method" : "post",    
    "headers" : httpheaders
  };
  
  options.payload = '{"value":' + sentTodayCount + '}'; 
  var response = UrlFetchApp.fetch("https://push.ducksboard.com/values/ID/", options);
  
  options.payload = '{"value":' + receivedTodayCount + '}'; 
  response = UrlFetchApp.fetch("https://push.ducksboard.com/values/ID/", options);
  
  options.payload = '{"value":' + unreadCount + '}'; 
  response = UrlFetchApp.fetch("https://push.ducksboard.com/values/ID/", options);
  
  options.payload = '{"value":' + labelCount + '}'; 
  response = UrlFetchApp.fetch("https://push.ducksboard.com/values/ID/", options);
  
  options.payload = '{"value":' + starredCount + '}'; 
  response = UrlFetchApp.fetch("https://push.ducksboard.com/values/ID/", options);
  
}