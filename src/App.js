import React, { useState, useEffect } from "react";
import "./App.css";
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent,
} from "@material-ui/core";
import InfoBox from "./InfoBox";
import Table from "./Table";
import { prettyPrintStat, sortData } from "./util";
import LineGraph from "./LineGraph";
import TableIndia from "./TableIndia";
import numeral from "numeral";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [tableIndiaData, setTableIndiaInfo] = useState([]);
  //State= is how to write the variable in react
  //https://disease.sh/v3/covid-19/countries
  //USEEFFECT = runs a piece of code based on a given condition
  //[countries] is a given condition here

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

  useEffect(() => {
    const getStatesData = async () => {
    fetch("https://disease.sh/v3/covid-19/gov/India")
      .then((response) => response.json())
      .then((data) => {
        const statedata = data.states;
        const sortedData = sortData(statedata);
        setTableIndiaInfo(sortedData);
        //setTableIndiaInfo(data);
        //console.log(data);
      });
    };
    getStatesData();
  }, []);

  useEffect(() => {
    // the code inside here will run once when thhe component loads and not again
    //we have to run a piece of code which is asyncronous
    //-> send a request, wait for it, do something with info
    //data mangaya he api call karke
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country, // United States,
            value: country.countryInfo.iso2, // US, USA,FR
          }));
          const sortedData = sortData(data);
          setTableData(sortedData);
          setCountries(countries);
        });
    };
    getCountriesData();
  }, []);



  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    //setCountry(countryCode);
    const url =
    countryCode === "worldwide"
      ? "https://disease.sh/v3/covid-19/all"
      : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(countryCode);//this will set the country name to that bar
        setCountryInfo(data);   //this will store the data of that country
      });
  };
  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>COVID 19 TRACKER</h1>
          <FormControl className="app__dropdown">
            <Select
              variant="outlined"
              value={country}
              onChange={onCountryChange}
              
            >
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="app__stats">
          {/* props allows one container to be different from other */}
          <InfoBox
            title="Coronavirus Cases"
            cases={prettyPrintStat(countryInfo.todayCases)}
            total={numeral(countryInfo.cases).format("0.0a")}
          />
          <InfoBox
            title="Recovered"
            cases={prettyPrintStat(countryInfo.todayRecovered)}
            total={numeral(countryInfo.recovered).format("0.0a")}
          />
          <InfoBox
            title="Deaths"
            cases={prettyPrintStat(countryInfo.todayDeaths)}
            total={numeral(countryInfo.deaths).format("0.0a")}
          />
        </div>

        {/*Header*/}
        {/*title + select input dropdown field*/}
        {/*InfoBoxes*/}
        {/*InfoBoxes*/}
        {/*InfoBoxes*/}
        <h1>India Specific</h1>
        <TableIndia indiaData={tableIndiaData} />
        {/*map*/}
      </div>
      <Card className="app__right">
        <CardContent>
          <h3>Live Cases by Country</h3>
          <Table countries={tableData} />
          {/*Table*/}
          <h3>WorldWide new Cases</h3>
          <LineGraph  />
          {/*Graph*/}
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
