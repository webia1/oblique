﻿(function () {
	'use strict';

	/**
	 * Wrapper for UI Bootstrap `datepicker` directive:
	 * https://angular-ui.github.io/bootstrap/#/datepicker
	 */
	angular.module('__MODULE__.oblique')
	.directive('datePicker', function (datepickerPopupConfig) {
		return {
			templateUrl: '../oblique/ui/date-picker/date-picker.tpl.html',
			restrict: 'E',
			replace: true,
			scope: {
				ngModel: '=',
				options: '&?', // See UI Bootstrap `datepicker` 'Popup Settings'
				disabled: '=?ngDisabled',
				required: '=?ngRequired',
				editable: '=?', // Manual edition
				label: '@label',
				name: '@',
				controlId: '@',
				controlSize: '@', // 'sm'
				showClearControl: '=?'
			},
			controller : function($scope) {
				$scope.config = angular.extend({}, datepickerPopupConfig, $scope.options || {});
				$scope.editable = angular.isDefined($scope.editable) ? $scope.editable : true;
				$scope.showClearControl = angular.isDefined($scope.showClearControl) ? $scope.showClearControl : true;
				$scope.opened = false;

				// Public API:
				this.format = $scope.config.datepickerPopup;
			},
			link: function (scope, element, attrs) {

				scope.toggle = function ($event) {
					$event.preventDefault();
					$event.stopPropagation();

					scope.opened = !scope.opened;
				};

				scope.clear = function () {
					scope.ngModel = null;
				};

				// Bind event listeners:
				element.keydown(function(e) {
					var control = element.find('input[name=' + scope.name + ']');
					if(angular.element(e.target).is(control) && e.keyCode === 40) { // 40: ArrowDown
						scope.$apply(function (){
							scope.toggle(e);
						});
					}
				});
			}
		};
	})

	/**
	 * Date validation extension for accepting ISO-formatted date strings,
	 * as they are not more accepted by AngularUI v0.13.3.
	 *
	 * See:
	 *  - https://github.com/angular-ui/bootstrap/issues/4233
	 */
	.directive("datepickerPopup", function(dateFilter, $dateParser, datepickerPopupConfig) {
		return {
			restrict: "A",
			priority: 1000,
			require: ["ngModel", "^datePicker"],
			link: function(scope, element, attrs, params) {
				var ngModel = params[0];
				var datePicker = params[1];
				var dateFormat = datePicker.format || datepickerPopupConfig.datepickerPopup;
				var originalValidator = ngModel.$validators.date;

				ngModel.$validators.date = function(modelValue, viewValue) {
					var valid = originalValidator(modelValue, viewValue);
					if(!valid) {
						// Try to validate again as date may originate from an ISO-formatted date:
						var date = $dateParser(viewValue, dateFormat);
						valid = viewValue === null || viewValue === '' || angular.isDate(date);
					}
					return valid;
				};
			}
		};
	});
}());
