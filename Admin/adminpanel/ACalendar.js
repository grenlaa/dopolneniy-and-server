import React, { useState, useEffect } from "react";
import axios from 'axios';
import { editCalend, createCalend } from "../../Requests/R_Calendar"
import { r_delete } from "../../Requests/R_delete";
import ControlNav from "../../templates/block/ControlNav";
import "../../styles/dashboard.scss"
import CkeditorCard from "../../components/card/CkeditorCard";
import '../../styles/aClendarStyle.scss'

import { Context } from "../..";
import { observer } from "mobx-react-lite";

const ACalendar = observer(() => {

    const [id, setId] = useState(1)
    const [title, setTitle] = useState('')
    const [descr, setDescr] = useState('')
    const [dateStart, setDateStart] = useState('')
    const [dateEnd, setDateEnd] = useState('')
    const [timeStart, setTimeStart] = useState('')
    const [timeEnd, setTimeEnd] = useState('')
    const [colorDate, setColorDate] = useState('')
    const [point, setPoint] = useState([])

    const [сreate, setCreate] = useState(false);
    const [change, setChange] = useState(false);

    const [reload, setReload] = useState(false)


    async function click() {
        createCalend(title, dateStart + "T" + timeStart, dateEnd + "T" + timeEnd, colorDate, descr)
        // createCalendH(title, image, descr, date_dayh);

        // {
        //     change ?
        //         editCalendH(id, title, image, descr, date_dayh) :
        //         createCalendH(title, image, descr, date_dayh);
        // }
        setCreate(false)
        setChange(false)
        setTimeout(setReload(!reload), 50000);

    }
    async function Create() {
        setCreate(true)
        setChange(false)
    }

    async function Change(id, title, des, color, start, end) {
        setId(id)
        setTitle(title)
        setDescr(des)
        setColorDate(color)
        setDateStart(start)
        setDateEnd(end)
        setCreate(true)
        setChange(true)
    }
    async function Del(id) {
        // r_delete("http://localhost:8081/api/DelCalendarH/" + id)
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
        const res = await axios.get('http://localhost:8081/api/Calendar');
        setPoint(res.data);
        console.log("cerf:", res)
        // if(res.data){
        //     window.location = 'http://localhost:3000'
        // }
        // setPoin(res.data);
    }


    useEffect(() => {
        console.log("token:", localStorage.getItem("token"))
        fetchPosts()
    }, [reload])

    const createDescr = (newDescr) => {
        setDescr(newDescr)
    }

    const { admin } = React.useContext(Context)


    return (
        <div class="container-fluid">
            <div class="row">

                <ControlNav></ControlNav>
                <main class=" ms-sm-auto px-md-4">
                    <h1 className="row justify-content-md-center">Календарь медицицинских дат</h1>
                    <button type="submit" class="btn btn-sm btn-outline-secondary" onClick={Create}>Создать</button>

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
                                    <textarea type="text" name="descr" placeholder="Название" class="form-control"
                                        value={descr}
                                        onChange={e => setDescr(e.target.value)}
                                    />

                                    <label class="col-form-label">Цвет:</label>
                                    <input type="color" id="head" name="head"
                                        value={colorDate}
                                        onChange={e => setColorDate(e.target.value)}
                                    />
                                    <div class="row">
                                        <div class="col-sm">
                                            <label class="col-form-label">Начало:</label>
                                            <input id="date" type="date"
                                                value={dateStart}
                                                onChange={e => setDateStart(e.target.value)}
                                            />
                                            <input id="time" type="time"
                                                value={timeStart}
                                                onChange={e => setTimeStart(e.target.value)}
                                            />
                                        </div>
                                        <div class="col-sm">
                                            <label class="col-form-label">Конец:</label>
                                            <input id="date" type="date"
                                                value={dateEnd}
                                                onChange={e => setDateEnd(e.target.value)}
                                            />
                                            <input id="time" type="time"
                                                value={timeEnd}
                                                onChange={e => setTimeEnd(e.target.value)}
                                            />
                                        </div>
                                    </div>

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
                                    <th scope="col">Название</th>
                                    <th scope="col">Описание</th>
                                    <th scope="col">Цвет</th>
                                    <th scope="col">Дата Начало</th>

                                    <th scope="col">Дата Конец</th>
                                </tr>
                            </thead>
                            <tbody>
                                {point.map(post =>
                                    <tr>
                                        <td>{post.id}</td>
                                        <td class="td-title">{post.title}</td>
                                        <td>{post.description}</td>
                                        <td>{post.color}</td>
                                        <td>{post.start}</td>
                                        <td>{post.end}</td>
                                        <button type="submit" class="btn btn-sm btn-outline-secondary"
                                            onClick={(e) => Change(post.id, post.title, post.description, post.color, post.start, post.end)}
                                        > Изменить</button>
                                        <button type="button" class="btn btn-sm btn-outline-danger" data-bs-toggle="modal" data-bs-target="#exampleModal"
                                           // onClick={(e) => Del(post.id)}
                                        > Удалить</button>
                                        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                            <div class="modal-dialog">
                                                <div class="modal-content">
                                                    <div class="modal-header">
                                                        <h5 class="modal-title" id="exampleModalLabel">удалить</h5>
                                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Закрыть"></button>
                                                    </div>
                                                    
                                                    <div class="modal-footer">
                                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">да</button>
                                                        <button type="button" class="btn btn-primary">Нет</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
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
})
export default ACalendar;