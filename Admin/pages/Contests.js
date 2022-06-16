import React from "react";

import ImageIntroCard from '../components/card/ImageIntroCard'

import ContestCard from "../components/card/ContestCard"

// import ShowContestDataModal from "../../../js/components/Media/ShowContestDataModal.js";


const Contests = () => {
    var contests = [
        {
            id: 1,
            title: "Конкурс Блюдо недели",
            description: "Голосуйте за лучшее блюдо недели, .... ",
            img: "/images/healthy-food.svg",
            data: [
                //выборы для конкурса - в дальнейшем передаются в карточки голосования
                {
                    id: 1,
                    title: "Жюльен с курицей и грибами",
                    date: "13 декабря, 2020",
                    img: "/images/card1.jpg",
                    description: "",
                },
                {
                    id: 2,
                },
                {
                    id: 3,
                },
            ],
        },
    ];

    return (
        <div>
            <ImageIntroCard
                img="/images/svg/contests.svg"
                title="КОНКУРСЫ"
            ></ImageIntroCard>

            {/* <ShowContestDataModal></ShowContestDataModal> */}

            <div className="container-lg">
                <div className="row">
                    {contests.map((contest) => (
                        <div
                            key={contest.id}
                            className="col-md-4 mb-3 text-center"
                        >
                            <ContestCard contest={contest} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Contests;
