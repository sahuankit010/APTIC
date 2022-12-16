import React from 'react'

export default function Footer() {
  return (
    <>
      <footer className="main-footer mt-auto py-3 bg-light fixed-bottom" style={{ marginTop: '10%' }}>
          <div style={{ marginleft: '2%', marginRight: '2%' }}>
            <span className="text-muted"> &copy; APTIC, a home rental website. All rights reserved</span>
            <span style={{ fontSize: '20px' }}>&#8226;</span>
            <span><a href="#">Terms & Conditions</a></span>
            <span style={{ fontSize: '20px' }}>&#8226;</span>
            <span><a href="#">Privacy Policy</a></span>
            <span style={{ float: "right", marginRight: 1 }}>
              <span><a href="#">Support</a></span>
              <span> | </span>
              <span><a href="#">Feedback</a></span>
              <span> | </span>
              <span><a href="https://www.facebook.com" target="_blank" rel="noreferrer noopener"><i
                className="fa-brands fa-facebook placeicon"></i></a></span>
              <span> | </span>
              <span><a href="https://www.instagram.com" target="_blank" rel="noreferrer noopener"
                style={{ color: "maroon" }}><i className="fa-brands fa-instagram placeicon"></i></a></span>
            </span>
          </div>
        </footer>
    </>
  )
}
