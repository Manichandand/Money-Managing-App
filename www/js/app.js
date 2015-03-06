// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var db = null;
var pin_now = "";
var example = angular.module('starter', ['ionic', 'starter.controllers', 'starter.services','ngCordova'])

.run(function($ionicPlatform,$cordovaSQLite) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    db = $cordovaSQLite.openDB({name : "my_mm.db"});
    //alert(db);
    $cordovaSQLite.execute(db,"CREATE TABLE IF NOT EXISTS PIN (pid integer primary key,pin text)");
    $cordovaSQLite.execute(db,"SELECT * FROM PIN").then(function(res){
        //alert(res.rows.length);
        if(angular.equals(res.rows.length,0)){
            var query = "INSERT INTO PIN (pid,pin) VALUES (?,?)";
            $cordovaSQLite.execute(db,query,[1,"1234"]);
        }
    });
    /*$cordovaSQLite.execute(db,"SELECT * FROM PIN").then(function(res){
          pin_now = res.rows.item(0).pin;
    });*/
    //alert(pin_now);
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

  });
})

.config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider) {
  $ionicConfigProvider.backButton.previousTitleText(false).text('');
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: "/tab",
    abstract: true,
    templateUrl: "templates/tabs.html"
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

  .state('tab.friends', {
      url: '/friends',
      views: {
        'tab-friends': {
          templateUrl: 'templates/tab-friends.html',
          controller: 'FriendsCtrl'
        }
      }
    })
  .state('tab.change_pass', {
      url: '/change_pass',
      views: {
        'tab-friends':{
          templateUrl: 'templates/change_pass.html',
          controller: 'changePassCtrl'
        }
      }
    })
  .state('tab.delete_account', {
      url: '/delete_account',
      views: {
        'tab-friends':{
          templateUrl: 'templates/delete_account.html',
          controller: 'deleteAccountCtrl'
        }
      }
    })
  .state('tab.recover_accounts', {
      url: '/recover_accounts',
      views: {
        'tab-friends':{
          templateUrl: 'templates/recover_accounts.html',
          controller: 'recoverAccountCtrl'
        }
      }
    })
  .state('tab.delete_cat', {
      url: '/delete_cat',
      views: {
        'tab-friends':{
          templateUrl: 'templates/delete_cat.html',
          controller: 'deleteCatCtrl'
        }
      }
    })
  .state('tab.view_cat', {
      url: '/view_cat',
      views: {
        'tab-friends':{
          templateUrl: 'templates/view_cat.html',
          controller: 'viewCatCtrl'
        }
      }
    })
  .state('tab.tut', {
      url: '/tut',
      views: {
        'tab-friends':{
          templateUrl: 'templates/tut.html',
          controller: 'tutCtrl'
        }
      }
    })
  .state('tab.add_account', {
      url: '/add_account',
      views: {
        'tab-friends':{
          templateUrl: 'templates/add_account.html',
          controller: 'addAccountCtrl'
        }
      }
    });
  
  
  
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');

});