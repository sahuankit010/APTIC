import React from 'react'

export default function CancellationPolicy({allcancellationPolicy}) {

    // const listItems = allcancellationPolicy.map((cancellationPolicy) => 
    //     <li key={cancellationPolicy.toString()}>
    //         {cancellationPolicy}
    //     </li>
    // );

  return (
    <>
        <span>{allcancellationPolicy}</span>
    </>
  )
}
