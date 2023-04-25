import React, { useContext } from 'react';
import UserContext from './User';
import Amenities from './Amenities.js';
import HouseRules from './HouseRules.js';
import HealthAndSafety from './HealthAndSafety.js';
import { Link, useLocation } from "react-router-dom";
import AccountMenu from './AccountMenu';
import Footer from './Footer';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import Reviews from './Reviews.js';

//Not being used for now
function ShowFavourites() {
    return (
        <>
            <span>Add to favoutites </span>
            <button value="favourites" className="placeicon"><i className="fa-thin fa-heart" style={{ color: 'black' }}></i></button>
        </>
    );
}

function addToFavourite(userId, propertyId) {
    const addPropToFav = 'http://localhost:9000/favourites/' + userId + '?propertyid=' + propertyId;
    console.log(addPropToFav)
    const requestOptions = {
        method: 'PUT'
    };
    fetch(addPropToFav, requestOptions).then((response) => {
        return response.json();
    }).then((result) => {
    });
}

function removeFromFavourite(userId, propertyId) {
    const removePropFromFav = 'http://localhost:9000/favourites/' + userId + '?propertyid=' + propertyId;
    console.log(removePropFromFav)
    const requestOptions = {
        method: 'DELETE'
    };
    fetch(removePropFromFav, requestOptions).then((response) => {
        return response.json();
    }).then((result) => {
        window.location.reload();
    });
}


