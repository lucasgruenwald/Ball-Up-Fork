import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import React, { Component } from 'react'
import { mapStyles } from './map_style'
import $ from 'jquery'



export class IndexMap extends Component {
    constructor (props) {
        super(props);
        this.state = { games: [], coords: []};
        this.pushCoords = this.pushCoords.bind(this);
    }
    componentDidMount() {
      
        if (this.props.games.length) {
            this.props.games.forEach( game => {
                this.pushCoords(game) 
            })
        }
    }

    componentDidUpdate(prevProps) {
        debugger;
        if (prevProps.games.length !== this.props.games.length){
             window.location.reload(false);
        }
    }
    pushCoords(game) {
    
        let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${game.location}&key=AIzaSyA9w4yZlROGaoP6q-a338pBQU2haj_3v6s`;


        fetch(url)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
               
                this.state.coords.push(data.results[0].geometry.location)
                this.setState({ coords: this.state.coords })
                game["coords"] = data.results[0].geometry.location;
                this.state.games.push(game);
                this.setState({ games: this.state.games })
            });
    }

    onMarkerClick(game) {
       
        $(`.highlight-item`).removeClass("highlight-item")
        $(`.${game._id}`).addClass("highlight-item")
    }

    render() {


        let unset_games = this.state.games.filter( game =>
                !game.game_set
            )
        let set_games = this.state.games.filter( game =>
                game.game_set
            )
        return (
            <div className="map-container">
       
            <Map google={this.props.google}
                zoom={13}
                center={{ lat: 37.77, lng: -122.446747 }}
                styles={mapStyles}
                style={{
                    width: "70%",
                    height: "90vh"
                    }}
                    disableDefaultUI={true}
                    zoomControl={true}
                    scrollwheel={false}
                
            >
                
                {unset_games.map( game => 
                    <Marker onClick={ () => {
                        
                        this.onMarkerClick(game);
                    }}
                        name={game.title}
                        icon={{ url: "gold-marker.png" }}
                        position={game.coords}
                    />
                    )}

                {set_games.map( game => 
                    <Marker onClick={ () => {
                        
                        this.onMarkerClick(game);
                    }}
                        name={game.title}
                        icon={{ url: "white-marker.png" }}
                        position={game.coords}
                    />
                    )}
                

                <InfoWindow onClose={this.onInfoWindowClose}>
                    {/* <div>
                        <h1>{this.state.selectedPlace.name}</h1>
                    </div> */}
                </InfoWindow>
            </Map>
            </div>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: ('AIzaSyA9w4yZlROGaoP6q-a338pBQU2haj_3v6s')
})(IndexMap)