import React, { useState, useEffect } from "react";
import axios from 'axios';
import { createMap,editMap,delMap } from "../../Requests/R_Map";
import {r_delete} from "../../Requests/R_delete";
import ControlNav from "../../templates/block/ControlNav";
import "../../styles/dashboard.scss"

import { YMaps, Map, ObjectManager, RoutePanel, Placemark } from 'react-yandex-maps'

let mapState = {
    center: [59.123304, 37.904471],
    zoom: 13
};

const AShopMap = () => {
    const [id, setId] = useState(1)
    const [title, setTitle] = useState('')
    const [descr, setDescr] = useState('')
    const [number, setNumber] = useState('')
    const [site, setSite] = useState('')
    const [url, setUrl] = useState('')

    const [cord, setCord] = useState([59.126, 37.906])

    const [сreate, setCreate] = useState(false);
    const [change, setChange] = useState(false);

    const [poin, setPoin] = useState([])
    const [req, reqPoin]=useState([3]);

    async function click() {
       { change ?
        editMap("http://localhost:8081/api/EditShopMap/",id,title,descr,number,site,url,cord[0],cord[1]):
        createMap("http://localhost:8081/api/CreateShopMap",title,descr,number,site,url,cord[0],cord[1]);}
            
        reqPoin(3);
        setCreate(false)
        setChange(false)
    }
    async function Create() {
        setCreate(true)
        setChange(false)
    }
    async function Change(id,title,descr,number,site,url,x,y) {
        setId(id)
        setNumber(number)
        setTitle(title)
        setUrl(url)
        setSite(site)
        setDescr(descr)
        setCord([x,y])
        setCreate(true)
        setChange(true)
    }
    async function Del(asd) {
        r_delete("http://localhost:8081/api/DelShopMap/"+id)
        setCreate(false)
        setChange(false)
        
        reqPoin(4);
    }
    async function Close() {
        setCreate(false)
        setChange(false)
    }
    async function fetchPosts() {
        const res = await axios.get('http://localhost:8081/api/ShopMap');
        setPoin(res.data);
        console.log(poin);
    }
    
    useEffect(() => {
        fetchPosts()
    },[req])


    return (
        <div class="container-fluid">
            <div class="row">
                <ControlNav></ControlNav>
                <main class="ms-sm-auto px-md-4">
                    <h1 className="row justify-content-md-center">Карта спортивных магазинов</h1>
                    <button type="submit" class="btn btn-sm btn-outline-secondary" onClick={Create}>Создать</button>
                    {сreate ?
                        <div class="box row">
                            <div class="col-lg-8 addMap">
                                <YMaps query={{ mode: "debug" }}>
                                    <Map defaultState={mapState} style={{ width: '100%', height: '500px' }} onClick={e => setCord(e.get('coords'))}>
                                        <Placemark geometry={[cord[0], cord[1]]} options={{ draggable: true }} onDragEnd={e => setCord(e.get('target').geometry.getCoordinates())}></Placemark>
                                    </Map>
                                </YMaps>
                            </div>
                            <div class="col">
                                <label>Координаты метки X:</label>
                                <label class="input-group-text" >{cord[0]}</label>
                                <label>Координаты метки Y: </label>
                                <label class="input-group-text" >{cord[1]}</label>
                            </div>
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
                                     <input type="text" name="descr" placeholder="Описание" class="form-control"
                                        value={descr}
                                        onChange={e => setDescr(e.target.value)}
                                    />
                                    <textarea type="text" name="number" placeholder="Номер" class="form-control"
                                        value={number}
                                        onChange={e => setNumber(e.target.value)}
                                    />
                                    <input type="text" name="site" placeholder="Название сайта" class="form-control"
                                        value={site}
                                        onChange={e => setSite(e.target.value)}
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
                                    <th scope="col">descr</th>
                                    <th scope="col">number</th>
                                    <th scope="col">site</th>
                                    <th scope="col">url</th>
                                </tr>
                            </thead>
                            <tbody>
                                {poin.map(post =>
                                    <tr>
                                        <td>{post.id}</td>
                                        <td>{post.title}</td>
                                        <td>{post.descr}</td>
                                        <td>{post.number}</td>
                                        <td>{post.site}</td>
                                        <td>{post.url}</td>
                                        <button type="button" class="btn btn-sm btn-outline-warning"
                                            onClick={(e) => Change(post.id,post.title,post.descr,post.number,post.site,post.url,post.x,post.y)}
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
export default AShopMap;