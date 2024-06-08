import Surreal from "surrealdb.js";
import { database, namespace } from "./tables";
// import Surreal from "surrealdb.node";

const db = new Surreal();

export async function execute(fn: Function) {
  try {
    await db.connect("http://127.0.0.1:8000/rpc");
    await db.signin({
      username: "root",
      password: "root",
      namespace: namespace,
      database: database,
    });

    // const result = await db.use({
    //   namespace: "logs_calendar",
    //   database: "logs_calendar",
    // });
    // console.log(result);

    const result = await fn();
    // console.log({ result });

    await db.close();
    return result;
  } catch (error) {
    console.log("Error while connecting to SurrealDB", error);
  }
}

export default db;
