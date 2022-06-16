import React, { useState, useEffect } from "react";
import { authorization } from "./AuthRequest";


const Auth = () => {

    const [password, setPassword] = useState("")
    async function authoriz() {
        // console.log(password);
         var bcrypt = require('bcryptjs');
        // var salt = bcrypt.genSaltSync(10);
        //  var hash = bcrypt.hashSync(password,salt);
        //  console.log("hash",hash)
        // console.log("safas",bcrypt.compareSync(password,hash))
        // localStorage.setItem("hashP", hash)
        const res=await authorization(password)
        // console.log(res)
        
        console.log("host:", (window.location.host))
        await localStorage.setItem("hashP", res)
        await localStorage.setItem("password", password)
        console.log(bcrypt.compareSync(password,res))
        if (bcrypt.compareSync(localStorage.getItem("password"), localStorage.getItem("hashP"))
        ){
            window.location.href = '/Admin/Articles';
        }else{
            setPassword("неверный пароль");
        }
    }

    return (
        <div class="container-fluid">
            <h1 className="h3 mb-3 font-weight-normal">Пожалуйста войдите</h1>
            <input type="text" className="form-control" placeholder="Пароль"
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
            <button type="submit" class="btn btn-sm btn-outline-secondary" onClick={authoriz}>Войти</button>

        </div>
    )
}
export default Auth;