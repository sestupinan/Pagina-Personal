import React, { useEffect, useState } from 'react';
import md5 from "md5";
const priv = "db7411c373daed25ddb85f69416f0d318d54566f";
const pub = "7890b18300881889e9d72a4cd695d32d";

function Joke (){
    const [joke, setJoke] = useState([]);
    useEffect(()=>{
        if(!navigator.onLine){
            if(localStorage.getItem("joke") === null) {
                setJoke("Loading...")
            } else {
                setJoke(JSON.parse(localStorage.getItem("joke")));
            }
        } else {
            const url = new URL("https://gateway.marvel.com/v1/public/characters?");
            let hashed = md5("Hola"+priv+pub);
            let params = {
                ts:"Hola",
                hash: hashed,
                apikey: pub

            };
            url.search = new URLSearchParams(params);
            fetch(url).then(res=>res.json()).then(res=>{
                console.log(res.data.results)
                setJoke(res.data.results);
                localStorage.setItem("joke", JSON.stringify(res.data.results));
            })
        }
    }, []);

      return (
        <div>
            <h1>Joke</h1>
          <p>Loaded {joke.length} heroes</p>
          {joke.map((heroe) =>{
              return(
                <div ker = {heroe.name}>{heroe.name}</div>
              );
          })}
          
        </div>
      );
}

export default Joke;