var Promise = require('bluebird');
const fetch = require('node-fetch')

function extractConfigData(html) {
  var index,
      start = 'ytplayer.config = ',
      //end = '</script>';
      end = ';ytplayer.load';

  index = html.indexOf(start);
  if (index === -1) {
    return '';
  }

  html = html.slice(index + start.length);

  index = html.indexOf(end);
  if (index === -1) {
    return '';
  }

  return html.slice(0, index);
}
function fetchMetadata(id) {
    var url = 'http://www.youtube.com/watch?v=' + id;

    return new Promise(function (fulfill, reject) {
      var url = 'http://www.youtube.com/watch?v=' + id;
      return fetch(url)
      .then(res => res.text())
      .then(body => {
        jsonStr = extractConfigData(body);
        if( jsonStr == '') {
          reject('page error');
        }
        jsonObj = JSON.parse(jsonStr)
        jsonObj = JSON.parse( jsonObj['args']['player_response']);
        //console.log( JSON.parse( jsonObj['args']['player_response']));
        fulfill(jsonObj);
      })
    });
}

module.exports = {
    getMetadata: function (videoID) {
      return new Promise(function (fulfill, reject) {
        if (!videoID) {
          reject(new Error('Unable to get video id.'));
          return;
        }
        fetchMetadata(videoID).then(
          function (d) {
            fulfill( d);
          }
        ).catch(function(error) {
          reject(error);
        });
      });
    }
};
