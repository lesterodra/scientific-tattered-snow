// client-side js
// run by the browser each time your view template is loaded

// define variables that reference elements on our page
const santaForm = document.forms[0];

// listen for the form to be submitted and add a new dream when it is
santaForm.onsubmit = function (event) {
  event.preventDefault();

  const username = document.getElementsByName('userid')[0].value
  const message = document.getElementsByName('wish')[0].value;
  httpRequest = new XMLHttpRequest();

  const alertContents = () =>  {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
      alert(JSON.parse(httpRequest.responseText).message);
    }
  }
  httpRequest.onreadystatechange = alertContents;
  httpRequest.open('POST', `${window.location.origin}/api/christmas-letters`, true);
  httpRequest.setRequestHeader('Content-Type', 'application/json');
  httpRequest.send(JSON.stringify({
    username,
    message,
  }));
};
