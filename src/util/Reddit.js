//Import all necessary plugins;

const urlG = 'http://www.reddit.com/'; //general search
const urlR = 'https://www.reddit.com/r/'; //search for specific subreddit
const urlU = 'https://www.reddit.com/user/'; //search for specific user
//const url2 = 'https://www.reddit.com/dev/api#GET_search/r/';

//Define necessary endpointn vairables
let accessToken = '';
const client_id = 'G_htzW2QgFZZNwoS1iNYYQ';
const client_secret = 'mYZ02tgrmiYBB2Ii3EIT67tvwJMCsg';
const endPointDomain = 'www.reddit.com';
const authEndPointDomain = 'oauth.reddit.com'
const redirect_uri = 'http://localhost:3000/callback';
const state = 'sdhfkljgshdlkhflkjghdflkjh';
const scope = 'read';

//Define search variables
let filterType = 'hot';

//Get access token
const Reddit = {

    getPostComments(searchTerm, id) {
        return fetch(`${urlR}${searchTerm}/comments/${id}.json`).then(response => {
            return response.json()
        }).then(jsonResponse => {
            return jsonResponse; }).then(jsonData =>{
                if(jsonData[1].data.children.length > 0){
                    return jsonData[1].data.children;
                }else {
                    return null;
                }
            })
    },

    getSearchResults(searchTerm, searchType) {
        //accessToken = Spotify.getAccessToken();
        let endpoint;        
        searchType = 'hot';
        //Switch url endpoint based on drop down
        switch(searchType) {
            case 'general':
                endpoint = `${urlG}${searchTerm}/search.json?q=${searchTerm}&type=link=`;
                break;
            case 'subreddit':
                endpoint = `${urlR}${searchTerm}/hot.json?limit=100?`;
                break;
            case 'user':
                endpoint = `${urlU}${searchTerm}/hot.json`;
                break;
            default:
                endpoint = `${urlR}${searchTerm}/hot.json?limit=100`;
                break;
        }



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