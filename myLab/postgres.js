import sql from 'k6/x/sql';

// The second argument is a PostgreSQL connection string, e.g.
// postgres://myuser:mypass@127.0.0.1:5432/postgres?sslmode=disable
const db = sql.open('postgres', 'postgres://postgres:bismillah@127.0.0.1:5432/postgres?sslmode=disable');

export function setup() {
  db.exec(`CREATE TABLE IF NOT EXISTS result_metrics (
    id SERIAL PRIMARY KEY,
    checks varchar(50),
    data_received varchar(50),
    data_send varchar(50)
    http_req_blocked varchar(50),
    http_req_connecting varchar(50),
    http_req_duration varchar(50),
    http_req_failed varchar(50),
    http_req_receiver varchar(50),
    http_req_sending varchar(50),
    http_req_tls_handshaking varchar(50),
    http_req_waiting varchar(50),
    http_reqs varchar(50),
    iteration_duration varchar(50),
    iterations varchar(50),
    vus varchar(50),
    vus_max varchar(50),

  )`);

export function teardown() {
  db.close();
}

export default function () {
  http.get('https://test.k6.io');
  sleep(1);

  db.exec(
      "INSERT INTO person (id,email, first_name, last_name) VALUES('11000006','johndoe@email.com', 'John', 'Doe');"
    );

  db.exec("INSERT INTO result_metrics (id,checks,data_received,data_send,http_req_blocked,http_req_connecting,http_req_duration,http_req_failed,http_req_receiver,http_req_sending,http_req_tls_handshaking,http_req_waiting,http_reqs,iteration_duration,iterations varchar,vus,vus_max) VALUES('TR'+Math.floor(Math.random()*100000), 'k6-plugin-sql');")dbe;
  let results = sql.query(db, 'SELECT * FROM keyvalues WHERE key = $1;', 'plugin-name');

  for (const row of results) {
    console.log(`key: ${row.key}, value: ${row.value}`);
  }
}

onsole.log(`Category is ${body.category}`)