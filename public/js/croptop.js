
function setHistory(pathname) {
  History.pushState({},'', pathname);
}

$('#croptop').on('click', function(){
  localStorage.setItem("article", "croptop");
  setHistory("/croptop");
});
$('#croptopsweatshirt').on('click', function(){
  localStorage.setItem("article", "croptopsweatshirt");
  setHistory("/croptopsweatshirt");
});
