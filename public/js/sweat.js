
function setHistory(pathname) {
  History.pushState({},'', pathname);
}

$('#sweatshirt').on('click', function(){
  localStorage.setItem("article", "sweatshirt");
  setHistory("/sweat");
});
