import React, {Component} from 'react';
import classes from './ZipCodesViewer.css';
import Controls from "../../components/Controls/Controls";
import GoogleMap from "../../components/GoogleMap/GoogleMap";
import MediaQuery from 'react-responsive';
import axios from 'axios';
import Aux from '../../hoc/Auxx/Auxx'
import {Marker} from "../../components/Marker/Marker";

class ZipCodesViewer extends Component {

    state = {
        selectedCountry: null,
        zipCode: null,
        listOfPlaces: [],
        markers: [],
        searched: []
    };

    componentDidMount() {
        this.checkStorage();
    };

    //checks if there are some data stored in the local storage
    checkStorage = () => {
        if (typeof(Storage) !== "undefined") {
            if (sessionStorage.length !== 0) {
                this.loadDataFromSessionStorage();
            }
        } else {
            alert("Sorry, your browser does not support session storage.");
        }
    };

    // loads data from local storage if contains some
    loadDataFromSessionStorage = () => {
        let array = sessionStorage.getItem("searches");
        array = array.split(",");
        this.setState({searched: array});
    };

    // sets selected country to the state
    selectHandler = (event) => {
        this.setState({selectedCountry: event.target.value})
    };

    // sets input zip code to the state
    inputHandler = (event) => {
        this.setState({zipCode: event.target.value})
    };

    // handles searching and processes obtained data from api after hitting search button
    searchHandler = () => {
        this.deleteMarkers();
        let zip = this.state.zipCode;
        let country = this.state.selectedCountry;
        let searchString = "";
        let searched = [...this.state.searched];
        let arrayString = "";
        if (this.state.selectedCountry === null) {
            alert("select country");
        } else {
            if ((country === "sk" || country === "cz") && zip.length === 5 && /\d/.test(zip)) {
                zip = [zip[0]] + [zip[1]] + zip[2] + " " + zip[3] + zip[4];
            }
            if (!/\d/.test(zip) || zip.length < 3 || zip.length > 8) {
                alert("invalid zip code");
            } else {
                searchString = country + " - " + zip;
                searched.push(searchString);
                if (searched.length === 11) {
                    searched.shift();
                }
                arrayString = searched.toString();
                sessionStorage.setItem("searches", arrayString);
                this.setState({searched});
                this.fetchData(country, zip);
            }
        }
    };

    // makes new search after clicking on an item in search history
    searchAgain = (string) => {
        let parsed = string.split(" - ");
        this.setState({selectedCountry: parsed[0], zipCode: parsed[1]}, this.searchHandler);
    };

    // fetching data from zippopotam server
    fetchData = (country, zip) => {
        axios.all([axios.get("https://api.zippopotam.us/" + country.toString() + "/" + zip.toString())
        ]).then(axios.spread((response) => {
            this.showData(response.data);
        })).catch(error => {
            alert("Zip code doesn't exist in selected country.");
            console.log(error)
        });
    };

    // showing data about places in the table
    showData = (data) => {
        let place;
        let places = data.places;
        let listOfPlaces = [];
        let marker;
        let markers = [];
        for (let i = 0; i < Object.keys(places).length; i++) {
            place = places[i];
            listOfPlaces.push({name: place["place name"], lng: place.longitude, lat: place.latitude});
            marker = {lat: place.latitude, lng: place.longitude};
            markers.push(marker);
        }
        this.makeMarkers(markers);
        this.setState({listOfPlaces})
    };

    // creates marker tags and adds them to a list
    makeMarkers = (markersData) => {
        let markers = [];
        if (markersData !== null) {
            markers = markersData.map((item, index) => {
                return <Marker
                    key={index}
                    lat={item["lat"]}
                    lng={item["lng"]}/>
            });
        }
        this.setState({markers})
    };

    // deletes all markers
    deleteMarkers = () => {
        if (this.state.markers.length !== 0) {
            this.setState({markers: []});
        }
    };

    render() {
        return (
            <Aux>
                <MediaQuery query='(min-device-width: 862px)'>
                    <div className={classes.topLarge}>
                        <Controls size="large"
                                  handleInput={this.inputHandler}
                                  handleSearch={this.searchHandler}
                                  handleSelect={this.selectHandler}
                                  list={this.state.listOfPlaces}
                                  searched={this.state.searched}
                                  searchAgain={this.searchAgain}/>
                    </div>
                    <div className={classes.bottomLarge}>
                        <GoogleMap markers={this.state.markers}/>
                    </div>
                </MediaQuery>
                <MediaQuery query='(max-device-width: 861px)'>
                    <div className={classes.topSmall}>
                        <Controls size="small"/>
                    </div>
                    <div className={classes.bottomSmall}>
                        <GoogleMap/>
                    </div>
                </MediaQuery>
            </Aux>
        )
    }
}

export default ZipCodesViewer;
