function main() {
  
  var today = Utilities.formatDate(new Date(), "CST", "yyyy-MM-dd"); //make sure you set your timezone
  var labelCount = GmailApp.getMessagesForThreads(GmailApp.getUserLabelByName("somelabel").getThreads()).length;
  var unreadCount = GmailApp.getInboxUnreadCount();
  var starredCount = GmailApp.getMessagesForThreads(GmailApp.getStarredThreads()).length;  
  var sentTodayMessages = GmailApp.getMessagesForThreads(GmailApp.search("from:me after:" + today));
  var receivedTodayMessages = GmailApp.getMessagesForThreads(GmailApp.search("from:(!me) after:" + today));


  var receivedTodayCount = 0;
  var sentTodayCount = 0;

  for (var i = 0 ; i <  receivedTodayMessages.length; i++) {
    for (var j = 0; j < receivedTodayMessages[i].length; j++) {  
      var msgDate = Utilities.formatDate(receivedTodayMessages[i][j].getDate(), "CST", "yyyy-MM-dd");
      if (!(receivedTodayMessages[i][j].getFrom().match('jed@limechile.com')) && (msgDate == today)) receivedTodayCount ++;
    }
  }  


  for (var i = 0 ; i <  sentTodayMessages.length; i++) {
    for (var j = 0; j < sentTodayMessages[i].length; j++) {      
      var msgDate = Utilities.formatDate(sentTodayMessages[i][j].getDate(), "CST", "yyyy-MM-dd");
      if (sentTodayMessages[i][j].getFrom().match('jed@limechile.com') && msgDate == today) sentTodayCount ++;
    }
  }
      
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