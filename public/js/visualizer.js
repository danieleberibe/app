$(document).ready(function() {
  /* Detect ios 11_0_x affected
  * NEED TO BE UPDATED if new versions are affected */
  var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent),
  iOS11 = /OS 11_0_1|OS 11_0_2|OS 11_0_3|OS 11_1/.test(navigator.userAgent);
  /* iOS 11 bug caret position */
  if ( iOS && iOS11 )  $("body").addClass("iosBugFixCaret");

  if (document.location.pathname == '/') {
    loadHome();
  }
  else if (document.location.pathname.startsWith('/tshirt/')) {
    setHistory("/tshirt");
    loadModel();
  }
  else if (document.location.pathname.startsWith('/sweat/')) {
    setHistory("/sweat");
    loadModel();
  }
  //$('[data-toggle="tooltip"]').tooltip();
});

window.onstatechange = function() {
  if (document.location.pathname == '/') {
    loadHome();
  }
  else {
    loadModel();
  }
}

function setHistory(pathname) {
  History.pushState({},'', pathname);
}

$('.brandLogo').on('click', function(){
  setHistory("/");
});

function changeColor(x){
  localStorage.setItem("color", x.id);
  changeImg();
  toggleColor(x);
}
function changeModel(x){
  localStorage.setItem("model", x.id);
  changeImg();
  toggleColor(x);
}

function changeStoffa(x,flag){
  localStorage.setItem("stoffa", x.id);
  changeImg();
  if (flag){ toggleStoffa(x);  }

}

function loadHome(){
  $("#model").hide();
  $("#black").show();
  $("#gifConteiner").show()
}

function loadModel() {
  $("#black").hide();
  $("#gifConteiner").hide()
  $("#model").show();
  if (localStorage.getItem("article") == "sweatshirt") {
    $("ol[data-content=\"white\"]").hide();
    localStorage.setItem("color", "N");
    toggleColor("#N");
  }
  else if (localStorage.getItem("article") == "tshirt"){
    $("ol[data-content=\"white\"]").show();
    localStorage.setItem("color", "B");
    toggleColor("#B");
  }
  localStorage.setItem("stoffa", "S1");
  localStorage.setItem("model", "Mod1");

  toggleStoffa("#S1");
  changeImg();

}

function changeImg() {
  $("#customizeColor").attr("src", "/assets/" + localStorage.getItem("article") + "/" + localStorage.getItem("color") + localStorage.getItem("model") + localStorage.getItem("stoffa") + ".gif");
}

function toggleStoffa(x) {
  $(".carousel img").removeClass("selected");
  $(x).addClass("selected");
}

function toggleColor(x) {
  $(".cd-product-customizer a").removeClass("selected");
  $(x).addClass("selected");
}

function goToSite() {
  window.open("https://www.beyourselfclothing.it/");
}



function changeOrder(dot, number) {

    var slides = document.querySelectorAll(".slide");
    var dots = document.querySelectorAll(".dotnav-item");

    for (var i = 0; i < slides.length; i++) {
        slides[i].classList.remove('active');
        dots[i].classList.remove('active');
    }

    var elemName = "slide-" + number;
    var elem = document.getElementById(elemName);
    elem.classList.add('active');
    dot.classList.add('active');
    changeStoffa(dot,0);
}
