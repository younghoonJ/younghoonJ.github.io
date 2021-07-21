---
---


function getFromJson(callback) {
  var obj;
  fetch("{{"/assets/search_index.json" | prepend: site.baseurl }}")
    .then(res => res.json())
    .then(data => obj = data)
    .then(() => callback(obj))
}

function getQueryVariable(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split('&');

  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split('=');

    if (pair[0] === variable) {
      return decodeURIComponent(pair[1].replace(/\+/g, '%20'));
    }
  }
}

function displaySearchResult(filtered, search_index){
  var searchResluts = document.getElementById("search-results");
  if (filtered.length){
    var appendString = "";

    for (var i = 0; i < filtered.length; i++){
      var item = search_index[filtered[i].ref];
      appendString += '<a href="' + item.url + '">'
                      + '<div class="px-2 my-1 py-3">'
                        + '<div class="my-1 py-1 text-xs flex justify-left items-center">'
                          + '<span class="text-orange-700"><time>' + item.date + '</time></span>'
                          + '&nbsp;'
                          + '<span class="text-purple-700"><time>' + item.author + '</time></span>'
                        + '</div>'
                        + '<div class="py-2 text-xl text-gray-800">' + item.title + '</div>'
                        + '<div class="pb-2 text-md text-blue-400">'
                          + '<span class="text-sm text-gray-500">tags: </span>' + item.tags.join(', ') + '</div>'
                      + '</div>'
                    + '</a>';
    }

    searchResluts.innerHTML = appendString;
  } else {
    searchResults.innerHTML = '<li>No results found</li>';
  }
}

var searchTerm = getQueryVariable("query");

if (searchTerm) {
  document.getElementById("search-input").setAttribute("value", searchTerm);

  getFromJson(function (search_index) {
    var idx = lunr(function () {
      this.ref('id');
      this.field('title', { boost: 10 });
      this.field('category');
      this.field('tags');
      this.field('url');
      this.field('author');
      this.fetch('content')
      search_index.forEach(ind => { this.add(ind) });
    })

    displaySearchResult(idx.search(searchTerm), search_index);
  });
}
