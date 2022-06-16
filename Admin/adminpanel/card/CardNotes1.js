import React from "react";

export default function CardNotes(props) {

    console.log(props)
    return (
        <div class="card " href="">
            <h10 class="card-header">{props.notesC.title}</h10>
            <div class="card-body">
                <div className="Container text-card-over" dangerouslySetInnerHTML={{ __html: props.notesC.descr }}></div>
                <button type="button" class="btn btn-outline-secondary btn-sm" onClick={(event) => {props.open(props.notesC.id,props.notesC.title,props.notesC.descr,true)}}>Открыть</button>
                <button type="button" class="btn btn-outline-danger btn-sm">Удалить</button>
            </div>
        </div>

    )
}