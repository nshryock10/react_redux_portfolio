//Import all necessary plugins;

const urlG = 'http://www.reddit.com/'; //general search
const urlR = 'https://www.reddit.com/r/'; //search for specific subreddit
const urlU = 'https://www.reddit.com/user/'; //search for specific user
//const url2 = 'https://www.reddit.com/dev/api#GET_search/r/';

/*//Define necessary endpointn vairables
let accessToken = '';
const client_id = 'G_htzW2QgFZZNwoS1iNYYQ';
const client_secret = 'mYZ02tgrmiYBB2Ii3EIT67tvwJMCsg';
const endPointDomain = 'www.reddit.com';
const authEndPointDomain = 'oauth.reddit.com'
const redirect_uri = 'http://localhost:3000/callback';
const state = 'sdhfkljgshdlkhflkjghdflkjh';
const scope = 'read';

//Define search variables
let filterType = 'hot'; */

const Reddit = {

    async getPostComments(searchTerm, id) {
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

    async getRedditPosts (searchTerm) {
        const response = await fetch(`${urlG}${searchTerm}.json`);
        const json = await response.json();
        return json.data.children.map(post => ({data: post.data}))
    },  

    async getUserSearch(searchTerm){
        let endpoint = `${urlU}${searchTerm}/hot.json`;
        return fetch(endpoint)
        .then(response => {
            return response.json()
        }).then(jsonResponse => {
            
            return jsonResponse.data.children.map(
                result =>( { data: result.data }));
        });
    },

    async getSearchResults(searchTerm, searchType) {

        let endpoint;      
        //Switch url endpoint based on drop down
        console.log(searchType)
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