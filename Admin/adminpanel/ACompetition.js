import axios from "axios";
import React, { useEffect, useState, Component } from "react";
import CkeditorCard from "../../components/card/CkeditorCard";
import { createCmpr, editCmpr } from "../../Requests/R_Competitor";
import { createCmpn, editCmpn } from "../../Requests/R_Competition";
import { r_delete } from "../../Requests/R_delete";
import ControlNav from "../../templates/block/ControlNav";

const Competition = () => {
    const [edit, setEdit] = useState(true)
    const [editAddCmpr, setEditAddCmpr] = useState(true)
    const [editAddCmpn, setEditAddCmpn] = useState(true)
    const [editCmpn, setEditCmpn] = useState(false)
    const [add, setAdd] = useState(false)

    const [Cmpn, setCmpn] = useState([])
    const [Cmpr, setCmpr] = useState([])

    const [titleCmpn, setTitleCmpn] = useState('')
    const [imageCmpn, setImageCmpn] = useState(null)
    const [idCmpn, setIdCmpn] = useState(1)

    const [id, setId] = useState(1)
    const [name, setName] = useState('')
    const [title, setTitle] = useState('')
    const [date, setDate] = useState('')
    const [image, setImage] = useState(null)
    const [descr, setDescr] = useState('')

    async function getCompetitorId(id, titleCmpn) {
        setIdCmpn(id)
        setTitleCmpn(titleCmpn)
        const res = await axios.get('http://localhost:8081/api/GetCompetitor/' + id);
        setCmpr(res.data);
        console.log(res.data)
        setEditCmpn(true)
        setEditAddCmpr(true)
        setEdit(true)
    }


    async function editCompetitorStart(id, name, title, image, descr) {
        setEdit(false)
        setId(id)
        setName(name)
        setTitle(title)
        setImage(image)
        setDescr(descr)
        setEditAddCmpr(false)
    }

    async function FEditAdd() {
        setEditAddCmpr(true)
        setEdit(false)
    }

    async function addCmpn() {
    }

    async function ClickCmpr() {
        // console.log("editAddCmpr:", editAddCmpr)
        let res = ""
        {
            editAddCmpr ?
                res = await createCmpr(name, title, image, descr, date, idCmpn)
                :
                res = await editCmpr(id, name, title, image, descr, date);
        }
        console.log(res)
        setEdit(true)

    }
    async function ClickCmpn() {
        // console.log("editAddCmpn:", editAddCmpn)
        let res = ""
        {
            editAddCmpn ?
                res = await createCmpn(titleCmpn, imageCmpn)
                :
                res = await editCmpn(idCmpn, titleCmpn, imageCmpn);
        }
        console.log(res)
        setEdit(true)
    }

    async function DelCmpr(id) {
        r_delete("http://localhost:8081/api/DelCompetitor/" + id)
        const resquest = r_delete(id)
        console.log(resquest);
    }

    async function DelCmpn(id) {
        r_delete("http://localhost:8081/api/DelCompetition/" + id)
        const resquest = r_delete(id)
        console.log(resquest);
    }
    //передаваемая
    const createDescr = (newDescr) => {
        setDescr(newDescr)
    }

    async function fetchPosts() {
        const res = await axios.get('http://localhost:8081/api/GetCompetition');
        setCmpn(res.data);
    }

    useEffect(() => {
        fetchPosts()
    })

    return (

        <div className="container-fluid">
            <h1 className="row justify-content-md-center">Конкурсы/Участники</h1>

            <ControlNav></ControlNav>
            <div class="row">

                <div class="col-2 scroll">
                    <h5 className="row justify-content-md-center">Конкурсы</h5>

                    <button type="button" class="btn btn-outline-secondary btn-sm btm-gr-mar-top" onClick={e => setEditCmpn(false)}>Создать</button>
                    <ul class="list-group list-group-flush">
                        {Cmpn.map(Cmpn =>
                            <li class="list-group-item" role="button" onClick={e => getCompetitorId(Cmpn.id, Cmpn.title)}>{Cmpn.title}</li>
                        )}
                    </ul>
                </div>
                <div class="col-10 scroll">
                    {editCmpn ? <div>

                        <div class="d-grid gap-3 d-md-flex justify-content-between btm-gr-mar-top">
                            <button type="button" class="btn btn-outline-secondary btn-sm btm-gr-mar-top" onClick={e => FEditAdd()}>Добавить участника</button>
                            <button type="button" class="btn btn-outline-secondary btn-sm btm-gr-mar-top" onClick={e => FEditAdd()}>Изменить Конкурс Х</button>
                            <button type="button" class="btn btn-outline-secondary btn-sm btm-gr-mar-top" onClick={e => DelCmpn(idCmpn)}>Удалить Конкурс</button>
                        </div>
                        <input type="text" name="titleCmpn" class="form-control title"
                            value={titleCmpn}
                            onChange={e => setTitleCmpn(e.target.value)}
                        />
                        {edit ?
                            <div>

                                <h5 >Участники</h5>
                                {Cmpr.map(Cmpr =>

                                    <div class="input-group">
                                        <input class="form-control f-c-b" type="text" aria-label="Disabled input example" disabled
                                            value={Cmpr.name}
                                        />
                                        <button class="btn btn-sm btn-outline-secondary" type="button" onClick={e => editCompetitorStart(Cmpr.id, Cmpr.name, Cmpr.title, Cmpr.image, Cmpr.descr)}>Изменить</button>
                                        <button class="btn btn-sm btn-outline-secondary" type="button" onClick={e => DelCmpr(Cmpr.id)}>Удалить</button>
                                    </div>

                                )}
                            </div>
                            :
                            <div class="box">

                                <div class="container ">
                                    <input type="text" name="name" placeholder="Название" class="form-control"
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                    />
                                    <input type="text" name="title" placeholder="краткое описание" class="form-control"
                                        value={title}
                                        onChange={e => setTitle(e.target.value)}
                                    />
                                    <input type="text" name="date" placeholder="краткое описание" class="form-control"
                                        value={date}
                                        onChange={e => setDate(e.target.value)}
                                    />
                                    <input type="file" name="image" placeholder="Изображение" class="form-control"
                                        files={image}
                                        onChange={e => setImage(e.target.files[0])}
                                    />
                                    <CkeditorCard create={createDescr} descr={descr} ></CkeditorCard>
                                    <div class="d-grid gap-2 d-md-flex justify-content-between btm-gr-mar-top">
                                        {editAddCmpr ?
                                            <button class="btn btn-sm btn-outline-secondary" type="button" onClick={ClickCmpr}>Добавить</button>
                                            : <button class="btn btn-sm btn-outline-secondary" type="button" onClick={ClickCmpr}>Изменить</button>
                                        }
                                        <button class="btn btn-sm btn-outline-secondary" type="button" onClick={e => setEdit(true)}>Назад</button>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                        :
                        <div class="container ">
                            <h5 className="row justify-content-md-center">Создание конкурса</h5>

                            <input type="text" name="title" placeholder="краткое описание" class="form-control"
                                value={titleCmpn}
                                onChange={e => setTitleCmpn(e.target.value)}
                            />
                            <input type="file" name="image" placeholder="Изображение" class="form-control"
                                files={imageCmpn}
                                onChange={e => setImageCmpn(e.target.files[0])}
                            />
                            <button class="btn btn-sm btn-outline-secondary" type="button" onClick={ClickCmpn}>Добавить</button>
                        </div>
                    }
                </div>

            </div>

        </div >
    )
}
export default Competition;