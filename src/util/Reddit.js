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
                endpoint = `${urlU}${searchTerm}/hot.json`;
                break;
            default:
                endpoint = `${urlG}${searchTerm}`;
                break;
        }

        /*author: result.data.author,
                    id: result.data.id,
                    img: result.data.preview.images[0],
                    isVideo: result.data.is_video,
                    media: result.data.media,
                    subreddit: result.data.subreddit,
                    secureMedia: result.data.secure_media,
                    thumbnail: result.data.thumbnail,
                    title: result.data.title*/

        return fetch(endpoint)
        .then(response => {
            return response.json()
        }).then(jsonResponse => {
            return jsonResponse.data.children.map(
                result =>( { data: result.data }));
        });        
    }
};

export default Reddit;