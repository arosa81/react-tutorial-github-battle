import axios from 'axios';

const apiCall = {
  fetchPopularRepos: (language) => {
    let encodedURI = window.encodedURI(`https://api.github.com/search/repositories?
      q=starts:>1+language:${language}&sort=stars&order=desc&type=Repositories`);
  },
};

export default apiCall;
