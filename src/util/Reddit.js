//Import all necessary plugins;

const urlG = 'http://www.reddit.com/r/all/search.json?q='; //general search
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
    getAccessToken () {
        //Check if access token is already available
        if(accessToken){
            return accessToken;
        }else {

            //***Use /api/v1/authorize.compact?  for mobile screens */

            //If no access token send user to authorization link
            const authUrl2 = `https://www.reddit.com/api/v1/authorize?client_id=${client_id}&response_type=code&state=${state}&redirect_uri=${redirect_uri}/duration=permanent&scope=read`;
            const authUrl = `https://${endPointDomain}/api/v1/authorize?
            client_id=${client_id}
            &response_type=code
            &state=${state}
            &redirect_uri=${redirect_uri}
            &duration=permanent
            $scope=${scope}`;

            window.location = authUrl2;
            //Get code from uri
            const params = (new URL(window.location)).searchParams;
            accessToken = params.get("code") ? params.get("code") : false;

            return accessToken;
        }
        
        
    },

    //Search Reddit via API
    searchReddit(searchTerm, searchType, filterType) {
        const accessToken = Reddit.getAccessToken();

        //Change search type basedon search type drop down
        let searchEndpoint;
        switch(searchType) {
            case 'general':
                searchEndpoint = `r/all/search?q=${searchTerm}?limit=100`;
                break;
            case 'subreddit':
                searchEndpoint = `${urlR}${searchTerm}/hot.json?limit=100`;
                break;
            case 'user':
                searchEndpoint = `${urlU}${searchTerm}/hot.json`;
                break;
            default:
                searchEndpoint = `${urlG}${searchTerm}`;
                break;
        }

        return fetch(`https://${authEndPointDomain}/api/v1/`)
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