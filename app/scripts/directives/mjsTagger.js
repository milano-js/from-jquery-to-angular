'use strict';

/**
 * @ngdoc directive
 * @name mjsTalkApp.directive:tagger
 * @description
 * # tagger
 */
angular.module('mjsTalkApp')
  .directive('mjsTagger', function () {
    return {
      restrict: 'E',
      scope: {
        unique : '@unique',
        dirTagList : '=tags'
      },
      template:
        '<div class="row master-blaster">' +
          '<div class="col-lg-6">' +
            '<form ng-submit="addTag()">' +
              '<div class="input-group">' +
                '<button class="btn btn-primary" style="margin: 0 10px 10px 0;" ng-repeat="obj in dirTagList track by $index" type="button">{{obj}}' +
                  '<span ng-click="removeTag($index)" class="glyphicon glyphicon-remove"></span>' +
                '</button>' +
              '</div>' +
              '<div class="input-group">' +
                '<input type="text" ng-model="newTag" class="form-control">' +
                '<span class="input-group-btn">' +
                  '<button class="btn btn-default" type="submit"  ng-disabled="tagger.tags.length >= maxTags" >' +
                    '<span class="glyphicon glyphicon-plus"> Tag</span>' +
                  '</button>' +
                '</span>' +
              '</div>' +
            '</form>' +
          '</div>' +
        '</div>',

      link: function postLink(scope) {
        var unique = scope.unique === undefined ? true : scope.$eval(scope.unique);
        scope.newTag = '';

        scope.addTag = function() {
          if (!unique || (unique && scope.dirTagList.indexOf(scope.newTag) === -1)) {
            scope.dirTagList.push(scope.newTag);
            scope.newTag = '';
          }
        };

        scope.removeTag = function($index) {
          scope.dirTagList.splice($index, 1);
        };
      }
    };
  });
