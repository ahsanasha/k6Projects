import http from 'k6/http'
import { check, sleep } from 'k6';
import { Rate } from 'k6/metrics';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/2.4.0/dist/bundle.js";

/*
Ramp-Up and Ramp-Down VUs
*/
export let options = {
 discardResponseBodies: true,
   scenarios: {
     contacts: {
       executor: 'constant-arrival-rate',

       // Our test should last 30 seconds in total
       duration: '20s',

       // It should start 30 iterations per `timeUnit`. Note that iterations starting points
       // will be evenly spread across the `timeUnit` period.
       rate: 200,

       // It should start `rate` iterations per second
       timeUnit: '1s',

       // It should preallocate 2 VUs before starting the test
       preAllocatedVUs: 200,

       // It is allowed to spin up to 50 maximum VUs to sustain the defined
       // constant arrival rate.
       maxVUs: 200,
     },
   },

//    stages :[
//        {duration: '10s', target : 5},
//        {duration: '10s', target : 20},
//        {duration: '10s', target : 10},
//        {duration: '10s', target : 0},
//    ]
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
     console.log(data);
     const res = http.post(url,data,params);
}
export function handleSummary(data) {
    return {
      "fakeReport.html": htmlReport(data),
      //"testResultRatesAPI.json": JSON.stringify(data),
    };
  }