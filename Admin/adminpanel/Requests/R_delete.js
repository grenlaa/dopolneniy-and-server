import axios from "axios"

export const r_delete = async(host)=>{
    axios.get(host)
        .then(res => {
            console.log(`Success` + res.data);
        })
        .catch(err => {
            console.log(err);
        })
}