
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search-bar';
import VideoList from './components/video-list';
import VideoDetails from './components/video-details';
import _ from 'lodash';

const YOUTUBE_API_KEY = '';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      videos: [],
      selectedVideo: null
    };

    this.videoSearch('surfboards');
  }

  videoSearch(term) {
    YTSearch({key: YOUTUBE_API_KEY, term}, videos => {
      this.setState({
        videos,
        selectedVideo: videos[0]
      });
    });
  };

  render() {

    const videoSearch = _.debounce(term => { this.videoSearch(term) }, 300);
    return (
      <div>
        <SearchBar onSearchTermChange={videoSearch} />
        <VideoDetails video={this.state.selectedVideo} />
        <VideoList
          onVideoSelect={ selectedVideo => this.setState({selectedVideo}) }
          videos={this.state.videos} />
      </div>
    );
  }
}


ReactDOM.render(<App />, document.querySelector('.container'));