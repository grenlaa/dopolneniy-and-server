import axios from "axios"

export const createHRecipe = async(title,ingredients,recipe,time,portion,nutrValue,image)=>{

    let file = new FormData();
    file.append("image", image);

    axios.post(
        "http://localhost:8081/api/CreateHealthRecipe",
        file,
        {
            params: {
                title: title,
                ingredients: ingredients,
                recipe: recipe,
                time: time,
                portion: portion,
                nutrValue: nutrValue
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
export const editHRecipe = async(id,title,ingredients,recipe,time,portion,nutrValue,image)=>{
    
    const host="http://localhost:8081/api/EditHealthRecipe/"+id
    let file = new FormData();
    file.append("image", image);

    axios.post(
        host, file,
        {
            params: {
                title: title,
                ingredients: ingredients,
                recipe: recipe,
                time: time,
                portion: portion,
                nutrValue: nutrValue
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