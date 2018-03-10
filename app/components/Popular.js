import React, { Component } from 'react';
import PropTypes from 'prop-types';
import api from '../utils/api';

function SelectLanguage(props) {
  const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];

  return (
    <ul className="languages">
      <p>Selected Language: {props.selectedLanguage}</p>
      {languages.map(lang => (
        <li
          style={lang === props.selectedLanguage ? { color: '#d0021b' } : null}
          onClick={props.onSelect.bind(null, lang)}
          key={lang}
        >{lang}</li>
      ))}
    </ul>
  );
}

function RepoGrid(props) {
  return (
    <ul className="popular-list">
      {props.repos.map((repo, index) => (
        <li key={repo.name} className="popular-item">
          <div className="popular-rank">#{index + 1}</div>
          <ul className="space-list-items">
            <li>
              <img
                src={repo.owner.avatar_url}
                alt={`Avatar for : ${repo.owner.login}`}
                className="avatar"
              />
            </li>
            <li><a href={repo.html_url}>{repo.name}</a></li>
            <li>@{repo.owner.login}</li>
            <li>{repo.stargazers_count} stars</li>
          </ul>
        </li>
      ))}
    </ul>
  );
}

SelectLanguage.propTypes = {
  selectedLanguage: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};

RepoGrid.propTypes = {
  repos: PropTypes.array.isRequired,
};

class Popular extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLanguage: 'All',
      repos: null,
    };

    this.updateLanguage = this.updateLanguage.bind(this);
  }

  componentDidMount() {
    this.updateLanguage(this.state.selectedLanguage);
  }

  updateLanguage(lang) {
    this.setState(() => ({
      selectedLanguage: lang,
    }));

    api.fetchPopularRepos(lang)
      .then(repos => (this.setState(() => ({ repos }))));

    console.log('repo state: ', this.state.repos);
  }

  render() {
    return (
      <div>
        <SelectLanguage
          selectedLanguage={this.state.selectedLanguage}
          onSelect={this.updateLanguage}
        />
        {!this.state.repos
          ? <p>LOADING</p>
          : <RepoGrid repos={this.state.repos} />}
      </div>
    );
  }
}

export default Popular;