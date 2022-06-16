import axios from 'axios';
import { post } from 'jquery';
import React, { useEffect, useState } from 'react';
import {BrowserRouter, Route} from 'react-router-dom'



function Home() {

  const [ovens, setOven] = useState([])

  async function fetchPosts() {
   
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  return (
    <div>
     
    </div>
  );
}

export default Home;
