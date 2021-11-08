
//** Source: https://github.com/mereel27/redditXplorer/blob/main/src/utils/utils.js */
export const decode = html => {
    const text = document.createElement('span');
    text.innerHTML = html;
    return text.textContent || text.innerText;
  }