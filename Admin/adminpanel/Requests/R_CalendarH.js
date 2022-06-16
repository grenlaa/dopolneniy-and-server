import axios from "axios"

export const createCalendH = async(title,image,descr,date_dayh)=>{

    let file = new FormData();
    file.append("image", image);

    axios.post(
        "http://localhost:8081/api/CreateCalendarH",
        file,
        {
            params: {
                title: title,
                descr: descr,
                date_dayh: date_dayh
            },
        },
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    )
        .then(res => { return (`Success` + res.data);
        })
        .catch(err => {
            return  (err);
        })
}
export const editCalendH = async(id,title,image,descr,date_dayh)=>{
    
    const host="http://localhost:8081/api/EditCalendarH/"+id
    let file = new FormData();
    file.append("image", image);

    axios.post(
        host, file,
        {
            params: {
                title: title,
                descr: descr,
                date_dayh: date_dayh
            },
        },
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    )
        .then(res => {
            return (`Success` + res.data);
        })
        .catch(err => {
            return  (err);
        })
}