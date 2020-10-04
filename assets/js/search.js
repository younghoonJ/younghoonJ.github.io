---
layout: none
---

function initSearch() {
  var koSupportTrimmer = function (token) {
    return token.update(function (s) {
      return s.replace(/^[^\w가-힣]+/, "").replace(/[^\w가-힣]+$/, "");
    });
  };

  var request = new XMLHttpRequest();
  request.open("GET", '{{ "assets/search-data.json" | absolute_url }}', true);
  request.onload = function () {
    if (request.status >= 200 && request.status < 400) {
      var docs = JSON.parse(request.responseText);

      var index = lunr(function () {
        this.pipeline.reset();
        this.pipeline.add(koSupportTrimmer, lunr.stopWordFilter, lunr.stemmer);
        this.ref("id");
        this.field("doc");
        this.field("title", { boost: 200 });
        this.field("author");
        this.field("relUrl");
        this.field("category");
        this.field("tags");
        for (var i in docs) {
          // Add the data to lunr
          this.add({
            id: i,
            doc: docs[i].doc,
            title: docs[i].title,
            author: docs[i].author,
            relUrl: docs[i].relUrl,
            category: docs[i].category,
            tags: docs[i].tags,
          });
        }
      });
      searchLoaded(index, docs);
    } else {
      console.log("Error loading ajax request. Request status:" + request.status);
    }
  };

  request.onerror = function () {
    console.log("There was a connection error");
  };

  request.send();
}

function searchLoaded(index, docs) {
  var index = index;
  var docs = docs;
  var searchInput = document.getElementById("search-input");
  var searchResults = document.getElementById("search-results");
  var currentInput;
  var currentSearchIndex = 0;

  function showSearch() {
    document.documentElement.classList.add("search-active");
  }
  
  function hideSearch() {
    document.documentElement.classList.remove("search-active");
  }

  console.log("search loaded");

  function update() {
    currentSearchIndex++;
    
    var input = searchInput.value;
    console.log(input);
    if (input === "") {
      hideSearch();
    } else {
      showSearch();
      window.scroll(0, -1);
      setTimeout(function () {
        window.scroll(0, 0);
      }, 0);
    }
    if (input === currentInput) {
      return;
    }
    currentInput = input;
    searchResults.innerHTML = "";
    if (input === "") {
      return;
    }

    var results = index.search(input);
    console.log(results);
    if (results.length > 0) {
      var resultsList = document.createElement("ul");
      resultsList.classList.add("search-results-list");
      searchResults.appendChild(resultsList);

      addResults(resultsList, results, 0, 10, 100, currentSearchIndex);
    } else {
      var noResultsDiv = document.createElement("div");
      noResultsDiv.classList.add("search-no-result");
      noResultsDiv.innerText = "No results found";
      searchResults.appendChild(noResultsDiv);
    }

    function addResults(resultsList, results, start, batchSize, batchMillis, searchIndex) {
      if (searchIndex != currentSearchIndex) {
        return;
      }
      for (var i = start; i < start + batchSize; i++) {
        if (i == results.length) {
          return;
        }
        addResult(resultsList, results[i]);
      }
      setTimeout(function () {
        addResults(resultsList, results, start + batchSize, batchSize, batchMillis, searchIndex);
      }, batchMillis);
    }

    function addResult(resultsList, result) {
      var doc = docs[result.ref];

      var resultsListItem = document.createElement("li");
      resultsListItem.classList.add("search-results-list-item");
      resultsList.appendChild(resultsListItem);

      var resultLink = document.createElement("a");
      resultLink.classList.add("search-result");
      resultLink.setAttribute("href", doc.relUrl);
      resultsListItem.appendChild(resultLink);

      var resultTitle = document.createElement("div");
      resultTitle.classList.add("search-result-title");
      resultTitle.classList.add('container');
      resultLink.appendChild(resultTitle);

      var resultDoc = document.createElement('div');
      resultDoc.classList.add('search-result-doc');
      resultDoc.innerHTML = doc.title;
      resultTitle.appendChild(resultDoc);
    }
  }

  searchInput.addEventListener('focus', function(){setTimeout(update, 0)});
  searchInput.addEventListener('keyup', function(e){
    switch (e.keyCode) {
      case 27: // When esc key is pressed, hide the results and clear the field
        searchInput.value = '';
        break;
      case 38: // arrow up
      case 40: // arrow down
      case 13: // enter
        e.preventDefault();
        return;
    }
    update();
  });
  searchInput.addEventListener('keydown', function(e){
    console.log("keydown");
    switch (e.keyCode) {
      case 38: // arrow up
        e.preventDefault();
        var active = document.querySelector('.search-result.active');
        if (active) {
          active.classList.remove('active');
          if (active.parentElement.previousSibling) {
            var previous = active.parentElement.previousSibling.querySelector('.search-result');
            previous.classList.add('active');
          }
        }
        return;
      case 40: // arrow down
        e.preventDefault();
        var active = document.querySelector('.search-result.active');
        if (active) {
          if (active.parentElement.nextSibling) {
            var next = active.parentElement.nextSibling.querySelector('.search-result');
            active.classList.remove('active');
            next.classList.add('active');
          }
        } else {
          var next = document.querySelector('.search-result');
          if (next) {
            next.classList.add('active');
          }
        }
        return;
      case 13: // enter
        e.preventDefault();
        var active = document.querySelector('.search-result.active');
        if (active) {
          active.click();
        } else {
          var first = document.querySelector('.search-result');
          if (first) {
            first.click();
          }
        }
        return;
    }
  });
  document.addEventListener('click', function(e){
    if (e.target != searchInput) {
      hideSearch();
    }
  });

}
