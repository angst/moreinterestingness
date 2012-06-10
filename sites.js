var Sites = function(){
  var inst = {
    index: [],
    db: {},
    seen: {}
  };

  chrome.history.onVisited.addListener(function(result) {
    if (result.url in inst.db) {
      inst.seen[result.url] = 1;
      console.log('removing ', result.url);
    }
  });

  inst.seed_hn = function() {
    console.log('updating hn');
    $.ajax({
      url: 'http://api.ihackernews.com/page?format=json',
      async: false,
      success: function(response) {
        $(response.items).each(function(){
          inst.add(this.url, this);
        });
      }
    })
  }
  inst.iterator = function(unseen_only) {
    var idx=0;
    return {
      'getNext': function() {
        while (idx < inst.index.length) {
          var url=inst.index[idx];
          idx++;
          if (!unseen_only || !inst.seen[url]) {
            return url;
          }
        }
      }
    }
  }

  inst.add = function(url, item) {
    // FIXME(ja): don't just overwrite
    this.db[url] = item;
    if (this.index.indexOf(url) == -1) {
      this.index.push(url);
    }
    // Check history and mark if seen
    chrome.history.getVisits({ 'url': url }, function(results) {
      if (results && results.length > 0) {
        inst.seen[url] = 1;
      }
    });
  }

  inst.update = function() {
    inst.hn_seed();
  }

  return inst;
}
