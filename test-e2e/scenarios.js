'use strict';

describe('mjsTagger', function() {
  var addButton, inputText, tagList;

  beforeEach(function() {
    browser.get('index.html');
    addButton = element(by.css('.row.master-blaster button[type="submit"]'));
    inputText = element(by.model('newTag'));
    tagList = element.all(by.repeater('obj in dirTagList'));
  });

  it('should have initialized with one tag', function() {
    expect(tagList.count()).toBe(1);
    tagList.first().getText().then(function(text) {
      expect(text).toBe('nice');
    });
  });

  it('should add a tag', function() {
    inputText.sendKeys('harder');
    addButton.click();
    expect(tagList.count()).toBe(2);
    tagList.last().getText().then(function(text) {
      expect(text).toBe('harder');
    });
  });

  it('should remove a tag', function() {
    inputText.sendKeys('harder');
    addButton.click();
    tagList.last().element(by.css('span')).click();
    expect(tagList.count()).toBe(1);
  });

  it('should not add a tag already added', function() {
    inputText.sendKeys('harder');
    addButton.click();
    inputText.sendKeys('harder');
    addButton.click();
    expect(tagList.count()).toBe(2);
    tagList.last().getText().then(function(text) {
      expect(text).toBe('harder');
    });
  });

  it('should not add an empty tag', function() {
    addButton.click();
    expect(tagList.count()).toBe(1);
    tagList.first().getText().then(function(text) {
      expect(text).toBe('nice');
    });
  });

  it('should disable the button after maximum number of tags reached', function() {
    expect(addButton.getAttribute('disabled')).toBeFalsy();
    inputText.sendKeys('harder');
    addButton.click();
    inputText.sendKeys('better');
    addButton.click();
    inputText.sendKeys('faster');
    addButton.click();
    inputText.sendKeys('stronger');
    addButton.click();
    expect(tagList.count()).toBe(5);
    expect(addButton.getAttribute('disabled')).toBeTruthy();
  });
});
