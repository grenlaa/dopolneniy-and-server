import axios from "axios"

export const createCmpr = async(name,title,image,descr,date,idCmpn)=>{

    let file = new FormData();
    file.append("image", image);
    console.log("ararararar rabotai")
    axios.post(
        "http://localhost:8081/api/CreateCompetitor",
        file,
        {
            params: {
                name: name,
                title: title,
                date: date,
                descr: descr,
                idCmpn: idCmpn
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

export const editCmpr = async(id,name,title,image,descr,date)=>{
    
    const host='http://localhost:8081/api/EditCompetitor/'+id
    let file = new FormData();
    file.append("image", image);

    console.log("ararararar rabotai",host)

    axios.post(
        host, file,
        {
            params: {
                name: name,
                title: title,
                date: date,
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