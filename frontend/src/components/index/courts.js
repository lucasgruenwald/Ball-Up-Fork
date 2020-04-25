 import React, { Component } from "react";
import { Map, GoogleApiWrapper } from 'google-maps-react';
// import MapContainer from '../map/map';
import GameItem from './game_item';
import { Link } from "react-router-dom";
import IndexMap from "../map/index_map"
import $ from 'jquery';
import niceScroll from 'jquery'
import './index.css';
import IndexMapContainer from "../map/index_map_container";
import { Scrollbars } from 'react-custom-scrollbars';


class Courts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            location: '',
            time: '',
            game_date: '',
            game_set: false,
            lat: 0,
            lng: 0
        };
        this.handleSumbit= this.handleSumbit.bind(this);
        this.createGameModal= this.createGameModal.bind(this);
        this.setCoords= this.setCoords.bind(this);
        

    }

    componentDidMount(){
    
        this.props.getGames();
        // this.props.getAddress('1109 N Highland St, Arlington VA');
        $('.navbar').removeClass('navbar-b');
    }

    handleSumbit() {
        
        let game = {
            
            title: this.state.title,
            location: this.state.location,
            time: this.state.time,
            game_date: this.state.game_date,
            players: [],
            game_set: false,
            lat: this.state.lat,
            lng: this.state.lng 
        };


        this.props.createGame(game)
            .then(() => this.props.history.push('/'));
            // window.location.reload(false);
    }

    setCoords(address) {
        
        let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyA9w4yZlROGaoP6q-a338pBQU2haj_3v6s`;


        fetch(url)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                
                this.state.lat = data.results[0].geometry.location.lat;
                this.state.lng = data.results[0].geometry.location.lng;
                
                this.setState({ lat: this.state.lat })
                this.setState({ lng: this.state.lng })

            });
    }

    update(field) {
        return e => this.setState({
            [field]: e.currentTarget.value
        });
    }

    createGameModal(e) {
        e.preventDefault();
        // $(".new-game").addClass(".new-game-b");
        $(".new-game").addClass("new-game-b");
    }

    closeModal(e) {
        e.preventDefault();
        $(".new-game").removeClass("new-game-b");
    }

    render() {

       let set_games = this.props.games.filter( game =>
            game.game_set
        )

       let unset_games = this.props.games.filter( game =>
            game.game_set !== true
        )
        let set_game_i = 1;
        let unset_game_i = 1;
        return (
            <Scrollbars
                style={{ height: "100vh",
                         width: "100%"}}
                //         }}
                // onScroll={this.handleScroll}
                // onScrollFrame={this.handleScrollFrame}
                // onScrollStart={this.handleScrollStart}
                // onScrollStop={this.handleScrollStop}
                // onUpdate={this.handleUpdate}
                // renderView={this.renderView}
                // renderTrackHorizontal={this.renderTrackHorizontal}
                // renderTrackVertical={this.renderTrackVertical}
                // renderThumbHorizontal={this.renderThumbHorizontal}
                // renderThumbVertical={this.renderThumbVertical}
                // autoHide
                // autoHideTimeout={1000}
                // autoHideDuration={200}
                // thumbMinSize={30}
                // universal={true}
                // {...this.props}
                > 
            <div className="index">

                <div className="top">
                    
                    <div className="games">
                        <h2 id="list-head">Open Games &#x25a0;&#x25a0;&#x25a0;&#x25a0;&#x25a0;
                           </h2> 
                            <Scrollbars>
                        <div className="game-list">
                        {unset_games.map( game => 
                            <div className="game-list-item">
                                <ul className={game._id}><div className="num-circle">
                                    {unset_game_i}</div>
                                    <div className="hide-me">
                                        {unset_game_i++}</div>
                                    <Link to={`/games/${game._id}`}>
                                        <GameItem game={game} />
                                    </Link>
                                </ul>
                                
                            </div> 
                            )}
                            <h2 id="list-foot"> &#x25a0;&#x25a0;&#x25a0;&#x25a0;&#x25a0;&#x25a0;&#x25a0;&#x25a0;&#x25a0;&#x25a0;&#x25a0;&#x25a0;&#x25a0;
                           </h2>
                        </div>
                        </Scrollbars>
                    </div>

                    <div className="games">
                        <h2 id="list-head">Set Games &#x25a0;&#x25a0;&#x25a0;&#x25a0;&#x25a0;&#x25a0;</h2>
                        <Scrollbars >
                            <div className="set-game-list">
                                {set_games.map(game =>
                                    <div className="game-list-item">
                                        <ul className={game._id}><div className="num-circle-set">
                                            {set_game_i}</div>
                                            <div className="hide-me">
                                                {set_game_i++}</div>
                                            <Link to={`/setgames/${game._id}`}>
                                                <GameItem game={game} />
                                            </Link>

                                        </ul>
                                    </div>
                                )}
                                <h2 id="list-foot"> &#x25a0;&#x25a0;&#x25a0;&#x25a0;&#x25a0;&#x25a0;&#x25a0;&#x25a0;&#x25a0;&#x25a0;&#x25a0;&#x25a0;&#x25a0;
                            </h2>
                            </div>
                        </Scrollbars>
                    </div>
                    
                    <div className="map">
                        <IndexMapContainer 
                        history={this.props.history}
                        />
                    </div>
                    {/* <div className="set-games">
                        <h2>Set Games</h2>
                        {set_games.map(game =>
                            <ul >
                                <Link to={`/setgames/${game._id}`}>
                                    <GameItem game={game} />
                                </Link>
                            </ul>
                        )}
                    </div> */}
                </div>

                <div className="new-game">
                  <p className="ng-closeout" onClick={this.closeModal}>&times;</p>
                   <h1>Create a New Game</h1>
                    <form onSubmit={ (e) => {
                        e.preventDefault();
                        this.setCoords(this.state.location)
                        this.handleSumbit()
                    }}>
                        <input type="text"
                            value={this.state.title}
                            onChange={this.update('title')}
                            placeholder="Title"
                        />
                        <input type="text"
                            value={this.state.location}
                            onChange={this.update('location')}
                            placeholder="location"
                        />
                        {/* <input type="time"
                            value={this.state.time}
                            onChange={this.update('time')}
                            placeholder="Time"
                        /> */}
                        <select name={this.state.time} onChange={this.update('time')} placeholder="Time">
                            <option selected disabled>Choose Time</option>
                            <option value="1:00 pm">1:00 pm</option>
                            <option value="2:00 pm">2:00 pm</option>
                            <option value="3:00 pm">3:00 pm</option>
                            <option value="4:00 pm">4:00 pm</option>
                            <option value="5:00 pm">5:00 pm</option>
                            <option value="6:00 pm">6:00 pm</option>
                            <option value="7:00 pm">7:00 pm</option>
                            <option value="8:00 pm">8:00 pm</option>
                            <option value="9:00 pm">9:00 pm</option>
                            <option value="10:00 pm">10:00 pm</option>
                            <option value="11:00 pm">11:00 pm</option>
                            <option value="12:00 pm">12:00 pm</option>
                            <option value="1:00 am">1:00 am</option>
                            <option value="2:00 am">2:00 am</option>
                            <option value="3:00 am">3:00 am</option>
                            <option value="4:00 am">4:00 am</option>
                            <option value="5:00 am">5:00 am</option>
                            <option value="6:00 am">6:00 am</option>
                            <option value="7:00 am">7:00 am</option>
                            <option value="8:00 am">8:00 am</option>
                            <option value="9:00 am">9:00 am</option>
                            <option value="10:00 am">10:00 am</option>
                            <option value="11:00 am">11:00 am</option>
                            <option value="12:00 am">12:00 am</option>
                        </select>
                        {/* <input type="text"
                            value={this.state.game_date}
                            onChange={this.update('game_date')}
                            placeholder="Game Date"
                        /> */}
                        <input type="date" name="Game Date" 
                            value={this.state.game_date}
                            onChange={this.update('game_date')}
                            min="2020-01-01" max="2025-12-31">
                        </input>
                        <input type="hidden"
                            value={this.state.game_set}
                            onSubmit={this.update('game_set')}
                        />
                        <input type="submit" value="Submit" />
                    </form>
                </div>
                <p className="ng-btn" onClick={this.createGameModal}>
                    New Game</p> 
            </div>
                </Scrollbars>
        
        )}
}


export default Courts;