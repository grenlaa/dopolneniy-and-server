import React, { useState, useEffect } from "react";
import axios from 'axios';

import LinkCard from '../components/card/LinkCard'
import ImageIntroCard from '../components/card/ImageIntroCard'

const SectionBrain = () => {
    const [links, setLinks] = useState([])

    async function fetchPosts() {
        const res = await axios.get('http://localhost:8081/api/Brain');
        setLinks(res.data);
    }
    useEffect(() => {
        fetchPosts()
    }, [])

    return (
        <div>
            <ImageIntroCard
                img="assets/images/svg/idea.svg"
                title="ПРОКАЧАЙ МОЗГ"
            ></ImageIntroCard>

            <div className="container-lg">
                <div className="row justify-content-center">
                    {links.map(link => (
                        <div className="col-6 col-sm-4 col-md-3 col-lg-3 col-xl-3 col-xxl-3 mb-3" key={link.id}> <LinkCard link={link} /></div>
                    ))}  
                </div>
            </div>
        </div>
    );
};

export default SectionBrain;