app.controller('User', function($scope, user){
	console.log(user)
	$scope.user = user;
	//console.log($scope.user);
	$scope.stars= new Array(user.rating);
})