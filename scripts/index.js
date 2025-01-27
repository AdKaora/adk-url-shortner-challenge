
// This is the client side script that will be used to make requests to the server

// This function is used to test the script
function testScript() {
  console.log(document.getElementById('url').value);
}

// This function is used to create a short URL
function shortenURL() {
  const url = document.getElementById('url').value;
  console.log(url);
  if(url === '') {
    alert('Please enter a URL');
    return;
  }
  axios.post('/shorten', { url }).then((response) => {
    //send to html the shortened url
    document.getElementById('shortenedURL').innerHTML = response.data.shortURL
    document.getElementById('shorter_url_section').style.display = 'block';
  }).catch((error) => {
    alert(error.response.data);
  });
}

// This function is used to find the original URL, given a short URL
function findOriginalURL() {
  
  const shortURL = document.getElementById('shortURL').value;
  if(shortURL === '') {
    alert('Please enter a short URL');
    return;
  }
  const id = shortURL.split('/').pop();
  axios.get(`/${id}`).then((response) => {
    document.getElementById('originalURL').innerHTML = response.data;
    document.getElementById('find_result_section').style.display = 'block';
  }).catch((error) => {
    document.getElementById('originalURL').innerHTML = error.response.data;
    document.getElementById('find_result_section').style.display = 'block';
  });
}

// This function is used to download the fake database
function download(){
  axios.get('/download').then((response) => {
    const file = response.data;
    const blob = new Blob([JSON.stringify(file)], {type: 'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'fake_database.json';
    a.click();
  }).catch((error) => {console.log(error)});
}


// This function is used to clear all the fields in the html
function clearAll(){
  document.getElementById('url').value = '';
  document.getElementById('shortenedURL').innerHTML = '';
  document.getElementById('shorter_url_section').style.display = 'none';
  document.getElementById('shortURL').value = '';
  document.getElementById('originalURL').innerHTML = '';
  document.getElementById('find_result_section').style.display = 'none';
}