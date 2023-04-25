import React from 'react'

export default function HealthAndSafety({allHealthAndSafety}) {

    const listItems = allHealthAndSafety.map((houseAndSaftey) => 
        <li key={houseAndSaftey.toString()}>
            {houseAndSaftey}
        </li>
    );

  return (
    <>
        <ul>{listItems}</ul>
    </>
  )
}
