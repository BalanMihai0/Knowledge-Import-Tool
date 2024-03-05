import * as mysql from "mysql";

const connection = mysql.createConnection({
  host: 'studmysql01.fhict.local',
  user: 'dbi501909',
  password: 'paine234mamaliga',
  database: 'dbi501909'
});

export default connection;
