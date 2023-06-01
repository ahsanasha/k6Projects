import sql from 'k6/x/sql';
import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate } from 'k6/metrics';

// The second argument is a PostgreSQL connection string, e.g.
// postgres://myuser:mypass@127.0.0.1:5432/postgres?sslmode=disable
const db = sql.open('postgres', 'postgres://postgres:bismillah@127.0.0.1:5432/postgres?sslmode=disable');

export function setup() {
//  db.exec(`CREATE TABLE IF NOT EXISTS result_metrics (
//    id SERIAL PRIMARY KEY,
//    checks varchar(50),
//    data_received varchar(50),
//    data_send varchar(50)
//    http_req_blocked varchar(50),
//    http_req_connecting varchar(50),
//    http_req_duration varchar(50),
//    http_req_failed varchar(50),
//    http_req_receiver varchar(50),
//    http_req_sending varchar(50),
//    http_req_tls_handshaking varchar(50),
//    http_req_waiting varchar(50),
//    http_reqs varchar(50),
//    iteration_duration varchar(50),
//    iterations varchar(50),
//    vus varchar(50),
//    vus_max varchar(50),
//
//  )`);

 db.exec(`CREATE TABLE IF NOT EXISTS person (
           id integer PRIMARY KEY,
           email varchar NOT NULL,
           first_name varchar,
           last_name varchar);`);

  db.exec(
    "INSERT INTO person (id,email, first_name, last_name) VALUES('11000006','johndoe@email.com', 'John', 'Doe');"
  );
  db.exec(
    "INSERT INTO person (id,email, first_name, last_name) VALUES('11000007','marysue@email.com', 'Mary', 'Sue');"
  );
}

export default function () {
      http.get('https://test.k6.io');
      sleep(1);

      const results = sql.query(db, 'SELECT * FROM person;');
      console.log(results);
        check(results, {
          'is length 3': (r) => r.length === 3,
        });

}

 export function teardown() {
    db.close();
  }
