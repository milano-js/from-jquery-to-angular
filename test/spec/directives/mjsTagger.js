'use strict';

describe('Directive: x-mjs-tagger', function () {

  // load the directive's module
  beforeEach(module('mjsTalkApp'));

  var element,
    $scope,
    directiveScope;

  beforeEach(inject(function ($rootScope) {
    $scope = $rootScope.$new();
  }));

  function compileDirective(html) {
    inject(function ($compile) {
      element = angular.element(html);
      $compile(element)($scope);
      directiveScope = element.isolateScope();
    });
  }

  it('should have "tagList" as two-way binding', function() {
    $scope.tagList = ['a', 'b'];
    compileDirective('<x-mjs-tagger tags="tagList"></x-mjs-tagger>');
    expect(directiveScope.dirTagList).toEqual(['a', 'b']);
  });

  it('should add a tag', function() {
    $scope.tagList = ['a', 'b'];
    compileDirective('<x-mjs-tagger tags="tagList"></x-mjs-tagger>');
    directiveScope.newTag = 'c';
    directiveScope.addTag();
    expect(directiveScope.dirTagList.length).toBe(3);
    expect(directiveScope.dirTagList).toEqual(['a', 'b', 'c']);
  });

  it('should remove a tag', function() {
    $scope.tagList = ['a', 'b', 'c'];
    compileDirective('<x-mjs-tagger tags="tagList"></x-mjs-tagger>');
    directiveScope.removeTag(1);
    expect(directiveScope.dirTagList.length).toBe(2);
    expect(directiveScope.dirTagList).toEqual(['a', 'c']);
  });

  it('should add a tag if already present and unique="false"', function() {
    $scope.tagList = ['a', 'b', 'c'];
    compileDirective('<x-mjs-tagger tags="tagList" unique="false"></x-mjs-tagger>');
    directiveScope.newTag = 'c';
    directiveScope.addTag();
    expect(directiveScope.dirTagList.length).toBe(4);
    expect(directiveScope.dirTagList).toEqual(['a', 'b', 'c', 'c']);
  });

  it('should not add a tag if already present and unique="true"', function() {
    $scope.tagList = ['a', 'b', 'c'];
    compileDirective('<x-mjs-tagger tags="tagList" unique="true"></x-mjs-tagger>');
    directiveScope.newTag = 'c';
    directiveScope.addTag();
    expect(directiveScope.dirTagList.length).toBe(3);
    expect(directiveScope.dirTagList).toEqual(['a', 'b', 'c']);
  });
});
