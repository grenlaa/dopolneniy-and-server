import React, { useState, useEffect } from "react";
import axios from 'axios';
import { createGrBr,editGrBr } from "../../Requests/R_GrBr";
import {r_delete} from "../../Requests/R_delete";
import ControlNav from "../../templates/block/ControlNav";
import "../../styles/dashboard.scss"


const ABrainS = () => {

    const [id, setId] = useState(1)
    const [title, setTitle] = useState('')
    const [url, setUrl] = useState('')
    const [image, setImage] = useState(null)

    const [сreate, setCreate] = useState(false);
    const [change, setChange] = useState(false);

    const [poin, setPoin] = useState([])


    async function click() {
        { change ?
            editGrBr("http://localhost:8081/api/EditBrain/",id,title,image,url):
            createGrBr("http://localhost:8081/api/CreateBrain",title,image,url); }
      
        fetchPosts()
        setCreate(false)
        setChange(false)
    }
    async function Create() {
        setCreate(true)
        setChange(false)
    }
    async function Change(id,title,image,url) {
        setId(id)
        setTitle(title)
        setUrl(url)
        setImage(image)
        setCreate(true)
        setChange(true)
    }
    async function Del(id) {
       
        r_delete("http://localhost:8081/api/DelBrain/"+id)
      
        setCreate(false)
        setChange(false)
        fetchPosts()
    }
    async function Close() {

        setCreate(false)
        setChange(false)
    }
    async function fetchPosts() {
        const res = await axios.get('http://localhost:8081/api/Brain');
        setPoin(res.data);
        console.log(poin);
    }
    
    useEffect(() => {
        fetchPosts()
        console.log(id);
    }, [id])
    return (
        <div class="container-fluid">
            <div class="row">
                <ControlNav></ControlNav>
                <main class="ms-sm-auto px-md-4">
                    <h1 className="row justify-content-md-center">Страница "Прокачай мозг"</h1>
                    <button type="submit" class="btn btn-sm btn-outline-secondary" onClick={Create}>Создать</button>
                   {сreate ?
                        <div class="box row">
                            <div class="container ">
                                <form enctype="multipart/form-data">
                                    {change ?
                                        <label class="input-group-text" >id:   {id}</label>
                                        :
                                        <></>
                                    }
                                    <input type="text" name="title" placeholder="Название" class="form-control"
                                        value={title}
                                        onChange={e => setTitle(e.target.value)}
                                    />
                                    <input type="file" name="image" placeholder="Изображение" class="form-control"
                                        files={image}
                                        onChange={e => setImage(e.target.files[0])}
                                    />
                                    <input type="text" name="url" placeholder="Ссылка на сайт" class="form-control"
                                        value={url}
                                        onChange={e => setUrl(e.target.value)}
                                    />
                                </form>
                                <button type="submit" class="btn btn-sm btn-outline-success" onClick={click} >{
                                    change ?
                                        <h>Изменить</h> :
                                        <h>Добавить</h>
                                }</button>
                                 <button type="submit" class="btn btn-sm btn-outline-secondary" onClick={Close}>Закрыть</button>
                    
                            </div>
                        </div>
                        :
                        <div class="row"></div>
                    }

                    <div class="table-responsive">
                        <table class="table table-sm">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">title</th>
                                    <th scope="col">image</th>
                                    <th scope="col">url</th>
                                </tr>
                            </thead>
                            <tbody>
                                {poin.map(post =>
                                    <tr>
                                        <td>{post.id}</td>
                                        <td>{post.title}</td>
                                        <td>{post.image}</td>
                                        <td>{post.url}</td>
                                        <button type="button" class="btn btn-sm btn-outline-warning"
                                            onClick={(e) => Change(post.id,post.title,post.image,post.url)}
                                        > Изменить</button>
                                        <button type="button" class="btn btn-sm btn-outline-danger"
                                            onClick={(e) => Del(post.id)}
                                        > Удалить</button>
                                    </tr>
                                )
                                }
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>
        </div>
    )
}
export default ABrainS;