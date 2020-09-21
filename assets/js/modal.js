var cloudmodal = document.getElementById("cloudmodal");
var opencloud = document.getElementById("opencloud");
var closecloud = document.getElementById("closecloud");
opencloud.onclick = function () {
  cloudmodal.style.display = "block";
};
closecloud.onclick = function () {
  cloudmodal.style.display = "none";
};
window.onclick = function (event) {
  if (event.target == cloudmodal) {
    cloudmodal.style.display = "none";
  }
};

var searchmodal = document.getElementById("searchmodal");
var opensearch = document.getElementById("opensearch");
var closesearch = document.getElementById("closesearch");
opensearch.onclick = function () {
  searchmodal.style.display = "block";
};
closesearch.onclick = function () {
  searchmodal.style.display = "none";
};
window.onclick = function (event) {
  if (event.target == cloudmodal) {
    searchmodal.style.display = "none";
  }
};
