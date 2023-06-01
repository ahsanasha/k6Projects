import http from 'k6/http'
import {check} from 'k6'
/*
Ramp-Up and Ramp-Down VUs
*/
export let options = {
    stages :[
        {duration: '10s', target : 5},
        {duration: '10s', target : 20},
        {duration: '10s', target : 10},
        {duration: '10s', target : 0},
    ]
}
/*Main Function*/
export default function () {
    const url = 'https://fakestoreapi.com/products';
     const params = {
       headers: {
         'Content-Type': 'application/json',
       },
     };

     const data = JSON.stringify({
       title:'Gloves'+Math.floor(Math.random()*100000),
       price:'12.51'*Math.floor(Math.random()*10),
       description:'Ini adalah deskripsi '+Math.floor(Math.random()*100000),
       image:'https://i.pravatar.cc',
       category: 'Ini adalah kategori '+Math.floor(Math.random()*100000),
     });

     const res = http.post(url,data,params);
     console.log(`response body ${res.body} for VUS=${__VU} and ITERA=${__ITER}`)

     /*
     Code to check and assert
     */
     check (res, {
        'Status code is 200' : (r) => r.status ===200,
        'Body size is more than 150' : (r) => r.body.length >150,
            //use === to check value and data type number === number, string === string//

     })
}

     /*
     k6 run checkAndAssert.js
     */