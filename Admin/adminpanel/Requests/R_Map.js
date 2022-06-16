import axios from "axios"

export const createMap = async(host,title,descr,number,site,url,x,y)=>{
    axios.post(
        host,null,
        {
            params: {
                title: title,
                descr: descr,
                number: number,
                site: site,
                url: url,
                x: x,
                y: y
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
export const editMap = async(host,id,title,descr,number,site,url,x,y)=>{
    
    host+=id
    console.log(host,title,descr,number,site,url,x,y)
    axios.post(
        host,null,
        {
            params: {
                title: title,
                descr: descr,
                number: number,
                site: site,
                url: url,
                x: x,
                y: y
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

