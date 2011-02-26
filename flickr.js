var Flickr = function(params, callback){
  return {
    api_key: params.key || "null",
    format: params.format || "json",
    nojsoncallback: params.nojsoncallback || 1,
    per_page: params.per_page || 300,
    method: params.method || "flickr.interestingness.getList",
    extras: params.extras || "media,o_dims,owner_name,icon_server",
    photos: [],
    current_photo: 0,
    
    queryString: function(){
      base_url = "http://api.flickr.com/services/rest/?";
      query = {
        api_key: this.api_key,
        format: this.format,
        nojsoncallback: this.nojsoncallback,
        per_page: this.per_page,
        method: this.method,
        extras: this.extras
      }
      query_string = []

      for (var k in query) {
        query_string.push(k + '=' + encodeURIComponent(query[k]));
      }
      
      return base_url + query_string.join("&");
    },
    
    request: function(){
      var photos = this.photos;
      var i = 0;
      $.ajax({
        url: this.queryString(), 
        async: false,
        success: function(response){
          result = JSON.parse(response);
          $(result.photos.photo).each(function(){
            if (this.o_width && this.media == "photo") {
              if (Math.max(this.o_width) > 1080 && Math.max(this.o_height) > 1080) {
                this.buddyicon = 'http://farm'+this.iconfarm+'.static.flickr.com/'+this.iconserver+'/buddyicons/'+this.owner+'.jpg';
                this.ownerurl = 'http://www.flickr.com/photos/'+this.owner+'/';
                this.src = 'http://farm'+this.farm+'.static.flickr.com/'+this.server+'/'+this.id+'_'+this.secret+'_b.jpg';
                this.url = 'http://www.flickr.com/photos/'+this.owner+'/'+this.id;
                this.ext_id = i;
                i++;
                photos.push(this);
              }
            }
          })
        }
      })
      photos = this.photos;
      return this.photos;
    },
    
    next: function(){
      if (this.current_photo == this.photos.length-5) {
        next = this.photos[1];
        this.current_photo = 1;
      } else {
        next = this.photos[this.current_photo++];
        this.current_photo = this.current_photo++;
      };
      return next;
    },
    
    prev: function(){
      if (this.current_photo == 1) {
        prev = this.photos[this.photos.length-5];
        this.current_photo = this.photos.length-5;
      } else {
        prev = this.photos[this.current_photo--];
        this.current_photo = this.current_photo--;
      };
      return prev;
    },
    
    fetch: function(id){
      return this.photos[id];
    },
    
    update: function(){
      this.request();
      this.precache();
    },
    
    precache: function(){
      photos = this.request();
      $(photos).each(function(){
        document.createElement('image').setAttribute('src', this.src);
        document.createElement('image').setAttribute('src', this.buddyicon);
      })      
    }
  }
}