export default function PropertyDetails({ property }) {
    const userId = useContext(UserContext);
    let location = useLocation();
    console.log(location);
    console.log(location.state);

    /**
     * Code for Add to/Remove from favourites
     */
    const [showFavourite, setShowFavourite] = useState(false);
    const onClick = (showFavourite) => setShowFavourite(!showFavourite)


    const [checkin, setCheckin] = useState("");
    const [checkout, setCheckout] = useState("");

    const onChangeHandler = event => {
        setCheckin(event.target.value);
    };

    const onChangeHandler2 = event => {
        setCheckout(event.target.value);
    };

    console.log(checkin);
    console.log(checkout);

    const propertyImages = location.state.images.map((images, index) =>
        index < 3 && (
            <>
                <span className="card">
                    <img className="card-img-top" src={images} alt="New Card image cap" />
                </span>
            </>
        )
    );

    const allPropertyImages = location.state.images.map((images) => (
        <>
            <span className="card">
                <a href="#moreimages" data-bs-toggle="modal" data-bs-target="#moreimages"><img className="card-img-top" src={images} alt="New Card image cap" /></a>
            </span>
        </>
    )
    );

    return (

        <>
            <header className="main-header mt-auto py-3 bg-light fixed-top">
                <nav className="navbar navbar-expand-lg fixed-top navbar-light bg-light ">
                    <a className="navbar-brand" href="/">
                        <img src="../img/logo.png" width="10%" className="align-top" />
                        <span className="logo text-uppercase font-weight-bold align-bottom">Aptic</span>
                    </a>

                    <div className="collapse navbar-collapse " id="navbar">

                    </div>
                    <div>
                        <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'right' }}>
                            <Typography sx={{ minWidth: 100 }}>Property Details</Typography>
                        </Box>
                    </div>

                    <div>
                        <AccountMenu />
                    </div>
                </nav>
            </header>

            <div style={{ margin: '6%', }}>
                {/*Title of property*/}
                <div style={{ display: 'flex' }}>
                    <div style={{ flex: '1' }}>
                        <h3>{location.state.title}</h3>
                    </div>

                    <div style={{ flex: '1', textAlign: 'right' }} onClick={() => setShowFavourite(!showFavourite)}>
                        {!showFavourite ? <>
                            <span>Add to favoutites </span>
                            <button value="favourites" className="placeicon" onClick={() => addToFavourite(userId, location.state._id)}>
                                <i className="fa-thin fa-heart" style={{ color: 'black' }}></i>
                            </button>
                        </>
                            : <>
                                <span>Remove from favoutites </span>
                                <button value="favourites" className="placeicon" onClick={() => removeFromFavourite(userId, location.state._id)}>
                                    <i className="fa-light fa-heart" style={{ color: 'red' }}></i>
                                </button>
                            </>
                        }

                        {/* {!showFavourite ? <><span>Remove from favoutites </span>
                            <button value="favourites" className="placeicon" onClick={() => removeFromFavourite(userId, location.state._id)}> <i className="fa-light fa-heart" style={{ color: 'red' }}></i></button></>
                            : null} */}

                    </div>
                </div>
                {/*reviews and location*/}
                <div>
                    <span><i className="fa-sharp fa-solid fa-star placeicon" />&nbsp; {location.state.reviews.stars}</span>
                    <span> | </span>
                    <span><a href="#morereviews" className="nodecoration" data-bs-toggle="modal" data-bs-target="#morereviews"><u>{location.state.reviews.totalReviews} reviews</u></a></span>
                    <span> | </span>
                    <span><a href="#" className="nodecoration"><u>{location.state.location}</u></a></span>
                    <span />
                </div>

                <br />

                <hr style={{ marginRight: '10%' }} />
                {/*Images*/}
                <div className="flex-container">

                    {propertyImages}

                </div>

                <hr style={{ marginRight: '10%' }} />

                <div style={{ display: 'flex' }}> {/*flex => side by side divs*/}
                    {/*left div*/}
                    <div style={{ flex: 1 }}>
                        {/*hosted by*/}
                        <div>
                            <span><p>{location.state.hostMessage}</p></span>
                        </div>
                        {/*Max size*/}
                        <div>
                            <span>{location.state.guests} guests </span>
                            <span>{location.state.beds} bed </span>
                            <span>{location.state.baths} bath</span>
                        </div>

                        {/*Description of property*/}
                        <div>
                            {location.state.description}
                        </div>
                        <hr style={{ marginRight: '10%' }} />

                        {/*Amenities*/}
                        <div>
                            <div><h5>Amenities</h5></div>
                            <div className style={{ height: '10%' }}>
                                <Amenities allAmenities={location.state.amenities} limit={false} />
                            </div>
                        </div>

                        {/* <hr style={{ marginRight: '10%' }} /> */}

                    </div>
                    {/*right div*/}
                    <div style={{ flex: 1, textAlign: 'center' }}>

                        <form method="post" action="/temp/confirmreservation" >

                            <div style={{ paddingBottom: '18px' }}>
                                CheckIn : <input placeholder="Check In" type="date" name="checkin" id="checkin" value={checkin} onChange={onChangeHandler} style={{ maxWidth: '250px' }} />
                            </div>

                            <div style={{ paddingBottom: '18px' }}>
                                CheckOut : <input placeholder="Check Out" type="date" name="checkout" id="checkout" value={checkout} onChange={onChangeHandler2} style={{ maxWidth: '250px' }} />
                            </div>

                            <div style={{ paddingBottom: '18px' }}>
                                Guests : <input min={1} max={location.state.guests} type="number" name="guests" id="guests" style={{ maxWidth: '250px' }} />
                            </div>

                            <Link to={{pathname : '/propertyDetails/confirmreservation', state : location.state}}>
                            {/* <Link to={`/temp/confirmreservation/${location.state},${checkin},${checkout}`}> */}
                                <div className="reserve"><input name="skip_Submit" defaultValue="Submit" type="submit" value="Make Reservation"/>
                                </div>
                            </Link>
                            <br/>
                            <div>
                                Per night charges : {location.state.nightlyFee}
                            </div>

                            <div>
                                <span>Cleaning fee : {location.state.cleaningFee}</span>
                            </div>

                            <div>
                                <span>Service fee : {location.state.serviceFee}</span>
                            </div>

                            <div>
                                Total before taxes for one night : {location.state.nightlyFee + location.state.cleaningFee + location.state.serviceFee}
                            </div>

                        </form>
                    </div>
                </div>
                <hr/>

                {/*Additional Policies*/}
                <div style={{ display: 'flex' }}>
                    {/*House Rules*/}
                    <div style={{ flex: 1 }}>
                        <div><h5>House Rules</h5></div>
                        <span style={{ flex: 1 }}>
                            <HouseRules allHouseRules={location.state.houseRules} />
                        </span>
                    </div>

                    {/*Health and saftey*/}
                    <div style={{ flex: 1 }}>
                        <div><h5>Health and saftey</h5></div>
                        <span style={{ flex: 1 }}>
                            <HealthAndSafety allHealthAndSafety={location.state.healthAndSafety} />
                        </span>
                    </div>
                    {/*Cancelation Policy*/}
                    <div style={{ flex: 1 }}>
                        <div><h5>Cancelation Policy</h5></div>
                        <span style={{ flex: 1 }}>
                            {/* <CancellationPolicy allcancellationPolicy={location.state.cancellationPolicy} /> */}
                            {location.state.cancellationPolicy}
                        </span>
                    </div>
                </div>
                <hr style={{ marginRight: '10%' }} />

                {/*Reviews*/}
                <Reviews reviewJson={location.state.reviews} />

            </div>

            <Footer />

        </>

    )
}
