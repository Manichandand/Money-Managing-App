var acc_global_name;
var global_from;
var global_to;
var global_cat;
angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope,$cordovaSQLite) {

})

.controller('ChatsCtrl', function($scope) {
  document.getElementById('button_c').style.height = (screen.height-245)/5+'px';
  document.getElementById('button_+').style.height = (screen.height-245)/5+'px';
  document.getElementById('button_-').style.height = (screen.height-245)/5+'px';
  document.getElementById('button_*').style.height = (screen.height-245)/5+'px';
  document.getElementById('button_/').style.height = (screen.height-245)/5+'px';
  $scope.str = '';
  $scope.answer = '';
  $scope.clear_str = function(){
    $scope.str = '';
    document.getElementById('input_string').value = '';
  }
  $scope.a_digit = function(digit){
    $scope.str = $scope.str +digit;
    document.getElementById('input_string').value = $scope.str;
    //alert($scope.str);
  }
  $scope.eval_str = function(){
    //alert(eval($scope.str));
    document.getElementById('input_string').value = '='+eval($scope.str);
    $scope.answer = eval($scope.str)+'';
    $scope.str = '';
  }
  $scope.add_plus_minus = function(){
    //alert(eval($scope.str))
    if(eval($scope.str) === 0){
      $scope.str = eval($scope.str);
    }
    else if(eval($scope.str) > 0){
      $scope.str = '-'+eval($scope.str);
      //alert('yes');
    }
    else if(eval($scope.str) < 0){
      $scope.str = -eval($scope.str);
    }
    else{
      $scope.str = '=Error';
    }
    document.getElementById('input_string').value = $scope.str;
  }
  $scope.remove_last = function(){
    $scope.str = $scope.str.substring(0, $scope.str.length - 1);
    document.getElementById('input_string').value = $scope.str;
  }
  $scope.store_ans = function(){
    $scope.str = $scope.str + $scope.answer;
    document.getElementById('input_string').value = $scope.str;
  }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})
