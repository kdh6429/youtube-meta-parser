# youtube-meta-parser
A module to extract meta information from YouTube page.
This is not required any google api and extract the data from youtube view page.

## Install
```
npm install youtube-meta-parser
```

## Usage
```
var parser = require('youtube-meta-parser');
parser.getMetadata("ZI4tRn4dOGg").then( function(metadata) {
        console.log(metadata['videoDetails']['title']);
        console.log(metadata['videoDetails']['lengthSeconds']);
        console.log(metadata['videoDetails']['viewCount']);
        console.log(metadata['videoDetails']['averageRating']);
        console.log(metadata['videoDetails']['author']);
    }
)
```