---
---

let pagesIndex, searchIndex
const MAX_SUMMARY_LENGTH = 50
{% comment %}
const SENTENCE_BOUNDARY_REGEX = /\b\.\s/gm
{% endcomment %}
const SENTENCE_BOUNDARY_REGEX = /[^\.!\?]+[\.!\?]+/gm
const WORD_REGEX = /\b(\w*)[\W|\s|\b]?/gm


async function initSearchIndex() {
  try {
    await fetch("{{"/assets/search_index.json" | prepend: site.baseurl }}")
      .then(res => res.json())
      .then(data => pagesIndex = data);

    index = lunr(function () {
      this.ref('id');
      this.field('title');
      this.field('category');
      this.field('tags');
      this.field('author');
      this.field('content');
      this.field('url')
      pagesIndex.forEach(ind => { this.add(ind) });
    })
  } catch (e) {
    console.log(e);
  }
}


function handleSearchQuery(event) {
  event.preventDefault();
  const query = document.getElementById("search").value.trim().toLowerCase();

  if (!query) {
    displayErrorMessage("Please enter a search term");
    return;
  }
  const results = performSearch(query);
  renderSearchResults(query, results)
}


function displayErrorMessage(message) {
  document.getElementById("search-header").innerHTML = message;
}


function getLunrSearchQuery(query) {
  const searchTerms = query.split(" ");
  if (searchTerms.length === 1) {
    return query;
  }
  query = "";
  for (const term of searchTerms) {
    query += `+${term} `;
  }
  return query.trim();
}


function getSearchResults(query) {
  return index.search(query).flatMap((hit) => {
    if (hit.ref == "undefined") return [];
    let pageMatch = pagesIndex.filter((page) => page.id == hit.ref)[0];
    pageMatch.score = hit.score;
    return [pageMatch];
  });
}


function performSearch(query) {
  const inputQuery = query;
  query = getLunrSearchQuery(query);
  let results = getSearchResults(query);
  if (results.length == 0 && query !== inputQuery) {
    return getSearchResults(inputQuery);
  }
  return results;
}


function createQueryStringRegex(query) {
  const searchTerms = query.split(" ");
  if (searchTerms.length == 1) {
    return query;
  }
  query = "";
  for (const term of searchTerms) {
    query += `${term}|`;
  }
  query = query.slice(0, -1);
  return `(${query})`;
}


function tokenize(input) {
  const wordMatches = Array.from(input.matchAll(WORD_REGEX), (m) => m);
  return wordMatches.map((m) => ({
    word: m[0],
    start: m.index,
    end: m.index + m[0].length,
    length: m[0].length,
  }));
}


function processSearchResultContent(query, pageTags, pageContent) {

  let searchResultText = "";
  
  const serachQueryRegexForTags = new RegExp(createQueryStringRegex(query), "i");
  tags = pageTags.split(" ; ").filter(tag => serachQueryRegexForTags.test(tag))
  searchResultText += "tags[" + tags.join(", ") + "]..."

  const searchQueryRegex = new RegExp(createQueryStringRegex(query), "gmi");
  const searchQueryHits = Array.from(pageContent.matchAll(searchQueryRegex), m => m.index);
  const sentenceBoundaries = Array.from(pageContent.matchAll(SENTENCE_BOUNDARY_REGEX), m => m.index);
  
  if (sentenceBoundaries[0] == 0) sentenceBoundaries[0] = -1;

  let lastEndOfSentence = 0;
  for (const hitLocation of searchQueryHits) {
    if (hitLocation > lastEndOfSentence) {
      for (let i = 0; i < sentenceBoundaries.length; i++) {
        if (sentenceBoundaries[i] > hitLocation) {
          const startOfSentence = i > 0 ? sentenceBoundaries[i - 1] + 1 : 0;
          const endOfSentence = sentenceBoundaries[i];
          lastEndOfSentence = endOfSentence;
          parsedSentence = pageContent.slice(startOfSentence, endOfSentence).trim();
          searchResultText += `${parsedSentence} ... `;
          break;
        }
      }
    }
    const searchResultWords = tokenize(searchResultText);
    const pageBreakers = searchResultWords.filter((word) => word.length > 50);
    if (pageBreakers.length > 0) {
      searchResultText = fixPageBreakers(searchResultText, pageBreakers);
    }
    if (searchResultWords.length >= MAX_SUMMARY_LENGTH) break;
  }
  return ellipsize(searchResultText, MAX_SUMMARY_LENGTH).replace(
    searchQueryRegex,
    "<strong>$&</strong>"
  );
}


