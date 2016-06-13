app.controller('User', function($scope, user, reviews, loggedInUser){

	$scope.user = user;

	$scope.stars= new Array(5);

	$scope.reviews = reviews;

	$scope.getStars = function(arr){
		var sum = 0;
		arr.forEach(function(item){
			sum += item.stars
		})
		return Math.round((sum/arr.length)*10)/10;
	}

	$scope.loggedInUser = loggedInUser;

	$scope.loggedInFilter = function(loggedInUser,userOfPage) {
		return loggedInUser.id === userOfPage.id || loggedInUser.isAdmin ===true
	}
})

