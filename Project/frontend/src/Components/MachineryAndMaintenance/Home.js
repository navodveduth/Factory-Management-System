import React from 'react'
import { Link } from 'react-router-dom'
import videoBg from '../assests/video.mp4'
import  '../styles/Chanukya/Home.css'
import CommonNavbar from './CommonNavbar';

function Home() {
  return (
    <div>
      <CommonNavbar />
      <div className="video-container">
      
        <div className="overlay">

        <video src={videoBg} autoPlay loop muted />
        </div>
      
      <div className='content'>
        <h1> Machinery and Maintenance Management</h1>
        <p>Manage machinery and maintenance with ease</p>
        <Link to='/dashboard' className='btnn'>Go to Dashoard</Link>
      </div>
        </div>
    </div>
  )
}

export default Home