//Import all necessary plugins;

const urlG = 'http://www.reddit.com/r/all/search.json?q=';
const urlR = 'http://www.reddit.com/r/';
const urlU = 'http://www.reddit.com/r/all/search.json?q=';
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
        let url;        
        //Switch url endpoint based on drop down
        switch(searchType) {
            case 'general':
                url = urlG;
                break;
            case 'subreddit':
                url = urlR;
                break;
            case 'user':
                url = urlU;
                break;
            default:
                url = urlG;
                break;
        }

        return fetch(`${url}${searchTerm}`)
        .then(response => {
            return response.json()
        }).then(jsonResponse => {
            //console.log(jsonResponse.data.children[3].data.media);
            return jsonResponse.data.children.map(
                result => ({
                    id: result.data.id,
                    title: result.data.title,
                    img: result.data.thumbnail,
                    media: result.data.media,
                    subreddit: result.data.subreddit
                }));
            /*return jsonResponse.tracks.items.map(track => ({
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                uri: track.uri
                }))*/
        });        
    }
};

export default Reddit;