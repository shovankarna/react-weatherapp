import React from 'react';
import moment from 'moment';



export default function DisplayWeather(props) {
    const { location, country, currdt, temp, maxTemp, minTemp, main, description, icon, humidity, windSpeed, clouds, sunrise, sunset } = props.weatherData;

    // function timeConverter(t) {
    //     var dt = new Date(t * 1000);
    //     var hr = dt.getHours();
    //     var m = "0" + dt.getMinutes();
    //     var s = "0" + dt.getSeconds();
    //     return hr + ':' + m.substr(-2) + ':' + s.substr(-2);
    // }
    var sunriseconv = moment.unix(sunrise).format("hh:MM:ss");
    var sunsetconv = moment.unix(sunset).format("hh:MM:ss");
    var currentdate = moment.unix(currdt).format("MMMM Do, dddd");
    var imgsrc = `http://openweathermap.org/img/wn/${icon}@2x.png`;

    console.log(Object.keys(props).length === 0)

    
    if (props.errors.error) {
        return (
            <div className='error'>
                <div className='errormessage'>
                    {props.errors.error}
                </div>
            </div>
        )
    }
    else {
        return (
            <div className='main-body'>
                <div className='main-left'>
                    <div className='location'>
                        {location}, {country}
                    </div>
                    <div className='current-date'>
                        {currentdate}
                    </div>
                    <div className='temp-icon'>
                        <div className='currentTemp'>
                            {temp}°
                        </div>
                        <div className='icon'>
                            <img alt="" src={imgsrc} />
                        </div>
                    </div>
                    <div className='main-detail'>
                        {description}
                    </div>
                </div>
                <div className='main-right'>
                    <table>
                        <tbody>
                            <tr>
                                <th>{maxTemp}°<br />High</th>
                                <th>{windSpeed} m/s <br />Wind</th>
                                <th>{sunriseconv}<br />Sunrise</th>
                            </tr>
                            <tr>
                                <th>{minTemp}°<br />Low</th>
                                <th>{humidity}%<br />Humidity</th>
                                <th>{sunsetconv}<br />Sunset</th>
                            </tr>
                        </tbody>
                    </table>
                    {/* {clouds}% <br /> */}
                    <br />
                </div>
            </div>
        )
    }
}
