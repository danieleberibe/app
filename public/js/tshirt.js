
function setHistory(pathname) {
  History.pushState({},'', pathname);
}

$('#tshirt').on('click', function(){
  localStorage.setItem("article", "tshirt");
  setHistory("/tshirt");
});
