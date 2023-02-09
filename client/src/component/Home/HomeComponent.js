import React from 'react';
import './HomeComponent.css';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';

const HomeComponent = () =>{
    const [option, setOption] = React.useState(null);
    const [countryDetails, setcountryDetails] = React.useState(null);

    React.useEffect(() => {
        fetch('/countryList')
            .then((res) => res.json())
            .then((data) => {
                setOption(data)
        })
   },[]);
    const onInputChange = (event, value) => {
        fetch(`https://restcountries.com/v2/name/${value}?fullText=true`)
            .then((res)=>res.json())
            .then((data)=>{
                setcountryDetails(data[0])
            })
    }

    return(
        <div className="container">
            <div className="Home-bg"></div>
            <div className="Home-container">
                <div className="Home-innerContainer">
                   
                    <div className="Home-search">
                    <Autocomplete
                        id="country-select-demo"
                        sx={{ width: 300 }}
                        options={option}
                        autoHighlight
                        onInputChange={onInputChange}
                        getOptionLabel={(option) => option.name}
                        renderOption={(props, option) => (
                            <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                                {option.name}
                            </Box>
                        )}
                        renderInput={(params) => (
                            <TextField
                            {...params}
                            label="Search Countries"
                            inputProps={{
                                ...params.inputProps,
                                autoComplete: 'new-password',
                            }}
                            />
                        )}
                        />
                        
                    </div>
                   
                </div>
                
                    {countryDetails ? 
                    <React.Fragment>
                    
                    <div className="Home-searchResultContainer">
                    <span className="countryName">{countryDetails.name}</span> 
                        <div className="Home-searchResult">
                            <div className="text_left">
                            
                                <p><b>Capital: </b>{countryDetails.capital}</p>
                                <p><b>Region: </b>{countryDetails.region}</p>
                            </div>
                            <div className="text_left">
                                
                                <p><b>Population: </b>{countryDetails.population}</p>
                                <p><b>Lat/Long: </b>{countryDetails.latlng}</p>
                            </div>
                            <div className="text_left">
                                
                                <p><b>Currencies: </b>{countryDetails.currencies[0].symbol} {countryDetails.currencies[0].code}</p>
                                <p><b>Currency Name: </b>{countryDetails.currencies[0].name}</p>
                            </div>
                            <img className="flag" src={countryDetails.flag}/>
                           
                           
                        </div>
                    </div>
                    </React.Fragment>
                    :""}
                   
            </div>
 
        </div>
    )
}

export default HomeComponent;