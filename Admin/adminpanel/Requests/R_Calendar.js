import axios from "axios"

export const createCalend = async(title,startD,endD,colorD,descr)=>{
    axios.post(
        "http://localhost:8081/api/CreateCalendar",
        null,
        {
            params: {
                title: title,
                descr: descr,
                startD: startD,
                endD: endD,
                colorD: colorD
            },
        },
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    )
        .then(res => { 
            console.log(`Success` + res.data);
        })
        .catch(err => {
            return  (err);
        })
}
export const editCalend = async(id,title,startD,endD,colorD,descr)=>{
    
    const host="http://localhost:8081/api/EditCalendar/"+id
  
    axios.post(
        host, null,
        {
            params: {
                title: title,
                descr: descr,
                startD: startD,
                endD: endD,
                colorD: colorD
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