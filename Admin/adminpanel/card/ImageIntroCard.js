import React from "react";
export default function ImageIntroCard(props) {

return (
    <div>
         <div className="d-flex flex-wrap justify-content-center align-items-center mt-5 mb-5"> 
           <img className="main-introductory-img me-3" src={props.img}></img>
            <h1 className="font-bold">{ props.title }</h1>
        </div>
    </div>
    );
}
