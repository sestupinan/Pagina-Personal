//Punto 1
function secret(Array, variable, number)
{
    if(variable==="encrypt")
    {
        array=Array;
        for (let index = 0; index < array.length; index++) {
            array[index]=array[index]+number;
            console.log(array[index]);

        }
        console.log(array);
    }
    else if(variable==="decrypt")
    {
        array=Array;
        for (let index = 0; index < array.length; index++) {
            array[index]=array[index]-number;
            console.log(array[index]);

        }
        console.log(array);
    }
    else
    {
        console.error("Ingrese parametros válidos");    
    }

}

//Punto 2
let mcd = (a,b) => {return a==b ? a: a<b? mcd(a, b-a):mcd(b, a-b);}