.controller('showCtrl', function($scope,$cordovaSQLite,$cordovaToast) {
  //alert(db);
  
  //document.getElementById('button_minus').style.marginLeft = (x-20)+'px';
  $scope.accounts = [];
  $cordovaSQLite.execute(db,"SELECT * FROM ACC",[]).then(function(res){
    //alert(res.rows.length);
    $scope.colors = ['#99cc33','#009900','#ffcc00','#336633','#ff0099','#990099','#6633cc','#cc6633','#333333','#cc9933','#009999','#3399ff','#336699','#cc3333'];
    var i=0;
    var random_num;
    while(i<res.rows.length){
      random_num = res.rows.item(i).aid%14;
      if(res.rows.item(i).display === 'true'){
        $scope.accounts.push({aid: res.rows.item(i).aid,aname:res.rows.item(i).name,ac_number:res.rows.item(i).acnumber,display:res.rows.item(i).display,balance:res.rows.item(i).balance,bg:$scope.colors[random_num]});
      }
      i++;
    }
    //window.location.replace('#/tab/delete_account');
  });
  //Function for delete accounts
  $scope.delete_acc = function(account_id,account_name,index){
    //alert(account_id);
    var query;
    query = "UPDATE ACC SET display = ? WHERE aid=?";
    $cordovaSQLite.execute(db,query,[false,account_id]).then(function(res){
      //alert("FUCK U");
    });
   $cordovaSQLite.execute(db,"SELECT * FROM ACC").then(function(res){
        var i=0;
        while(i<res.rows.length){
          //alert(res.rows.item(i).name + "------>"+res.rows.item(i).display);
          i++;
        }
      });
      //window.location.replace('#/tab/delete_account');
      $scope.accounts.splice(index,1);
   //$route.reload()
  }
})
.controller('FriendsCtrl', function($scope,$ionicPopup,$cordovaSQLite,$cordovaToast) {
  //alert("Friends "+db);
  //window.location.replace('#/tab/dash');
  //Catagorie add from pop up from here//////////////
  $scope.add_cat = function(){
    //$scope.take_cat_name = 'gen';
    //$scope.output = 'OUTPUT';
    var myPopup = $ionicPopup.show({
     template: '<input type="text" id="cat_input">',
     title: 'Add catagorie',
     scope: $scope,
     buttons: [
       { text: 'Cancel' },
       {
         text: '<b>Save</b>',
         type: 'button-positive',
         onTap: function(e) {
           //alert($scope.take_cat_name);
           //alert(document.getElementById('cat_input').value);
           var rep=false;
           var i=0;
           var input = document.getElementById('cat_input').value;
           $cordovaSQLite.execute(db,"SELECT cat FROM CAT WHERE cat=?",[input]).then(function(res){
              if(res.rows.length === 0){
                var query = "INSERT INTO CAT(cat) VALUES (?)";
                $cordovaSQLite.execute(db,query,[input]).then(function(res){
                    $cordovaToast.showShortBottom('Added..');
                });
              }
              else{
                $cordovaToast.showShortBottom('Already Present..');
              }
           });
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

.controller('addAccountCtrl', function($scope,$cordovaSQLite,$cordovaToast,$stateParams) {
  var i=0;
  $scope.catagories = [];
  $scope.colors = ['#99cc33','#009900','#ffcc00','#336633','#ff0099','#990099','#6633cc','#cc6633','#333333','#cc9933','#009999','#3399ff','#336699','#cc3333'];
  var random_num;
  $cordovaSQLite.execute(db,"SELECT * FROM CAT",[]).then(function(res){
     if(res.rows.length > 0) {
              while(i<res.rows.length){
                random_num = i%14;
                //alert("SELECTED -> " + res.rows.item(i).cat);
                //$scope.catagories.push(res.rows.item(i).cat);
                $scope.catagories.push({name: res.rows.item(i).cat,bg:$scope.colors[random_num]});
                i++;
              }
      }
      else {
            $cordovaToast.showShortBottom('No results found');
      }
  });
  $scope.onSwipeLeft  = function(){
    //alert("Swipe Left");
  }
  $scope.delete_cat = function(item,index){
    //alert(item);
    if(item === "General"){
      $cordovaToast.showShortBottom('Unable to delete');
      $scope.check_gen = true;
    }
    else{
      $scope.check_gen = false;
      $cordovaSQLite.execute(db,"DELETE FROM CAT WHERE cat=?",[item]);
      $scope.catagories.splice(index,1);
    }
  }
  $scope.add_account = function(){
    var acc_name = document.getElementById('acc_name').value;
    var acc_number = document.getElementById('acc_number').value;
    var acc_balance = document.getElementById('acc_balance').value;
    //alert(acc_name+" "+acc_number+" "+acc_balance);
    var query = "INSERT INTO ACC(name,acnumber,balance) VALUES(?,?,?)";
    var check_name = false;
    $cordovaSQLite.execute(db,"SELECT count(*) as total FROM ACC WHERE name=?",[acc_name]).then(function(res){
        if(acc_balance.length === 0){
          //document.getElementById('acc_balance').value = 0.0;
          acc_balance = 0.0;
        }
        if(res.rows.item(0).total > 0){
          $cordovaToast.showShortBottom('Account already present');
        }
        else if(acc_name.length > 15){
          $cordovaToast.showShortBottom('Account name is Large');
        }
        else if(acc_number.length > 15){
          $cordovaToast.showShortBottom('Account number is Large');
        }
        else if(acc_number.length === 0){
          $cordovaToast.showShortBottom('Please put account number');
        }
        else if(acc_name.length === 0){
          $cordovaToast.showShortBottom('Please put account name');
        }
        else{
            $cordovaSQLite.execute(db,query,[acc_name,acc_number,acc_balance]).then(function(res){
                $cordovaToast.showShortBottom('Account Created..');
            });
        }
    });
    
    //alert('Inserted..');
    //$state.go( 'tab.add_account', {}, { reload : true } )
  }
})
.controller('deleteAccountCtrl', function($scope,$cordovaSQLite) {
  //alert(db);
})
.controller('recoverAccountCtrl', function($scope,$cordovaSQLite) {
  $scope.accountD = [];
  $scope.show_load = false; 
  //alert('In the controller');
  $cordovaSQLite.execute(db,"SELECT * FROM ACC",[]).then(function(res){
    //alert(res.rows.length);
    $scope.colors = ['#99cc33','#009900','#ffcc00','#336633','#ff0099','#990099','#6633cc','#cc6633','#333333','#cc9933','#009999','#3399ff','#336699','#cc3333'];
    var i=0;
    var random_num;
    while(i<res.rows.length){
      random_num = i%14;
      if(res.rows.item(i).display === 'false'){
        $scope.accountD.push({aid: res.rows.item(i).aid,aname:res.rows.item(i).name,ac_number:res.rows.item(i).acnumber,display:res.rows.item(i).display,balance:res.rows.item(i).balance,bg:$scope.colors[random_num]});
      }
      i++;
    }
  });
  //Function for delete accounts
  $scope.recover_acc = function(account_id,account_name,index){
    //alert(account_id);
    var query;
    query = "UPDATE ACC SET display = ? WHERE aid=?";
    $cordovaSQLite.execute(db,query,[true,account_id]).then(function(res){
      //alert("FUCK U");
    });
   $cordovaSQLite.execute(db,"SELECT * FROM ACC").then(function(res){
        var i=0;
        while(i<res.rows.length){
          //alert(res.rows.item(i).name + "------>"+res.rows.item(i).display);
          i++;
        }
      });
      //window.location.replace('#/tab/delete_account');
      $scope.accountD.splice(index,1);
   //$route.reload()
  }
})
.controller('deleteCatCtrl', function($scope) {
})
.controller('viewCatCtrl', function($scope) {
})
.controller('gCtrl', function($scope) {
  //window.location.replace('#/tab/recover_accounts');
})
.controller('AccDetailCtrl', function($scope,$stateParams,$cordovaSQLite) {
  //alert($stateParams.aid); 
  $scope.acc = [];
  $scope.ent = [];
  var random_num;
  $scope.t = "Account Detail";
  var i = 0;
  var account_name;
  $scope.colors = ['#99cc33','#009900','#ffcc00','#336633','#ff0099','#990099','#6633cc','#cc6633','#333333','#cc9933','#009999','#3399ff','#336699','#cc3333'];
  $cordovaSQLite.execute(db,"SELECT * FROM ACC WHERE aid=?",[$stateParams.aid]).then(function(res){
      random_num = res.rows.item(0).aid%14;
      $scope.acc.push({aid: res.rows.item(0).aid,aname:res.rows.item(0).name,ac_number:res.rows.item(0).acnumber,display:res.rows.item(0).display,balance:res.rows.item(0).balance,bg:$scope.colors[random_num]});
      //alert($scope.acc(0).aname);
      $scope.t = res.rows.item(0).name;
      account_name = res.rows.item(0).name;
  });
  $cordovaSQLite.execute(db,"SELECT * FROM ENT WHERE acc_name = (SELECT name FROM ACC WHERE aid=?)",[$stateParams.aid]).then(function(res){
      while(i < res.rows.length){
        //alert(res.rows.item(i).eid);
        $scope.ent.push({amount:res.rows.item(i).amount,date:res.rows.item(i).date,time:res.rows.item(i).time,des:res.rows.item(i).des,cat:res.rows.item(i).cat});
        i++;
      }
  });
  $scope.add_details = function(account_name){
    //alert('Want to add in '+account_name);
    acc_global_name = account_name;
    window.location.replace('#/tab/add_exp');
  }
  $scope.query = function(account_name){
    acc_global_name = account_name;
    window.location.replace('#/tab/query');
  }
})
//All the expense related thing go here.
.controller('expDetailCtrl', function($scope,$cordovaSQLite) {
  //alert(acc_global_name);
  $scope.t = acc_global_name;
  $scope.cat = [];
  var i=0;
  $cordovaSQLite.execute(db,"SELECT * FROM CAT",[]).then(function(res){
    while(i < res.rows.length){
      $scope.cat.push({name: res.rows.item(i).cat});
      i++;
    }
  });
  $scope.add_exp = function(){
    alert('Working');
    var flag = true;
    var bal = 0.00;
    var amount = document.getElementById('amount').value;
    //alert(amount);
    var date = document.getElementById('date').value;
    //alert(date);
    var des = document.getElementById('des').value;
    //alert(des);
    var select = document.getElementById("myselect");
    var index = select.selectedIndex;
    var cat = select.options[index].text;
    //alert(select.options[index].text);
    var time = document.getElementById('time').value;
    //alert(time);
    //upto this give be dec and flag
    if(flag){
      $cordovaSQLite.execute(db,"INSERT INTO ENT(acc_name,amount,date,time,des,cat) VALUES (?,?,?,?,?,?)",[acc_global_name,amount,date,time,des,cat]).then(function(res){
          //alert('INSERTED......');
      });
      $cordovaSQLite.execute(db,"SELECT balance from ACC WHERE name = ?",[acc_global_name]).then(function(res){
        //alert("Balance is "+ res.rows.item(0).balance);
        bal = res.rows.item(0).balance;
        $cordovaSQLite.execute(db,"UPDATE ACC SET balance=? WHERE name = ?",[bal-amount,acc_global_name]);
      });
    }
  }
})
.controller('tutCtrl', function($scope) {
})
.controller('queryCtrl', function($scope,$cordovaSQLite) {
  //alert('In query');
  //alert('in '+acc_global_name);
  $scope.cat = [];
  var i =0;
  $cordovaSQLite.execute(db,"SELECT * FROM CAT",[]).then(function(res){
    //alert(res.rows.length);
    while(i < res.rows.length){
      $scope.cat.push({name: res.rows.item(i).cat});
      i++;
    }
  });
  $scope.t = acc_global_name;
  var flag = true;
  $scope.search_exp = function(){
    //alert('search exp');
    global_from = document.getElementById('from').value;
    global_to= document.getElementById('to').value;
    var select = document.getElementById("myselect");
    var index = select.selectedIndex;
    global_cat = select.options[index].text;
    alert(global_from +" "+global_to+" "+global_cat);
    window.location.replace('#/tab/show_results');
  }
})
.controller('showResultsCtrl', function($scope,$cordovaSQLite) {
  $scope.t = acc_global_name;
  $scope.acc = [];
  $scope.ent = [];
  var size;
  var random_num;
  var i =0;
  $scope.arr = [global_from,global_to];
  $scope.colors = ['#99cc33','#009900','#ffcc00','#336633','#ff0099','#990099','#6633cc','#cc6633','#333333','#cc9933','#009999','#3399ff','#336699','#cc3333'];
  $cordovaSQLite.execute(db,"SELECT * FROM ACC WHERE name=?",[acc_global_name]).then(function(res){
      //alert('IN IT');
      //alert(res.rows.length);
      random_num = res.rows.item(0).aid%14;
      $scope.acc.push({aid: res.rows.item(0).aid,aname:res.rows.item(0).name,ac_number:res.rows.item(0).acnumber,display:res.rows.item(0).display,balance:res.rows.item(0).balance,bg:$scope.colors[random_num]});
      //alert(res.rows.item(0).name);
  });
  if(global_cat === 'All'){
    $cordovaSQLite.execute(db,"SELECT * FROM ENT WHERE date <= ? AND date >= ?",[global_to,global_from]).then(function(res){
        while(i < res.rows.length){
        //alert(res.rows.item(i).eid);
        $scope.ent.push({amount:res.rows.item(i).amount,date:res.rows.item(i).date,time:res.rows.item(i).time,des:res.rows.item(i).des,cat:res.rows.item(i).cat});
        i++;
      }
    });
  }
  if(global_cat != 'All'){
    $cordovaSQLite.execute(db,"SELECT * FROM ENT WHERE date <= ? AND date >= ? AND cat = ?",[global_to,global_from,global_cat]).then(function(res){
        while(i < res.rows.length){
        //alert(res.rows.item(i).eid);
        $scope.ent.push({amount:res.rows.item(i).amount,date:res.rows.item(i).date,time:res.rows.item(i).time,des:res.rows.item(i).des,cat:res.rows.item(i).cat});
        i++;
      }
    });
  }
  var data_dou = [];
  var data = {
    labels: [],
    datasets: [
        {
            label: "My Second dataset",
            fillColor: "rgba(151,187,205,0.2)",
            strokeColor: "rgba(151,187,205,1)",
            pointColor: "rgba(151,187,205,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(151,187,205,1)",
            data: []
        }
    ]
};
var pieOptions = {
  segmentShowStroke : false,
  animateScale : true
}
  var buyers = document.getElementById('buyers').getContext('2d');
  var myRadarChart = new Chart(buyers).Radar(data, pieOptions);
  var dou = document.getElementById('dou').getContext('2d');
  var newc = new Chart(dou).Doughnut(data_dou, {
    animateScale: true
  });
  /*myRadarChart.addData([100], "");
  myRadarChart.addData([60], "Dancing");
  myRadarChart.addData([35], "Running");
  myRadarChart.addData([70], "Global");*/
  var j =0;
  var k = 0;
  var cat = [];
  var spent = [];
  var search_cat;
  var spent_cat;
  $scope.total_spent = 0.00;
  $cordovaSQLite.execute(db,"SELECT sum(amount) as s FROM ENT where date >= ? AND date <= ?",[global_from,global_to]).then(function(res){
      myRadarChart.addData([res.rows.item(0).s],"Total");
  });
  $cordovaSQLite.execute(db,"select c.cat as k,sum(i.amount) as s from CAT c left outer join ENT i on i.cat=c.cat and i.date >= ? and i.date <= ?group by c.cat",[global_from,global_to]).then(function(res){
      while(j<res.rows.length){
        myRadarChart.addData([res.rows.item(j).s],res.rows.item(j).k);
        $scope.total_spent +=res.rows.item(j).s;
        newc.addData({
            value: res.rows.item(j).s,
            color: '#'+(Math.random()*0xFFFFFF<<0).toString(16),
            highlight: "#C69CBE",
            label: res.rows.item(j).k
        });
        j++;
      }
  });
});