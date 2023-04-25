import React from 'react';
import { useState, useEffect } from 'react';

export default function Amenities({allAmenities, limit}) {

    const [useLimit, setLimit] = useState(limit);
    
    const listItems = allAmenities.map((amenity, index) =>
        index < 5 && ( 
        <li key={amenity.toString()}>
            {amenity}
        </li>)
    );

    const listItems2 = allAmenities.map((amenity) =>
      <li key={amenity.toString()}>
        {amenity}
      </li>
    );
    
    
  return (
    <>
      {limit ? <ul>{listItems}</ul> : null}
      {!limit ? <ul>{listItems2}</ul> : null}
    </>
  )
}
