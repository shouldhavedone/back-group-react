
(function(){
  var scriptElm = document.getElementById('plugin-bowser-script');
  var public = scriptElm.getAttribute('public');
  if(! + "\v1") {
    window.location.href = public + 'plugin-browser/index.html';
  }else {
    var ie = scriptElm.getAttribute('ie');
    var safari = scriptElm.getAttribute('safari');
    var firefox = scriptElm.getAttribute('firefox');
    var chrome = scriptElm.getAttribute('chrome');
    var edge = scriptElm.getAttribute('edge');
    var satisfiesConfig = {};
    if(!isNaN(ie)) satisfiesConfig.windows = { "internet explorer": ">=" + ie};
    if(!isNaN(safari)) satisfiesConfig.safari = ">=" + safari;
    if(!isNaN(chrome)) satisfiesConfig.chrome = ">=" + chrome;
    if(!isNaN(firefox)) satisfiesConfig.firefox = ">=" + firefox;
    if(!isNaN(edge)) satisfiesConfig["microsoft edge"] = ">=" + edge;
    
    var browser = window.bowser.getParser(window.navigator.userAgent);
    if(!browser.satisfies(satisfiesConfig)) {
      window.location.href = public + 'plugin-browser/index.html';
    }
  }
})()
