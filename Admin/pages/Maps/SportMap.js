import React, { Component, useEffect, useState } from "react";
import axios from 'axios';
import { YMaps, Map, ObjectManager } from 'react-yandex-maps'


let mapState = {
    center: [59.123304, 37.904471],
    zoom: 13
};

let getIdFromHash = hash => {
    console.log(hash)
    hash = parseInt(hash.replace(/\D/g, ""), 10);
    return isNaN(hash) ? null : hash;
};


const SportMap = () => {
    const [poin, setPoin] = useState([])
    const [state, setState] = useState({
        currentItem: getIdFromHash(window.location.hash),
        num: 0,
        item: false
    })
    async function fetchPosts() {
        const res = await axios.get('http://localhost:8081/api/SportMap');
        setPoin(res.data);
        console.log(poin);
    }

    async function onHashChange() {
        let currentItem = getIdFromHash(window.location.hash);
        if ((currentItem !== state.currentItem) && (currentItem !== null)) {
            setState({ currentItem, item: true });
            //window.location.hash = "";
        }
        console.log("onHashChange")
    }

    async function closeDescription(e) {
        //window.location.hash = "";
        setState({ currentItem: null, item: false });
        console.log("closeDescription")
    }

    useEffect(() => {
        fetchPosts()
        window.addEventListener("hashchange", onHashChange);
        console.log("asd")
    }, [])

    return (
        <div>

            <div className="container-lg">
                <div className="row">

                    <div className="col-lg-8">
                        <YMaps query={{ mode: "debug" }}>
                            <Map defaultState={mapState} style={{ width: '100%', height: '500px' }}>
                                <ObjectManager
                                    objects={{
                                        openBalloonOnClick: true
                                    }}
                                    clusters={{}}
                                    options={{
                                        clusterize: true,
                                        gridSize: 32
                                    }}
                                    defaultFeatures={{
                                        type: "FeatureCollection",
                                        features: poin.map((point, id) => {
                                            return {
                                                id: id,
                                                type: "Feature",
                                                geometry: {
                                                    type: "Point",
                                                    coordinates: [point.x, point.y]
                                                },
                                                options: {
                                                    present: "islands#lightblueRunCircleIcon",
                                                },
                                                properties: {
                                                    iconCaption: point.title,
                                                    balloonContent: `
                      <p>${point.title}</p>
                      <p>
                        <a href="#${id}">Больше информации...</a>
                        </p>
                  `,
                                                    clusterCaption: `Метка №${id + 1}`
                                                }
                                            };
                                        })
                                    }}
                                    modules={[
                                        "objectManager.addon.objectsBalloon",
                                        "objectManager.addon.clustersBalloon"
                                    ]}
                                />
                            </Map>
                        </YMaps>
                    </div>

                    <div className="col-lg-4">
                        {state.item == true && (
                            <article className="border-style2 mt-3"><a name="map"></a>
                                <h1>Подробная информация о "{poin[state.currentItem].title}"</h1>
                                <p>{poin[state.currentItem].descr}</p>
                                <p>Телефон: {poin[state.currentItem].number}</p>
                                <p>Сайт: <a href={poin[state.currentItem].url}>{poin[state.currentItem].site}</a></p>
                                <button style={{ color: '#FFFFFF', display: 'block', cursor: 'pointer', padding: '5px 11px', fontSize: '1.2em', border: 'solid 1px #F9F9F9', borderRadius: '2px', background: 'rgb(148,195,90)', width: '210px', marginBottom: '20px' }} onClick={closeDescription} >Закрыть</button>
                            </article>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
export default SportMap
