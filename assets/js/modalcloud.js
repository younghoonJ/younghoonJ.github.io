var cloudmodal = document.getElementById("cloudmodal");
    var opencloud = document.getElementById("opencloud");
    var closecloud = document.getElementsByClassName("close")[0];
    opencloud.onclick = function () {
      cloudmodal.style.display = "block";
    }
    closecloud.onclick = function () {
      cloudmodal.style.display = "none";
    }
    window.onclick = function (event) {
      if (event.target == cloudmodal) {
        cloudmodal.style.display = "none";
      }
    }
