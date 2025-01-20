/*
    I made a simple version of the task without a backend where the links are stored locally 
    and could be accessed in the same session.
    I stored the couples of complete urls and their shorter counterparts in a Map 
    with an string hash as key and the complete url as content.
    To give persistence these couples could be stored in a database 
    with a varchar field to store the hash as the primary key of the table and a text field
    to store the complete urls.
    The table could have also more fields for further implementations like a date of creation
    or when it will expire. 
*/
const urlMap = new Map();

/* 
    This is the function triggered by the button in the form which creates the shorter version of the link submitted
    and populate the div where the user can retrieve the shortened url.
    The shortened link is a interpolation of http://shorturl.com/ (used as an example)
    and the hash created from the complete url.
    In a complete version with database and backend this function would fetch a post request with the long url as the body.
*/
function shorten() {

    // target url from the form
    const longUrl = document.querySelector('#long-url').value;
    // the div where will be shown the shortened url 
    const shortOutput = document.querySelector('#short-url');

    // calls the function which creates the hash from the link
    let hash = getHash(longUrl);

    // stores the couple in the Map
    urlMap.set(hash, longUrl);

    // calls the function which create the full shortened url from the hash and the domain used
    let shortUrl = createShortLink('http://shorturl.com/', hash);

    // populate the div 
    shortOutput.innerHTML = `Shortened URL: <a href="${shortUrl}">${shortUrl}</a>`;

}

/* 
    This is the function triggered by the button in the second form which retrieve the shorter version 
    of the link submitted by the user and populate the div underneath where the user can copy the complete version of it.
    In a complete version with database and backend this function would fetch a get request to get the long from the hashed version.
*/
function retrieve() {

    // target short url from the form
    const shortUrl = document.querySelector('#short-url-retrieve').value;
    // the div where will be shown the complete url
    const longOutput = document.querySelector('#long-url-retrieve');

    // verify if it's a valid shortened url as it should start with the correct domain
    if (!shortUrl.startsWith('http://shorturl.com/')) {
        alert('The link entered is incorrect');
        return
    }

    // retrieves the hash from the link
    let hash = shortUrl.split('/')[3];

    // verify if the hash is a key of the Map
    if (!urlMap.has(hash)) {
        alert('The link passed is not a valit shortened url');
        return
    }

    // retrieves the long url associated to the hash (key of the Map)
    targetUrl = urlMap.get(hash);

    // populate the div
    longOutput.innerHTML = `Complete URL: <a href="${targetUrl}">${targetUrl}</a>`;
}

/*
    This is the function which generates the hash from link passed.
    It is the weakest part of the script which should be updated to avoid collisions
    maybe using a stronger algorithm or a library.
    In this simple version the hash is created by appending 3 random characters of the link and the length of it.
*/
function getHash(longUrl) {

    let hash = "";
    let l = longUrl.length;

    if(l == 0) {
        return hash;
    }

    for(i=0; i < 3; i++) {
        hash += longUrl.charAt(Math.floor(Math.random() * l));
    }

    hash += l;

    return hash;
}

// Create the complete short url appending the hash to the domain
function createShortLink(domain, hash) {
    return domain + hash;
}