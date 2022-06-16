import axios from "axios"

export const createGrBr = async(host,title,image,url)=>{
    let file = new FormData();
    file.append("image", image);
    axios.post(
        host,file,
        {
            params: {
                title: title,
                url: url
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
            console.log(err);
        })
}
export const editGrBr = async(host,id,title,image,url)=>{
    host+=id
    let file = new FormData();
    file.append("image", image);
    axios.post(
        host, file,
        {
            params: {
                title: title,
                url: url
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