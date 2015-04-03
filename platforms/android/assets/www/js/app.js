// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var db;
var kk=0;
var example = angular.module('starter', ['ionic', 'starter.controllers', 'starter.services','ngCordova'])
.run(function($ionicPlatform,$cordovaSQLite,$location,$rootScope,$ionicHistory) {
  /*$ionicPlatform.ready(function() {
    //alert($cordovaSQLite);
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
    $cordovaSQLite.execute(db,"CREATE TABLE IF NOT EXISTS CAT (cid integer primary key , cat text)").then(function(res){
        
    });
    //$cordovaSQLite.execute(db,"DROP TABLE IF EXISTS CAT");
    $cordovaSQLite.execute(db,"SELECT * FROM CAT").then(function(res){
          if(res.rows.length === 0){
            var query = "INSERT INTO CAT (cat) VALUES (?)";
            $cordovaSQLite.execute(db,query,["General"]);
        }
    });
    //$cordovaSQLite.execute(db,"DROP TABLE IF EXISTS ACC");
    $cordovaSQLite.execute(db,
    "CREATE TABLE IF NOT EXISTS ACC (aid integer primary key AUTOINCREMENT,name text NOT NULL, acnumber text NOT NULL,display boolean default true,balance double default 0.00)").then(function(res){
      //alert('Accounts added!');
      //total_acc = res.rows.length;
    });
    $cordovaSQLite.execute(db,"select * from ACC").then(function(res){
      //alert(res.rows.length)
      if(res.rows.length === 0){
        //alert('YES');
        //$cordovaSQLite.execute(db,"INSERT INTO ACC(name,acnumber) VALUES(?,?)",['Purse','PURSE_ACCOUNT']);
      }
    });
    //alert(pin_now);
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
    $location.path('#/tab/dash');
    $rootScope.$apply();
  });*/
     //db = $cordovaSQLite.openDB({name : "my_mm.db"});
     // This is a function that bootstraps AngularJS, which is called from later code
     /*$scope.my_fun = function(){
        alert('ALMOST WORK DONE');
     }
     $scope.my_fun();*/
})
.config(function($provide,$stateProvider, $urlRouterProvider,$ionicConfigProvider) {
  //$provide.value('sqlite', $cordovaSQLite);
  $ionicConfigProvider.backButton.previousTitleText(false).text('');
  //$ionicConfigProvider.views.maxCache(0);
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
        controller: 'showCtrl'
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
          controller: 'showCtrl'
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
          controller: 'addAccountCtrl'
        }
      }
    })
  .state('tab.view_cat', {
      url: '/view_cat',
      views: {
        'tab-friends':{
          templateUrl: 'templates/view_cat.html',
          controller: 'addAccountCtrl'
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
  .state('tab.acc-detail', {
      url: '/acc/:aid',
      views: {
        'tab-dash': {
          templateUrl: 'templates/acc-detail.html',
          controller: 'AccDetailCtrl'
        }
      }
    })
  .state('tab.add_exp', {
      url: '/add_exp',
      views: {
        'tab-dash': {
          templateUrl: 'templates/add_exp.html',
          controller: 'expDetailCtrl'
        }
      }
    })
  .state('g', {
      url: '/g',
          templateUrl: 'templates/g.html',
          controller: 'gCtrl'
    })
  .state('tab.add_account', {
      url: '/add_account',
      views: {
        'tab-dash':{
          templateUrl: 'templates/add_account.html',
          controller: 'addAccountCtrl'
        }
      }
    });
  
  
  
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');

});
/*function init(){
  alert(window.cordovaSQLite);
  angular.bootstrap(document.body, ['starter']);
}
angular.element(document).ready(function() {
  if (window.cordova) {
    document.addEventListener('deviceready',init(), false);
  } else {
    angular.bootstrap(document.body, ['starter']);
  }
});*/
ionic.Platform.ready(function() {
        // navigator.geolocation goes here!
        //alert('FUCK U');
        angular.bootstrap(document.body, ['starter']);
});
example.controller('MyCtrl', function($scope,$cordovaSQLite) {
    //alert('RUNNING BODY..');
    db = $cordovaSQLite.openDB({name : "my_mm.db"});
    //alert('Initlize '+db);
    //db = $cordovaSQLite.openDB({name : "my_mm.db"});
    //alert(db);
    $cordovaSQLite.execute(db,"CREATE TABLE IF NOT EXISTS PIN (pid integer primary key,pin text)");
    $cordovaSQLite.execute(db,"SELECT * FROM PIN").then(function(res){
        //alert(res.rows.length);
        if(angular.equals(res.rows.length,0)){
            var query = "INSERT INTO PIN (pid,pin) VALUES (?,?)";
            $cordovaSQLite.execute(db,query,[1,"1234"]);
        }
    });
    $cordovaSQLite.execute(db,"CREATE TABLE IF NOT EXISTS CAT (cid integer primary key , cat text)").then(function(res){
        
    });
    //$cordovaSQLite.execute(db,"DROP TABLE IF EXISTS CAT");
    $cordovaSQLite.execute(db,"SELECT * FROM CAT").then(function(res){
          if(res.rows.length === 0){
            var query = "INSERT INTO CAT (cat) VALUES (?)";
            $cordovaSQLite.execute(db,query,["General"]);
        }
    });
    //$cordovaSQLite.execute(db,"DROP TABLE IF EXISTS ACC");
    $cordovaSQLite.execute(db,
    "CREATE TABLE IF NOT EXISTS ACC (aid integer primary key AUTOINCREMENT,name text NOT NULL, acnumber text NOT NULL,display boolean default true,balance double default 0.00)").then(function(res){
      //alert('Accounts added!');
      //total_acc = res.rows.length;
    });
    $cordovaSQLite.execute(db,"select * from ACC").then(function(res){
      //alert(res.rows.length)
      if(res.rows.length === 0){
        //alert('YES');
        //$cordovaSQLite.execute(db,"INSERT INTO ACC(name,acnumber) VALUES(?,?)",['Purse','PURSE_ACCOUNT']);
      }
    });
    //making entry table
    //$cordovaSQLite.execute(db,"DROP TABLE IF EXISTS ENT");
    $cordovaSQLite.execute(db,"CREATE TABLE IF NOT EXISTS ENT (eid integer primary key AUTOINCREMENT,acc_name text NOT NULL,amount double NOT NULL,date text NOT NULL,time text NOT NULL,des text,cat text NOT NULL)").then(function(res){
        //alert('TABLE ENT');
    });
    //$cordovaSQLite.execute(db,"DROP TABLE IF EXISTS ACC");;
});
