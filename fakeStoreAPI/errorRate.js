import http from 'k6/http'
import {check} from 'k6'
import {Rate} from 'k6/metrics'

/*
Export variable error
*/

export let errorRate = new Rate('errors')

/*
Ramp-Up and Ramp-Down VUs
*/
export let options = {
  discardResponseBodies: true,
   scenarios: {
     contacts: {
       executor: 'constant-arrival-rate',

       // Our test should last 30 seconds in total
       duration: '30s',

       // It should start 30 iterations per `timeUnit`. Note that iterations starting points
       // will be evenly spread across the `timeUnit` period.
       rate: 30,

       // It should start `rate` iterations per second
       timeUnit: '1s',

       // It should preallocate 2 VUs before starting the test
       preAllocatedVUs: 2,

       // It is allowed to spin up to 50 maximum VUs to sustain the defined
       // constant arrival rate.
       maxVUs: 50,
     },
//   },
};
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
    console.log(`response body ${res.body} for VUS=${__VU} and ITERATION=${__ITER}`)

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
//     const statusCodeSuccess = check (res, {
//        'Status code is 200' : (r) => r.status ===200,
//            //use === to check value and data type number === number, string === string//
//     })
//     errorRate.add(!statusCodeSuccess);
//
//     const resBodySuccess = check (res, {
//          'Body size is more than 150' : (r) => r.body.length >150,
//                 //use === to check value and data type number === number, string === string//
//     })
//     errorRate.add(!resBodySuccess);
//

}
