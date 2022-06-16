import React, { useState, useEffect } from "react";
import axios from 'axios';
import { createHRecipe, editHRecipe } from "../../Requests/R_HealthRecipe"
import { r_delete } from "../../Requests/R_delete";
import ControlNav from "../../templates/block/ControlNav";
import "../../styles/dashboard.scss"

const AHealthRecipe = () => {

    const [id, setId] = useState(1)
    const [title, setTitle] = useState('')
    const [image, setImage] = useState(null)
    const [ingredients, setIngr] = useState('')
    const [recipe, setRecipe] = useState('')
    const [time, setTime] = useState('')
    const [portion, setPortion] = useState('')
    const [nutrValue, setNutrValue] = useState('')

    const [сreate, setCreate] = useState(false);
    const [change, setChange] = useState(false);

    const [reload, setReload] = useState(false)
    const [re, setRE] = useState("");
    async function click() {

        {
            change ?
                editHRecipe(id, title, ingredients, recipe, time, portion, nutrValue, image) :
                createHRecipe(title, ingredients, recipe, time, portion, nutrValue, image);
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
        r_delete("http://localhost:8081/api/DelHealthRecipe/" + id)
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
        const res = await axios.get('http://localhost:8081/api/HealthRecipe');
        setPoin(res.data);
        console.log(poin);
    }


    useEffect(() => {
        console.log("reload")
        fetchPosts()
    }, [reload])


    return (
        <div class="container-fluid">
            <div class="row">
                <ControlNav></ControlNav>
                <main class=" ms-sm-auto px-md-4">
                    <h1 className="row justify-content-md-center">Рецепты</h1>
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
                                    <input type="file" name="image" placeholder="Изображение" class="form-control"
                                        files={image}
                                        onChange={e => setImage(e.target.files[0])}
                                    />
                                    <input type="text" name="ingredients" placeholder="Ингредиенты" class="form-control"
                                        value={ingredients}
                                        onChange={e => setIngr(e.target.value)}
                                    />
                                    <input type="text" name="recipe" placeholder="Рецепт" class="form-control"
                                        value={recipe}
                                        onChange={e => setRecipe(e.target.value)}
                                    />
                                    <input type="text" name="time" placeholder="Время приготовления" class="form-control"
                                        value={time}
                                        onChange={e => setTime(e.target.value)}
                                    />
                                    <input type="text" name="portion" placeholder="Количество порций" class="form-control"
                                        value={portion}
                                        onChange={e => setPortion(e.target.value)}
                                    />
                                    <input type="text" name="nutrValue" placeholder="Пищевая ценность" class="form-control"
                                        value={nutrValue}
                                        onChange={e => setNutrValue(e.target.value)}
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
                                    <th scope="col">название</th>
                                    <th scope="col">Изображение</th>
                                    <th scope="col">Ингридиенты</th>
                                    <th scope="col">Рецепт</th>
                                    <th scope="col">Время п.</th>
                                    <th scope="col">порции</th>
                                    <th scope="col">Пищевая ценность</th>
                                </tr>
                            </thead>
                            <tbody>
                                {poin.map(post =>
                                    <tr>
                                        <td>{post.id}</td>
                                        <td>{post.title}</td>
                                        <td>{post.image}</td>
                                        <td>{post.ingredients}</td>
                                        <td>{post.recipe}</td>
                                        <td>{post.time}</td>
                                        <td>{post.portion}</td>
                                        <td>{post.nutrValue}</td>
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
export default AHealthRecipe;