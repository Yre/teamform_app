//eventCtrl
app.controller("eventCtrl", 

	// Implementation the todoCtrl 
	function($scope, Auth, $firebaseArray, $firebaseObject, Helper, $ionicPopup) {
		Auth.$onAuthStateChanged(function(authData){
            if (authData){
                $scope.authData = authData;
                //console.log(authData.uid);
                var ref = firebase.database().ref('users/' + authData.uid + '/writable');
                $scope.myEvents = $firebaseObject(ref);

                ref = firebase.database().ref('events');
                $scope.events = $firebaseArray(ref);

                // $scope.AllEvents = $firebaseObject(ref);


                //ref.orderByChild("eventInfo.name").equalTo($scope.input.searchName).on("child_added", function(snapshot) {
                //    console.log(snapshot);
                //});





            }
            else console.log("signed out");
		});




        $scope.input={
            name:"",
            ddl: "",
            min:"",
            max:"",
            desc:"",
            searchName:""
        }

        // var dialog;
        $scope.createEventDialog = function(){
            // dialog = ngDialog.open({
            //     template: 'templates/createEvent.html',
            //     className: 'ngdialog-theme-plain',
            //     scope: $scope
            // });

			var myPopup = $ionicPopup.show({
				templateUrl: 'templates/createEvent.html', //'<input type="password" ng-model="data.wifi">',
				title: 'Create an event',
				subTitle: 'Please use normal things',
				scope: $scope,
				// buttons: [
				// { text: 'Cancel' },
				// {
				// 	text: '<b>Save</b>',
				// 	type: 'button-positive',
				// 	onTap: function(e) {
				// 	if (!$scope.data.wifi) {
				// 		//don't allow the user to close unless he enters wifi password
				// 		e.preventDefault();
				// 	} else {
				// 		return $scope.data.wifi;
				// 	}
				// 	}
				// }
				// ]
			});
        };


        $scope.submit = function(){

            var event = {
                eventInfo:
                {name:"",
                ddl:"",
                min:"",
                max:"",
                desc:""}

            };


            event.eventInfo.name = $scope.input.name;
            event.eventInfo.min = $scope.input.min;
            event.eventInfo.max = $scope.input.max;
            event.eventInfo.desc = $scope.input.desc;



            event.eventInfo.ddl = $scope.input.ddl.toJSON();

            event.eventInfo.isClosed = false;
            //console.log(event);


            event.eventInfo.admin = $scope.authData.uid;
            Helper.createEvent($scope.authData.uid,event);

            // dialog.close();



        }




		console.log("event");
	}
);