import React from "react";

export default function CardNotes(props) {

    return (
        <div class="card " href="">
            <h10 class="card-header">{props.notes.title}</h10>
            <div class="card-body">
            <div className="Container text-card-over" dangerouslySetInnerHTML={{ __html: props.notes.descr }}></div>
                <button type="button" class="btn btn-outline-secondary btn-sm" onClick={(event) => {props.open(props.notes.id,props.notes.title,props.notes.descr,false)}}>Открыть</button>
                <button type="button" class="btn btn-outline-danger btn-sm" onClick={(event) => {props.delet(props.notes.id)}}>Удалить</button>
            </div>
        </div>

    )
}