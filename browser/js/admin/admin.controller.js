app.controller('AdminCtrl', function($scope, AdminFactory, locations, orders){
    
    $scope.orders = orders;

    // $scope.users = users;

    $scope.createProduct = AdminFactory.createProduct;

    $scope.locations = locations;

});