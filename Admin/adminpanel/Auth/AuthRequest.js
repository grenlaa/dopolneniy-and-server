import axios from "axios"

export const authorization = async(PHash)=>{
    return await axios.get(
        "http://localhost:8081/api/GAuth",
        null,
        {
            params: {
                PHash:PHash
            },
        }
    )
        .then(res => {
            return (res.data);
        })
        .catch(err => {
            return  (err);
        })
}
