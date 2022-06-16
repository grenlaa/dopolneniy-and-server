import React, { useState, useEffect } from "react";
import ControlNav from "../../templates/block/ControlNav";

const ATests = () => {

    const [quest, setQuest] = useState(true);

    async function click() {
        setQuest(!quest)
    }
    return (
        <div class="container-fluid">
            <div class="row">
                <ControlNav></ControlNav>
                <main class="ms-sm-auto px-md-4">
                    <h1 className="row justify-content-md-center">Карта мед. учреждений</h1>

                    <div class="accordion" id="accordionPanelsStayOpenExample">
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="panelsStayOpen-headingOne">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                                    Тест 1
                                </button>
                            </h2>
                            <div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingOne">
                                <div class="accordion-body">

                                    {quest ?
                                        <div class="input-group ">
                                            <textarea type="text" class="form-control question" placeholder="Вопрос" />
                                            <button class="btn btn-outline-secondary" type="submit" onClick={click}>Ответы</button>
                                        </div> :
                                        <div class="container-question">
                                            <div class="input-group">
                                                <textarea type="text" class="form-control question">First and last name</textarea>
                                                <button type="submit" class="btn btn-outline-secondary ">Сохранить</button>
                                            </div>
                                            <div class="container c-answer">
                                                <div class="row justify-content-start">
                                                    <div class="col-10">
                                                        <textarea type="text" aria-label="First ans" class="form-control answer " placeholder="Ответ" />
                                                    </div>
                                                    <div class="col-2 align-self-end">
                                                        <input type="text" aria-label="two ans" class="form-control answer ball " placeholder="Балл" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-10">
                                                    <textarea type="text" aria-label="First ans" class="form-control answer " placeholder="Ответ" />
                                                </div>
                                                <div class="col-2 align-self-end">
                                                    <input type="text" aria-label="two ans" class="form-control answer ball " placeholder="Балл" />
                                                </div>
                                            </div>
                                            <div class="d-grid gap-2">
                                                <button type="submit" class="btn btn-sm btn-outline-success ">+ Добавить</button>
                                            </div>
                                        </div>
                                    }

                                </div>
                            </div>
                        </div>
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="panelsStayOpen-headingTwo">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
                                    Тест 2
                                </button>
                            </h2>
                            <div id="panelsStayOpen-collapseTwo" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingTwo">
                                <div class="accordion-body">
                                    <strong>Это тело аккордеона второго элемента.</strong> По умолчанию он скрыт, пока плагин свертывания не добавит соответствующие классы, которые мы используем для стилизации каждого элемента. Эти классы управляют общим внешним видом, а также отображением и скрытием с помощью переходов CSS. Вы можете изменить все это с помощью собственного CSS или переопределить наши переменные по умолчанию. Также стоит отметить, что практически любой HTML может быть помещен в <code>.accordion-body</code>, хотя переход ограничивает переполнение.
                                </div>
                            </div>
                        </div>
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="panelsStayOpen-headingThree">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false" aria-controls="panelsStayOpen-collapseThree">
                                    Тест 3
                                </button>
                            </h2>
                            <div id="panelsStayOpen-collapseThree" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingThree">
                                <div class="accordion-body">
                                    <strong>Это тело аккордеона третьего элемента.</strong> По умолчанию он скрыт, пока плагин свертывания не добавит соответствующие классы, которые мы используем для стилизации каждого элемента. Эти классы управляют общим внешним видом, а также отображением и скрытием с помощью переходов CSS. Вы можете изменить все это с помощью собственного CSS или переопределить наши переменные по умолчанию. Также стоит отметить, что практически любой HTML может быть помещен в <code>.accordion-body</code>, хотя переход ограничивает переполнение.
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div class="d-grid gap-2 col-6 mx-auto">
                        <button type="submit" class="btn btn-sm btn-outline-success ">+ Добавить</button>
                    </div>
                </main>
            </div >
        </div >
    )
}
export default ATests;