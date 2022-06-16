import axios from "axios"

export const createCmpn = async(title,image)=>{

    let file = new FormData();
    file.append("image", image);
    console.log("ararararar rabotai")
    axios.post(
        "http://localhost:8081/api/CreateCompetition",
        file,
        {
            params: {
                title: title
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

export const editCmpn = async(id,title,image)=>{
    
    const host='http://localhost:8081/api/EditCompetition/'+id
    let file = new FormData();
    file.append("image", image);

    console.log("ararararar rabotai",host)

    axios.post(
        host, file,
        {
            params: {
                title: title
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