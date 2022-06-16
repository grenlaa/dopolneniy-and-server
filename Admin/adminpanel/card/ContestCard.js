import React from "react";

export default function ContestCard(props) {
    // const dispatch = useDispatch();

    // const setChangeContest = (contest) => {
    //     dispatch(showContest(contest));
    // };

    return (
        <div>
            <div
                //onClick={() => setChangeContest(props.contest)}
                data-bs-toggle="modal"
                data-bs-target="#showContestModal"
                className="flip-card btn"
            >
                <div className="flip-card-front shadow">
                    <div>
                        {props.contest.img && (
                            <img
                                className="contest-card-img"
                                src={props.contest.img}
                            ></img>
                        )}

                        {!props.contest.img && (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="bi bi-patch-check category-card-img"
                                fill="currentColor"
                                viewBox="0 0 16 16"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10.354 6.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708 0z"
                                />
                                <path d="m10.273 2.513-.921-.944.715-.698.622.637.89-.011a2.89 2.89 0 0 1 2.924 2.924l-.01.89.636.622a2.89 2.89 0 0 1 0 4.134l-.637.622.011.89a2.89 2.89 0 0 1-2.924 2.924l-.89-.01-.622.636a2.89 2.89 0 0 1-4.134 0l-.622-.637-.89.011a2.89 2.89 0 0 1-2.924-2.924l.01-.89-.636-.622a2.89 2.89 0 0 1 0-4.134l.637-.622-.011-.89a2.89 2.89 0 0 1 2.924-2.924l.89.01.622-.636a2.89 2.89 0 0 1 4.134 0l-.715.698a1.89 1.89 0 0 0-2.704 0l-.92.944-1.32-.016a1.89 1.89 0 0 0-1.911 1.912l.016 1.318-.944.921a1.89 1.89 0 0 0 0 2.704l.944.92-.016 1.32a1.89 1.89 0 0 0 1.912 1.911l1.318-.016.921.944a1.89 1.89 0 0 0 2.704 0l.92-.944 1.32.016a1.89 1.89 0 0 0 1.911-1.912l-.016-1.318.944-.921a1.89 1.89 0 0 0 0-2.704l-.944-.92.016-1.32a1.89 1.89 0 0 0-1.912-1.911l-1.318.016z" />
                            </svg>
                        )}

                        <h3>{props.contest.title}</h3>
                    </div>
                </div>
                <div className="flip-card-back shadow">
                    <div className="text-center">
                        {props.contest.description}
                    </div>
                </div>
            </div>
        </div>
    );
}
