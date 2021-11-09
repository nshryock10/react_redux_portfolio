
//** Source: https://github.com/mereel27/redditXplorer/blob/main/src/utils/utils.js */
export const decode = html => {
    const text = document.createElement('span');
    text.innerHTML = html;
    return text.textContent || text.innerText;
  }

export const getVideoURL = link => {
    let url = link.match(/(?:youtube(?:-nocookie)?\.com\/(?:[^/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    if(url){
      return `https://www.youtube-nocookie.com/embed/${url[1]}`;
    }
}