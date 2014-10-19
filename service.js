$(function(){
  interestingness = new Flickr({key: "1031f6201017777f7b33cee31f9067c3"});
  interestingness.request();
  interestingness.update();
  setInterval(interestingness.update(), 43000); // 12 hours refresh
});
