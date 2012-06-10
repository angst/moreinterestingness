var z;

var twitter = ChromeExOAuth.initBackgroundPage({
  'request_url': 'https://api.twitter.com/oauth/request_token',
  'authorize_url': 'https://api.twitter.com/oauth/authorize',
  'access_url': 'https://api.twitter.com/oauth/access_token',
  'consumer_key': 'aDFgyQocbUfYxRgNMUtswA',
  'consumer_secret': '9usNWgQiVMHN8SXH0WRnVNVMprqTJa3cPZjKWuPuzMU',
  'scope': 'https://api.twitter.com/1/',
  'app_name': 'More Interestingness'
});

function onAuthorized() {
  var url = 'https://api.twitter.com/1/statuses/home_timeline.json'
  var request = {
    'method': 'GET',
    'parameters': {'count': 200, 'include_entities': 1}
  };
  function callback(x) {
    z = JSON.parse(x);
  }
  twitter.sendSignedRequest(url, callback, request);
};

twitter.authorize(onAuthorized);

