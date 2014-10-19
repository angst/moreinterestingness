var interestingness;

function show(photo) {
  if (photo){
    $("#photo").attr("src", photo.src);
    $("#info").text(photo.title || "untitled");
    $("#info").attr("href", photo.url);
    $("#owner").attr("href", photo.ownerurl);
    $("#buddyicon").attr("src", photo.buddyicon);
    $("#buddyicon").attr("title", photo.owner.realname);
  }
}

function init(){
  interestingness = chrome.extension.getBackgroundPage().interestingness;
  show(interestingness.next());
  document.addEventListener('keypress', function(e) {
    if (e.keyCode==106) {
      show(interestingness.next());
    }
    if (e.keyCode==107) {
      show(interestingness.prev());
    }
  }, true);
}

$(function(){
  if ($('body').hasClass('service')) {
    interestingness = new Flickr({key: "1031f6201017777f7b33cee31f9067c3"});
    interestingness.request();
    interestingness.update();
    setInterval(interestingness.update(), 60*60*1000);
  } else {
    init();
  }
});