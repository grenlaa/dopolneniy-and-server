import axios from "axios"

export default async function createImage(image){
    
    let file = new FormData();
    file.append("file", image);
    const response =await axios.post(
        "http://localhost:8081/api/CreateImage", file,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },

        }
    )
     if (response) {
        console.log(response)
        return response.data;
    }
}