function fixPageBreakers(input, largeWords) {
  largeWords.forEach((word) => {
    const chunked = chunkify(word.word, 20);
    input = input.replace(word.word, chunked);
  });
  return input;
}


function chunkify(input, chunkSize) {
  let output = "";
  let totalChunks = (input.length / chunkSize) | 0;
  let lastChunkIsUneven = input.length % chunkSize > 0;
  if (lastChunkIsUneven) {
    totalChunks += 1;
  }
  for (let i = 0; i < totalChunks; i++) {
    let start = i * chunkSize;
    let end = start + chunkSize;
    if (lastChunkIsUneven && i === totalChunks - 1) {
      end = input.length;
    }
    output += input.slice(start, end) + " ";
  }
  return output;
}


function ellipsize(input, maxLength) {
  const words = tokenize(input);
  if (words.length <= maxLength) {
    return input;
  }
  return input.slice(0, words[maxLength].end) + "...";
}


if (!String.prototype.matchAll) {
  String.prototype.matchAll = function (regex) {
    "use strict";
    function ensureFlag(flags, flag) {
      return flags.includes(flag) ? flags : flags + flag;
    }
    function* matchAll(str, regex) {
      const localCopy = new RegExp(regex, ensureFlag(regex.flags, "g"));
      let match;
      while ((match = localCopy.exec(str))) {
        match.index = localCopy.lastIndex - match[0].length;
        yield match;
      }
    }
    return matchAll(this, regex);
  };
}


function getColorForSearchResult(score) {
  const highQualityHue = 171;
  const lowQualityHue = 212;
  return adjustHue(highQualityHue, lowQualityHue, score);
}


function adjustHue(hue1, hue2, score) {
  if (score > 3) return `hsl(${hue1}, 100%, 50%)`;
  const hueAdjust = (parseFloat(score) / 3) * (hue1 - hue2);
  const newHue = hue2 + Math.floor(hueAdjust);
  return `hsl(${newHue}, 100%, 50%)`;
}


function renderSearchResults(query, results) {
  document.getElementById("section-normal").classList.add("hidden");
  document.getElementById("section-search-results").classList.remove("hidden");
  
  updateSearchResults(query, results);
  scrollToTop();
}


function updateSearchResults(query, results) {
  document.getElementById("search-header").innerHTML =
    `Your search "<span id="query" class="font-medium text-rose-500">${query}</span>" returned <span id="results-count"></span>&nbsp;<span id="results-count-text"></span>.`

    document.getElementById("search-results-list").innerHTML = results
    .map(item =>
      `
      <a href="${item.url}" class="">
        <div class="search-result-item px-4 py-3 data-score="${item.score.toFixed(2)}">
          <div class="px-2">
            <div class="py-2 text-xl text-gray-800">${item.title}</div>
            <div class="text-xs flex justify-left items-center">
            <span class="text-orange-700"><time>${item.date}</time></span>
            &nbsp;
            <span class="text-purple-700">${item.author}</span>
            </div>
            <div class="pb-2 text-sm text-blue-400">
              <p>${processSearchResultContent(query, item.tags, item.content)}</p>
            </div>
          </div>
        </div>
      </a>
      `
    )
    .join("");
  const searchResultListItems = document.querySelectorAll("#search-results-list .search-result-item");
  document.getElementById("results-count").innerHTML = searchResultListItems.length;
  document.getElementById("results-count-text").innerHTML = searchResultListItems.length > 1 ? "results" : "result";

  searchResultListItems.forEach(
    item => (item.firstElementChild.style.color = getColorForSearchResult(item.dataset.score))
  );
}

function scrollToTop() {
  const toTopInterval = setInterval(function () {
    const supportedScrollTop = document.body.scrollTop > 0 ? document.body : document.documentElement;
    if (supportedScrollTop.scrollTop > 0) {
      supportedScrollTop.scrollTop = supportedScrollTop.scrollTop - 50;
    }
    if (supportedScrollTop.scrollTop < 1) {
      clearInterval(toTopInterval);
    }
  }, 10);
}


initSearchIndex();

document.addEventListener("DOMContentLoaded", function () {
  if (document.getElementById("search-form") != null) {
    const searchInput = document.getElementById("search");
    searchInput.addEventListener("keydown", event => {
      if (event.keyCode == 13) handleSearchQuery(event)
    });

    document.querySelector('.search-icon').addEventListener("click", (event) => handleSearchQuery(event));
  }
})
