import axios from "axios"

export const createArticles = async(title,descr)=>{
    axios.post(
        "http://localhost:8081/api/CreateArticles",
        null,
        {
            params: {
                title: title,
                descr: descr
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
export const editArticles = async(id,title,descr)=>{
    
    const host="http://localhost:8081/api/EditArticles/"+id
    axios.post(
        host, null,
        {
            params: {
                title: title,
                descr: descr
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