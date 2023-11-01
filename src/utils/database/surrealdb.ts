import Surreal from "surrealdb.js";

const db = new Surreal();

export async function execute(fn: Function) {
  try {
    await db.connect("http://127.0.0.1:8000/rpc");
    await db.signin({
      username: "root",
      password: "password",
    });
    await db.use({ namespace: "logs_calendar", database: "logs_calendar" });

    const result = await fn();

    await db.close();
    return result;
  } catch (error) {
    console.log("Error while connecting to SurrealDB", error);
  }
}

export default db;
