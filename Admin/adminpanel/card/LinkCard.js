import React from "react";

export default function LinkCard(props) {
return (
    <div className="link-card text-center h-100">
        <a target="_blank" href={props.link.url}>

        <img className="link-card-img rounded-circle mt-2"
                    src={props.link.image}
                ></img>
                <p className="link-card-title">
                    {props.link.title}
                </p>
            </a>
    </div>

    );
}
