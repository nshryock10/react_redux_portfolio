//Import all necessary plugins;

const urlG = 'http://www.reddit.com/r/all/search.json?q=';
const urlR = 'https://www.reddit.com/r/';
const urlU = 'https://www.reddit.com/user/';
//const url2 = 'https://www.reddit.com/dev/api#GET_search/r/';
//const redirect_uri = '';

let accessToken = '';


//Get access token
const Reddit = {    
    getAccessToken () {
        //const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        //const expirationTimeMatch = window.location.href.match(/expires_in=([^&]*)/);

        if (accessToken) {
            return accessToken;
        }
    },

    getSearchResults(searchTerm, searchType) {
        //accessToken = Spotify.getAccessToken();
        let endpoint;        
        //Switch url endpoint based on drop down
        switch(searchType) {
            case 'general':
                endpoint = `${urlG}${searchTerm}`;
                break;
            case 'subreddit':
                endpoint = `${urlR}${searchTerm}/hot.json?limit=100`;
                break;
            case 'user':
                endpoint = `${urlU}${searchTerm}/hot.json?limit=100`;
                break;
            default:
                endpoint = `${urlG}${searchTerm}`;
                break;
        }

        return fetch(endpoint)
        .then(response => {
            return response.json()
        }).then(jsonResponse => {
            //console.log(jsonResponse.data.children[3].data.media);
            return jsonResponse.data.children.map(
                result =>( {
                    id: result.data.id,
                    title: result.data.title,
                    thumbnail: result.data.thumbnail,
                    media: result.data.media
                }));
        });        
    }
};

export default Reddit;