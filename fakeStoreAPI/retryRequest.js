import http from 'k6/http'
import {check,sleep} from 'k6'
import {Rate,Counter} from 'k6/metrics'
import papaparse from 'https://jslib.k6.io/papaparse/5.1.1/index.js';
import {SharedArray} from 'k6/data';

var retryCounter = new Counter('Get Max retry')

const csvRead = new SharedArray("credentials", function() {
return papaparse.parse(open('data.csv'), {header: true}).data;
});


/*Export variable error*/
export let errorRate = new Rate('errors')
/*Ramp-Up and Ramp-Down VUs*/
export let options = {
    stages :[
        {duration: '5s', target : 2},
        {duration: '10s', target : 7},
        {duration: '5s', target : 5},
        {duration: '5s', target : 0},
    ],
    thresholds: {
        errors  :['rate<0.1'] //error 10%
    }
}
/*Main Function*/
export default function () {
    retryCounter.add(1)

    for (var retries = 5; retries >0; retries--){
     const url = 'https://fakestoreapi.com/products';
        const params = {
           headers: {
             'Content-Type': 'application/json',
           },
        };

//                for (const userPwdPair of csvRead) {
//                console.log(JSON.stringify(userPwdPair));
//           }

            const random = csvRead[Math.floor(Math.random() * csvRead.length)];
            console.log('Random user: ', JSON.stringify(random));


           const payload = JSON.stringify({
           title:random.title,
           price:random.price,
           description:random.description,
           image:random.image,
           category:random.category,
         });


        const res = http.post(url,payload,params);
            if(res.status!==200){
                retryCounter.add(1)
                console.log(`Response is not correct.attempt is ${retries} VUS=${__VU} ITER=${__ITER} sleep for 1 seconds`)
                sleep(1)
            }
            else{
                retries == 0
            }

            /*Print all of response body*/
           // console.log(`response body ${res.body} for VUS=${__VU} and ITERATION=${__ITER}`)

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

    }

}


/*Run the scrip
k6 retryRequest --vus 10 --iterations 5
*/