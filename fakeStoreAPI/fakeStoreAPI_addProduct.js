import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate } from 'k6/metrics';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/2.4.0/dist/bundle.js";

export const errorRate = new Rate('errors');

export const options = {
  stages: [
    { duration: '10s', target: 10 }, // simulate ramp-up of traffic from 1 to 10 users over 10 second
    { duration: '30s', target: 10 }, // stay at 10 users for 30 second
    { duration: '10s', target: 0 }, // ramp-down to 0 users
  ],
  thresholds: {
    'http_req_duration': ['p(95)<1500','avg<1500'], // 95% of requests must complete below 1500ms
    'iteration_duration': ['p(95)<2000','avg<2000'], // 95% of requests must complete below 2000ms
    'http_req_failed': ['rate<0.01'], // During the whole test execution, the error rate must be lower than 1%
  },

   ext: {
      loadimpact: {
        projectID: 3598687,
        name: "Test k6 CLI : Fake store API/ Add product"
      }
    }
};


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
  check(res, {
    'Success in body is 200': (r) => r.status == 200,
  }) || errorRate.add(1);
  sleep(1);

  console.log(res.json());
}

 export function handleSummary(data) {
    return {
      "testResultRatesAPI.html": htmlReport(data),
      //"testResultRatesAPI.json": JSON.stringify(data),
    };
  }

  /* Run local
 k6 run fakeStoreAPI_addProduct.js -d 10s -u 10
  */

  /* Run on app.k6.io
  k6 cloud fakeStoreAPI_addProduct.js -d 10s -u 10
  */
