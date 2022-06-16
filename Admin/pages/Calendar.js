import React, { useState, useEffect } from "react";
import axios from 'axios';

import "fullcalendar-reactwrapper/dist/css/fullcalendar.min.css";

import FullCalendar from "fullcalendar-reactwrapper";
import ImageIntroCard from "../components/card/ImageIntroCard";

const Calendar = () => {
    const [point,setPoint]=useState([])

    async function fetchPosts() {
        const res = await axios.get('http://localhost:8081/api/Calendar');
        setPoint(res.data);
    }


    useEffect(() => {
        console.log(point)
        console.log(state.events)
        fetchPosts()
    }, [])

    const state = {
        text: "",
        events: [
            {
                title:
                    "Рейтинговый турнир города Череповца по шахматам «Кубок Севера 2021»",
                start: "2021-02-03T17:00:00",
                end: "2021-02-03T21:00:00",
                description: "Краснодонцев, 26б",
                color: "#4786FF",
            }
        ],
    };


    return (
        <div>
            <ImageIntroCard
                img="/images/svg/calendar.svg"
                title="КАЛЕНДАРЬ МЕРОПРИЯТИЙ ГОРОДА"
            ></ImageIntroCard>
            <div className="container-lg block-background">
                <div className="row justify-content-center">
                    <div className="col">
                        <div id="example-component">
                            <FullCalendar
                                buttonText={{
                                    today: "Сегодня",
                                    month: "месяц",
                                    week: "неделя",
                                    day: "день",
                                }}
                                timeFormat="HH:mm"
                                locale="ru"
                                id="your-custom-ID"
                                header={{
                                    left: "prev,next today myCustomButton",
                                    center: "title",
                                    right: "month,basicWeek,basicDay",
                                }}
                                defaultDate={Date()}
                                navLinks={true} // can click day/week names to navigate views
                                editable={false}
                                displayEventEnd={true}
                                eventLimit={true} // allow "more" link when too many events
                                events={point}
                                eventClick={function (
                                    calEvent,
                                    jsEvent,
                                    view,
                                    resourceObj
                                ) {
                                    alert(
                                        calEvent.title +
                                        "\n" +
                                        calEvent.description
                                    );
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default Calendar;