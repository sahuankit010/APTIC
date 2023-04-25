import React from 'react';

export default function Reviews({ reviewJson }) {

    const reviews = reviewJson.review.map((review) => (
            <>
                <div className="container">
                    <div className="col">
                        <span><i className="fa-solid fa-user placeicon" /></span>
                        <span>{review.name}</span> <br />
                        <span><i className="fa-regular fa-calendar placeicon text-muted" /></span>
                        <span className="text-muted">{review.date}</span> <br />
                        <span><b>Ratings:</b> {review.ratings} stars</span> <br />
                        <span><b>Feedback:</b> {review.description}</span> <br />
                        <br />
                    </div>
                </div>
            </>
        )
    );

    return (
        <>
            <div>
                {/*Review header*/}
                <div>
                    <span><u>Average Ratings: </u>{reviewJson.stars}<i className="fa-sharp fa-solid fa-star placeicon" /></span>
                    <span> | </span>
                    <span><u>Total Reviews: </u>{reviewJson.totalReviews}</span>
                </div>

                {/*Review body*/}
                <div className="container">
                    <ul> {reviews} </ul>
                </div>

            </div>
        </>
    )
}
