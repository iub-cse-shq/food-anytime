angular.module('orderController', [])

	.controller('mainController', ['$scope','$http','Orders', function($scope, $http, Orders) {
		$scope.formData = {};
		$scope.loading = true;

		var menu = {
    'foodList': [{
        'name': 'Pizza',
        'price': '1200'
    }, {
        'name': 'Biriani',
        'price': '200'
    }, {
        'name': 'Chicken Kabab',
        'price': '150'
    },
		{
				'name': 'Burger',
				'price': '500'
		},
		{
        'name': 'Chicken Roll',
        'price': '300'
    },
		{
				'name': 'HotDog',
				'price': '250'
		},
		{
				'name': 'Coffee',
				'price': '100'
		},
		{
				'name': 'Chocolate Milkshake',
				'price': '200'
		}],
    'valueSelected': {
        'name': ' Barbecue Chicken',
        'price': '600'
    }
}

		$scope.selectedValue = menu['valueSelected'];
		$scope.foodList = menu['foodList'];


		Orders.get()
			.success(function(data) {
				$scope.orders = data;
				$scope.loading = false;
			});

		$scope.createOrder = function() {

			var order = {};

			if ($scope.formData.name != undefined) {
				$scope.loading = true;

				for(var i=0; i < menu.foodList.length; i++) {
					if(menu.foodList[i]['name'] == $scope.formData.name) {
						order = menu.foodList[i];
						break;
					}

				}

				Orders.create(order)

				
					.success(function(data) {
						$scope.loading = false;
						$scope.formData = {}; 
						$scope.orders = data; 
					});

					$scope.getTotal();
			}
		};

	
		$scope.deleteOrder = function(id) {
			$scope.loading = true;

			Orders.delete(id)
				
				.success(function(data) {
					$scope.loading = false;
					$scope.orders = data;
				});

				$scope.getTotal();
		};

	
		$scope.getTotal = function() {
			Orders.calculate()
				.success(function(data) {
					var total = 0;
					
					for(var i=0; i<data.length; i++)
							total += data[i].price;
					total = total + total * 0.075;
					$scope.total = total.toFixed(2);

			});
		};

	}]);
