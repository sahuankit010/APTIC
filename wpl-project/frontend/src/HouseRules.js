import React from 'react'

export default function HouseRules({allHouseRules}) {
  
    const listItems = allHouseRules.map((houseRule) => 
        <li key={houseRule.toString()}>
            {houseRule}
        </li>
    );

    return (
    <>
        <ul>{listItems}</ul>
    </>
  )
}
