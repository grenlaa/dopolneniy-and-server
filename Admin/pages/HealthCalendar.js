import React , { useEffect, useState } from "react";
import axios from 'axios';

const HealthCalendar = () => {

    const [ovens, setOven] = useState([])

    async function fetchPosts() {
      const res = await axios.get('http://localhost:8081/api/CalendarHealth');
      setOven(res.data);
      console.log(ovens);
    }
  
    useEffect(() => {
      fetchPosts()
    }, [])

    return (
        <main>
            <div class="album py-5 bg-light">
                <div class="container">
                    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                    {ovens.map(post =>
                        <div class="col" key={post.id}>
                            <div class="card shadow-sm h-100" >
                                <div class="bd-placeholder-img card-img-top" width="100%">
                                    <img class="rounded-bottom" src={post.image} width="100%"></img>
                                </div>
                                <div class="card-body p-1 m-0"></div>
                                <div class="card-footer-white m-2">
                                    <h6 class="card-title">{post.title}</h6>
                                </div>
                                <div class="card-footer-white">
                                    <div class="card-body d-flex justify-content-between align-items-center p-1">
                                        <div class="btn-group">
                                            <button type="button" class="btn btn-sm btn-outline-secondary" data-bs-toggle="modal" data-bs-target={"#a"+post.id} >Подробнее</button>
                                        </div>
                                        <div class="text-muted">{post.dateDayH}</div>
                                    </div>
                                </div>
                                <div class="modal fade" id={"a"+post.id}  aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div class="modal-dialog">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h5 class="modal-title" id="exampleModalLabel">{post.title}</h5>
                                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div class="modal-body">
                                                <img class="rounded-bottom" src={post.image} width="100%"></img>
                                                <div className="Container" dangerouslySetInnerHTML={{ __html: post.descr }}></div>
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    </main >
    );
}
export default HealthCalendar