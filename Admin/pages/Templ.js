import React, { useState } from "react";


const Templ = () => {

    const[post,setPost]=useState([{title:"",image:"",descr:"",date_dayh:""}])

    async function fetchPosts() {
        console.log(post);
    }
    return (
        <div>
            <div class="container mt-5 mb-5">
                <button type="submit" class="btn btn-success" onClick={fetchPosts}>Список для редактирования</button>
                <h1>Добавление</h1>
                <form action="/Tem" method="post" enctype="multipart/form-data">
                    <input type="text" name="title" placeholder="Название" class="form-control" value={setPost.title} /><br/>
                    <input type="file" name="image" placeholder="Изображение" class="form-control" value={setPost.image}/><br/>
                    <input type="text" name="descr" placeholder="Описание" class="form-control" value={setPost.descr}/><br/>
                    <input type="text" name="date_dayh" placeholder="Дата" class="form-control" value={setPost.date_dayh}/><br/>
                    <button >Добавить</button>
                </form>
            </div>
        </div>
    )
}
export default Templ;