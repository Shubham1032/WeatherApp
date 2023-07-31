import React,{useEffect,useState} from 'react';
import axios from 'axios';
import cloudGif from '../Assets/cloudGif.gif'
import rainGif from '../Assets/rainGif.gif'
import clearGif from '../Assets/clear.gif'
import mistGif from '../Assets/mist.gif'

const Home = () => {
    const [data,setData] = useState([]);
    const [location,setLocation] = useState('');
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=adda4a957131b761949d93b881ea8951`
    
    function wheaterCall (event) {
        if(event.key === 'Enter'){
           axios.get(url).then((response)=>{
            setData(response.data)
            console.log(response.data)
           })   
           setLocation("")
        }
     }
    function gif () {
        console.log("running")
        if(data.weather[0].main === 'Mist'){
            return mistGif

        }
        else if(data.weather[0].main === 'Rain'){
            return rainGif
        }
        else if (data.weather[0].main === 'Clouds'){
            return cloudGif
        }
        else if (data.weather[0].main === 'Clear'){
            return clearGif
        }
    }
    
  return (
    <div className='app'>
        <div className='search'>
            <input
            value={location}
            placeholder='Enter Locations'
            onKeyPress={wheaterCall}
            onChange={event => setLocation(event.target.value)}
            type='text' />
        </div>
        <div className='container'>
            <div className='top'>
                <div className='location'>
                <p>{data.name}</p>
                </div>
                <div className='temp'>
                    {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
                {data.weather ? <img src={gif()}  height='100px'/> : null}
                 {/* <img src={gif} height='100px'/> */}
                </div>
                <div className='gif_type'>
                    
                </div>
                <div className='description'>
                    {data.weather ? <p>{data.weather[0].main}</p> : null}
                </div>
            </div>
            {data.name != undefined && 
            
            <div className='bottom'>
                <div className='feels'>
                    {data.main ? <p className='bold'>{data.main.feels_like}°C</p> : null}
                    
                    <p>Feels Like</p>
                </div>
                <div className='humidity'>
                    {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}                
                    <p>Humidity</p>
                </div>
                <div className='wind'>
                    {data.wind ? <p className='bold'>{data.wind.speed} MPH</p> : null}                
                    <p>Wind Speed</p>
                </div>
            </div>
            }
        </div>
    
    </div>
  )
}

export default Home