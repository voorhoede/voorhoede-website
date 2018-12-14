/* eslint-disable */

(function () {
  'use strict';

  var checklist = document.querySelector('[data-design-checklist]');

  var forEachSupport = ('forEach' in Array.prototype);
  var hasQuerySelectorSupport = ('querySelector' in document && 'querySelectorAll' in document);
  var hasClassListSupport = ('classList' in document.documentElement);
  var hasHiddenSupport = ("hidden" in document.createElement('div'));

  // check for localStorage support. Due to a bug in older versions of Firefox, this test will raise an exception
  // if cookies are disabled, so the entire test is wrapped in a try..catch statement.
  // http://diveintohtml5.info/detect.html#storage
  function supportsLocalStorage() {
    try {
      return 'localStorage' in window && window['localStorage'] !== null;
    } catch (e) {
      return false;
    }
  }

  //only enhance if the following feautures are supported
  if (forEachSupport &&
    hasQuerySelectorSupport &&
    hasClassListSupport &&
    supportsLocalStorage &&
    hasHiddenSupport) {
    initEnhancedChecklist();
  }

  function initEnhancedChecklist() {
    var VISIBLE_CLASS = 'is-visible';
    var groups = listNodes(document, '[data-checkbox-group]');
    var checkboxes = listNodes(document, '[data-checkbox]');
    var inputs = listNodes(document, 'input');
    var expandibles = listNodes(document, '[data-expandible]');
    var clearHandle = document.querySelector('[data-clear-handle]');
    var persistentCheckboxesInfo = document.querySelector('[data-persistent-checkboxes]')

    persistentCheckboxesInfo.classList.add(VISIBLE_CLASS);
    clearHandle.classList.add(VISIBLE_CLASS);

    groups.forEach(function (group) {
      group.addEventListener('click', function (event) {
        var collectiveInput = group.querySelector('[data-collective-input]');
        var individualInputs = listNodes(group, '[data-individual-input]');
        var targetIsCheckbox = event.target.type === 'checkbox';
        var targetIsCollective = event.target.hasAttribute('data-collective-input');
        var targetIsIndividual = event.target.hasAttribute('data-individual-input');

        if (event.target && targetIsCheckbox) {

          if (targetIsCollective) {
            individualInputs.forEach(function (individualInput) {
              setCheckboxState(individualInput, collectiveInput.checked);
              addToLocalStorage(individualInput);
            });
          }
          if (targetIsIndividual) {
            var allChecked = individualInputs.every(function (element) {
              return element.checked;
            });

            if (allChecked) {
              setCheckboxState(collectiveInput, true);
            } else {
              setCheckboxState(collectiveInput, false);
            }
            addToLocalStorage(collectiveInput);
          }
        }
      });
    });

    inputs.forEach(function (input) {
      if (localStorage.getItem(input.id) === "true") {
        setCheckboxState(input, true);
      }

      input.addEventListener('change', function(e) {
        addToLocalStorage(input);
      });
    });

    clearHandle.addEventListener('click', function() {
      localStorage.clear();
      inputs.forEach(function (input) {
        setCheckboxState(input, false);
      })
    })

    expandibles.forEach(function (expandible) {
      var expandibleHandle = expandible.querySelector('[data-expandible-handle]');
      var expandibleContent = expandible.querySelector('[data-expandible-content]');

      expandible.className += (' is-expandible-item');
      expandibleContent.setAttribute('hidden', '');

      expandibleHandle.addEventListener('click', function() {
        toggleHidden(expandibleContent);
      })
    });
  }

  function toggleHidden(element) {
    element.hasAttribute('hidden') ? element.removeAttribute('hidden') : element.setAttribute('hidden', '');
  }

  function setCheckboxState(input, state) {
    input.checked = state;
  };

  function addToLocalStorage(input) {
    localStorage.setItem(input.id, JSON.stringify(input.checked));
  };

  /**
   * Convert node list to array
   */
  function listNodes(context, selector) {
    return Array.prototype.slice.call(context.querySelectorAll(selector));
  }

}());
/* eslint-enable */
