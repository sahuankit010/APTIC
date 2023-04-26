import React from 'react';
import { useState, useEffect } from 'react';
import './App.css';
import AccountMenu from './AccountMenu';
import Footer from './Footer';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { BrowserRouter as Router, Switch, Route, Redirect, Link, Location} from "react-router-dom";

function SearchBar({ filterText, onFilterTextChange }) {
  const handleClickToScroll = () => {
    const element = document.getElementById('property-card-view');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <input
      type="text"
      className="form-control mr-sm-0"
      value={filterText} placeholder="Search Destinations"
      style={{ width: '50%' }}
      onChange={(e) => onFilterTextChange(e.target.value)}
      onClick={handleClickToScroll} />
  );
}

function Cards({ property }) {

  const [showDetails, setShowDetails] = useState(false);
  const onClick = (showDetails) => setShowDetails(!showDetails)

  return (
    <>
      <div className="card my-2" onClick={() => setShowDetails(!showDetails)}>
        {property.thumbnail == "" 
        ? (<img className="card-img-top" src="default_thumbnail.jpg" alt="Defualt home image" />)
        : (<img className="card-img-top" src={property.thumbnail} alt="Image not found" />) }
        <div className="card-body">
          <h5 className="card-title"><b>{property.title} </b></h5>
          <span className="card-text"><u>{property.location}</u></span><br />
          {!showDetails ? <><span className="card-text">{property.shortDescription}</span><br /></> : null}
          <span className="card-text"><b>${property.nightlyFee}</b> per night</span><br />
          {/* {showDetails ? <CardDetails property={property} /> : null} */}
          <Link to={{ pathname: '/propertyDetails', state: property }} >
            <a href="/propertyDetails">See More...</a>
          </Link>
        </div>
      </div>
    </>
  );
}

function CardDetails({ property }) {
  return (
    <>
      <span className="card-text">{property.description}</span><br />
      <span className="card-text"><b><u>Guests:</u> {property.beds}</b></span><br />
      <span className="card-text"><b><u>Bedrooms:</u> {property.bedrooms}</b></span><br />
      <span className="card-text"><b><u>Beds:</u> {property.beds}</b></span><br />
      <span className="card-text"><b><u>Guests:</u> {property.beds}</b></span><br />
      <span className="card-text"><b><u>Baths:</u> {property.baths}</b></span><br />
      <span className="card-text"><b><u>Cleaning Fees:</u> ${property.cleaningFee}</b></span><br />
      <span className="card-text"><b><u>Service Fees:</u> ${property.serviceFee}</b></span><br />
      <span className="card-text"><b><u>Ameneties:</u></b> {property.amenities}</span><br />
      <span className="card-text"><b><u>Stars:</u></b> {property.reviews.stars}</span><br />
      <span className="card-text"><b><u>Total Reviews:</u></b> {property.reviews.totalReviews}</span><br />
    </>
  );
}


function CardItems({ properties, filterText }) {

  const cards = [];

  properties.forEach((property) => {
    if (property.title?.toLowerCase().indexOf(filterText.toLowerCase()) === -1
    && property.country?.toLowerCase().indexOf(filterText.toLowerCase()) === -1
    && property.state?.toLowerCase().indexOf(filterText.toLowerCase()) === -1
    && property.city?.toLowerCase().indexOf(filterText.toLowerCase()) === -1) {
      return
    }
    cards.push(
      <Cards
        property={property}
        key={property.id} />
    );
  });

  return (
    <>
      {cards}
    </>
  );
}


export default function App() {
  const [filterText, setFilterText] = useState('');
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    fetch("http://localhost:9000/properties")
      .then((response) => response.json())
      .then((properties) => {
        console.log(properties);
        setProperties(properties);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <div className="Home">
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-u1OknCvxWvY5kfmNBILK2hRnQC3Pr17a+RTT6rIHI7NnikvbZlHgTPOOmMi466C8" crossorigin="anonymous">
      </script>


      <header className="main-header mt-auto py-3 bg-light fixed-top">
        <nav className="navbar navbar-expand-lg fixed-top navbar-light bg-light ">
          <a className="navbar-brand" href="/">
            <img src="../img/logo.png" width="10%" className="align-top" />
            <span className="logo text-uppercase font-weight-bold align-bottom">Aptic</span>
          </a>

          <div className="collapse navbar-collapse " id="navbar">
            <SearchBar
              filterText={filterText}
              onFilterTextChange={setFilterText} />
          </div>
          <div>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'right' }}>
              <Typography sx={{ minWidth: 100 }}>Home</Typography>
            </Box>
          </div>

          <div>
            <AccountMenu />
          </div>
        </nav>
      </header>

      <div className="content-wrapper">
        <aside>
          {/* <!-- We have create a side menu for filters that we will be using later with the help of JS --> */}
        </aside>

        <div className="content-wrapper" style={{ marginBottom: '5%' }}>
          <main>

            <div className="jumbotron pt-5">
              <img src="../img/homepage_img2.jpeg" style={{ height: '40vw' }} alt="Homepage Image" />
              <div className="centered">
                <h1 style={{ fontSize: '2.5rem' }}>The World's Best Place for Vacation Rentals</h1>
                <p style={{ top: '65%' }}>A personal service for discerning guests who value exceptional
                  quality homes and experiences in the most desirable destinations</p>
              </div>
            </div>

            {/* Property Cards */}
            <div className="flex-container" id="property-card-view">
              <CardItems
                properties={properties}
                filterText={filterText} />
            </div>

          </main>
        </div>
      </div >

      <Footer />

    </div >
  );
}
