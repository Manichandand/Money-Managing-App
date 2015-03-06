angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {
})

.controller('ChatsCtrl', function($scope, Chats) {
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('FriendsCtrl', function($scope,$ionicPopup,Friends) {
  //Catagorie add from pop up from here//////////////
  $scope.add_cat = function(){
    //$scope.take_cat_name = 'gen';
    //$scope.output = 'OUTPUT';
    var myPopup = $ionicPopup.show({
     template: '<input type="text" ng-model="take_cat_name">',
     title: 'Add catagorie',
     scope: $scope,
     buttons: [
       { text: 'Cancel' },
       {
         text: '<b>Save</b>',
         type: 'button-positive',
         onTap: function(e) {
           //alert($scope.take_cat_name);

         }
       },
     ]
   });
  } 
  ////////////////////////////////////////////////////
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})
.controller('changePassCtrl', function($scope,$cordovaSQLite,$cordovaToast) {
  $scope.change_pass = function(){
    $cordovaSQLite.execute(db,"SELECT * FROM PIN").then(function(res){
          var old_pin = document.getElementById("old_pin").value;
          var new_pin = document.getElementById("new_pin").value;
          //alert(res.rows.length);
          if(old_pin != res.rows.item(0).pin){
            //alert("Invelid Old PIN");
            $cordovaToast.showShortBottom('Invelid Old PIN');
          }
          else{
            var query = "UPDATE PIN SET pin = ? WHERE pid=1";
            $cordovaSQLite.execute(db,query,[new_pin]).then(function(res){
                //alert("Pin Changed");
                $cordovaToast.showShortBottom('Pin Changed');
              },function(err){
                //alert("ERROR");
                $cordovaToast.showShortBottom('Error');
            });
          }
          //alert(res.rows.item(0).pin);
    });
  }
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})

.controller('addAccountCtrl', function($scope) {
  $scope.catagories = ['Gen','Food','Cloths','Books'];
})
.controller('deleteAccountCtrl', function($scope) {
})
.controller('recoverAccountCtrl', function($scope) {
})
.controller('deleteCatCtrl', function($scope) {
})
.controller('viewCatCtrl', function($scope) {
})
.controller('tutCtrl', function($scope) {
});
