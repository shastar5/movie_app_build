import React, { Component } from "react";
import "./App.css";
import Movie from "./Movie";
import Cookies from 'universal-cookie';

const cookies = new Cookies();
class App extends Component {
    state = {};


    componentDidMount() {
        var input = prompt('Name?');
        var count = cookies.get(input);
        if (isNaN(count)) {
            count = 0;
        }
        cookies.set(input, ++count, {path:'/'});
        alert('안녕하세요! ' + input + '\n' + count + '번째 방문 환영합니다');
        this._getMovies();
    }

    _renderMovies = () => {
        const movies = this.state.movies.map(movie => {
            return (
                <Movie
                    title={movie.title_english}
                    poster={movie.large_cover_image}
                    key={movie.id}
                    genres={movie.genres}
                    synopsis={movie.synopsis}
                />
            );
        });
        return movies;
    };

    _getMovies = async () => {
        const movies = await this._callApi();
        this.setState({
            movies
        });
    };

    _callApi = () => {
        return fetch(
            "https://yts.am/api/v2/list_movies.json?sort_by=download_count"
        )
            .then(potato => potato.json())
            .then(json => json.data.movies)
            .catch(err => console.log(err));
    };

    render() {
        const { movies } = this.state;
        return (
            <div className={movies ? "App" : "App--loading"}>
                {movies ? this._renderMovies() : "Loading"}
            </div>
        );
    }
}

export default App;