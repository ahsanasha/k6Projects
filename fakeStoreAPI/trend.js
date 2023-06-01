import http from 'k6/http'
import {check} from 'k6'
import {Rate,Trend} from 'k6/metrics'

/*Export variable error*/
export let errorRate = new Rate('errors')

/*Export variable trend*/
export let getTrend = new Trend('trend')

/*Ramp-Up and Ramp-Down VUs*/
export let options = {
    stages :[
        {duration: '10s', target : 5},
        {duration: '10s', target : 20},
        {duration: '10s', target : 10},
        {duration: '10s', target : 0},
    ],
    thresholds: {
        errors  :['rate<0.1'] //error 10%
    }
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
    /*Print all of response body*/
    //console.log(`response body ${res.body} for VUS=${__VU} and ITERATION=${__ITER}`)

    /*Parse json body and print to console*/
//    let body  = JSON.parse(res.body)
//    console.log(`Response body is ${body}`)
//    console.log(`Id is ${body.id}`)
//    console.log(`Title is ${body.title}`)
//    console.log(`Price is ${body.price}`)
//    console.log(`Description is ${body.description}`)
//    console.log(`Image is ${body.image}`)
//    console.log(`Category is ${body.category}`)
     /*
     Code to check and assert
     */
     const statusCodeSuccess = check (res, {
        'Status code is 200' : (r) => r.status ===200,
            //use === to check value and data type number === number, string === string//
     })
     errorRate.add(!statusCodeSuccess);

     const resBodySuccess = check (res, {
          'Body size is more than 150' : (r) => r.body.length >150,
                 //use === to check value and data type number === number, string === string//
     })
     errorRate.add(!resBodySuccess);

    getTrend.add(res.timings.duration)

}
