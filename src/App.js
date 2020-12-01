import React from 'react';
import Axios from 'axios';

import './App.css';
import DisplayWeather from './components/DisplayWeather.js';
import Navbar from './components/Navbar.js';
import SearchBar from './components/SearchBar.js';

class App extends React.Component {

  state = {
    coords: {
      latitude: 0,
      longitude: 0
    },
    data: {},
    errors: {},
    inputData: "",
  }

  componentDidMount() {
    console.log(Object.keys(this.state.data).length === 0)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let newCoords = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }
        this.setState({ coords: newCoords })
        // console.log(this.state.coords)
        //Api Call
        Axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${this.state.coords.latitude}&lon=${this.state.coords.longitude}&units=metric&appid=d3856252805c106a89495a655d00f5da`)
          .then(res => {
            let weatherData = {
              location: res.data.name,
              country: res.data.sys.country,
              currdt: res.data.dt,
              temp: res.data.main.temp,
              maxTemp: res.data.main.temp_max,
              minTemp: res.data.main.temp_min,
              main: res.data.weather[0].main,
              description: res.data.weather[0].description,
              icon: res.data.weather[0].icon,
              humidity: res.data.main.humidity,
              windSpeed: res.data.wind.speed,
              clouds: res.data.clouds.all,
              sunrise: res.data.sys.sunrise,
              sunset: res.data.sys.sunset,
            }
            this.setState({ data: weatherData });
          })
          .catch(err => {
            let error = {
              error: err.response.data.message
            }
            this.setState({ errors: error })
          }
          )
      })
    }
    else {
      console.log('Not supported')
    }
  }

  changeRegion = (value) => {
    this.setState({ inputData: value })
  }

  changeLocation = (event) => {
    event.preventDefault();

    //api call
    Axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${this.state.inputData}&units=metric&appid=d3856252805c106a89495a655d00f5da`)
      .then(res => {
        let weatherData = {
          location: res.data.name,
          country: res.data.sys.country,
          currdt: res.data.dt,
          temp: res.data.main.temp,
          maxTemp: res.data.main.temp_max,
          minTemp: res.data.main.temp_min,
          main: res.data.weather[0].main,
          description: res.data.weather[0].description,
          icon: res.data.weather[0].icon,
          humidity: res.data.main.humidity,
          windSpeed: res.data.wind.speed,
          clouds: res.data.clouds.all,
          sunrise: res.data.sys.sunrise,
          sunset: res.data.sys.sunset,
        }
        this.setState({ data: weatherData, errors: {} });
      }
      )
      .catch(err => {
        let error = {
          error: err.response.data.message
        }
        this.setState({ errors: error })
      }
      )
  }

  render() {
    if (Object.keys(this.state.data).length === 0) {
      return (
        <div className="App">
          <div className='container'>
            <Navbar />
            <div>
              <SearchBar changeLocation={this.changeLocation} changeRegion={this.changeRegion} />
            </div>
            <div className='location-request'>
              Please Allow Location Access!
            </div>
          </div>
            <div class="ui active inverted big text loader">Accesing Current Location</div>
        </div>

      )
    }
    return (
      <div className="App">
        <div className='container'>
          <Navbar />
          <div>
            <SearchBar changeLocation={this.changeLocation} changeRegion={this.changeRegion} />
          </div>
          <DisplayWeather weatherData={this.state.data} errors={this.state.errors} />
        </div>
      </div>
    );
  }
}

export default App;


// if (props.weatherData == null) {
//   return (
//       <div class="ui active dimmer">
//           <div class="ui big text loader">Loading</div>
//       </div>
//   )
// }