import axios from 'axios';

const id = '4cfd29f6441edc142323';
const sec = '3491f8b5ebbd0f9f31e9d172b7f842f3462c5caf';
const params = `?client_id=${id}&client_secret=${sec}`;

const getProfile = (username) => {
  axios.get(`https://api.github.com/users/${username}${params}`)
    .then(user => user.data);
};

const getRepos = (username) => {
  axios.get(`https://api.github.com/users/${username}/repos${params}&per_page=10`)
    .then(repo => repo.data);
};

const getStarCount = (repos) => {
  repos.data.reduce((count, repo) => (
    count + repo.stargazers_count), 0);
};

const calculateScore = (profile, repos) => {
  const followers = profile.followers;
  const totalStars = getStarCount(repos);

  return (followers * 3) + totalStars;
};

function getUserData(player) {
  return axios.all([getProfile(player), getRepos(player)])
    .then(function (data) {
      const profile = data[0];
      const repos = data[1];
      return {
        profile,
        score: calculateScore(profile, repos),
      };
    });
}

const sortPlayers = (players) => {
  players.sort((a, b) => (b.score - a.score));
};

const handleError = (error) => {
  console.warn(error);
  return null;
};

export default {
  battle: (players) => {
    return axios.all(players.map(getUserData))
      .then(sortPlayers)
      .catch(handleError);
  },
  fetchPopularRepos: (language) => {
    const encodedURI = window.encodeURI(`https://api.github.com/search/repositories?q=starts:>1+language:${language}&sort=stars&order=desc&type=Repositories`);
    return axios.get(encodedURI)
      .then(response => response.data.items);
  },
};
