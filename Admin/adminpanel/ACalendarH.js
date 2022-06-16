import React, { useState, useEffect } from "react";
import axios from 'axios';
import { editCalendH, createCalendH } from "../../Requests/R_CalendarH"
import { r_delete } from "../../Requests/R_delete";
import ControlNav from "../../templates/block/ControlNav";
import "../../styles/dashboard.scss"
import CkeditorCard from "../../components/card/CkeditorCard";

const ACalendarH = () => {

    const [id, setId] = useState(1)
    const [title, setTitle] = useState('')
    const [image, setImage] = useState(null)
    const [descr, setDescr] = useState('')
    const [date_dayh, setDate_dayh] = useState('')
    const [сreate, setCreate] = useState(false);
    const [change, setChange] = useState(false);

    const [reload, setReload] = useState(false)
    const [re, setRE] = useState("");
    async function click() {

        {
            change ?
                editCalendH(id, title, image, descr, date_dayh) :
                createCalendH(title, image, descr, date_dayh);
        }
        console.log(re);
        setCreate(false)
        setChange(false)
        setTimeout(setReload(!reload), 50000);

    }
    async function Create() {
        setCreate(true)
        setChange(false)
    }
    async function Change(id) {
        setId(id)
        setCreate(true)
        setChange(true)
    }
    async function Del(id) {
        r_delete("http://localhost:8081/api/DelCalendarH/" + id)
        const resquest = r_delete(id)
        console.log(resquest);
        setCreate(false)
        setChange(false)

        setReload(!reload);
    }
    async function Close() {
        setCreate(false)
        setChange(false)
    }

    const [poin, setPoin] = useState([])


    async function fetchPosts() {
        const res = await axios.get('http://localhost:8081/api/CalendarHealth');
        setPoin(res.data);
        console.log(poin);
    }


    useEffect(() => {
        console.log("reload")
        fetchPosts()
    }, [reload])

    const createDescr = (newDescr) => {
        setDescr(newDescr)
    }

    return (
        <div class="container-fluid">
            <div class="row">

                <ControlNav></ControlNav>
                <main class=" ms-sm-auto px-md-4">
                    <h1 className="row justify-content-md-center">Календарь медицицинских дат</h1>
                    <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                        <button type="submit" class="btn btn-sm btn-outline-secondary" onClick={Create}>Создать</button>
                    </div>
                    {сreate ?
                        <div class="box row">
                            <div class="container ">
                                <form enctype="multipart/form-data">
                                    {change ?
                                        <label class="input-group-text" >{id}</label>
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
                                   
                                    <CkeditorCard create={createDescr} descr={descr} ></CkeditorCard>
                                   
                                    <input type="text" name="date_dayh" placeholder="Дата" class="form-control"
                                        value={date_dayh}
                                        onChange={e => setDate_dayh(e.target.value)}
                                    />
                                </form>
                                <button type="submit" class="btn btn-sm btn-outline-secondary" onClick={click} >{
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
                                    <th scope="col">image</th>
                                    <th scope="col">date_dayh</th>
                                </tr>
                            </thead>
                            <tbody>
                                {poin.map(post =>
                                    <tr>
                                        <td>{post.id}</td>
                                        <td class="td-title">{post.title}</td>
                                        <td>{post.descr}</td>
                                        <td>{post.image}</td>
                                        <td>{post.dateDayH}</td>
                                        <button type="submit" class="btn btn-sm btn-outline-secondary"
                                            onClick={(e) => Change(post.id)}
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
export default ACalendarH;