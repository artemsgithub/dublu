let APIURL = '';

switch (window.location.hostname) {
    // this is the local host name of the React app
    case 'localhost' || '127.0.0.1':
        // this is the local host name of the server/API
        APIURL = 'http://localhost:3000';
        break; 
    // this is the deployed React application
    case 'dublu.herokuapp.com':
        // this is the full url of the deployed server/API
        APIURL = 'https://dublu-server.herokuapp.com/';
}

export { APIURL };