import { createConnection, getConnection } from "typeorm";

import { ModeLogger } from "./ModeLogger";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

export const connect = async () => {
  try {
    const connectionOptions = getConnectionOptions();
    const connection = await createConnection(connectionOptions);
    console.info("connection started");
    return connection;
  } catch (e) {
    console.info(e);
    process.exit(1);
    return undefined;
  }
};

export const disconnect = (): Promise<void> => getConnection().close();

const getConnectionOptions = (): PostgresConnectionOptions => {
  const entities = process.env.TYPEORM_ENTITIES;
  const migrations = process.env.TYPEORM_MIGRATIONS;
  const subscribers = process.env.TYPEORM_SUBSCRIBERS;
  const synchronize = process.env.TYPEORM_SYNCHRONIZE === "true";
  const time = process.env.TYPEORM_MAX_QUERY_EXECUTION_TIME;

  const host = "127.0.0.1";

  return {
    type: "postgres",
    synchronize,
    entities: entities ? [entities] : undefined,
    migrations: migrations ? [migrations] : undefined,
    subscribers: subscribers ? [subscribers] : undefined,
    maxQueryExecutionTime: time ? parseInt(time, 10) : undefined,
    logging: true,
    logger: new ModeLogger(),
    replication: {
      master: {
        host,
        port: 1111,
        username: "postgres",
        password: "pass",
        database: "db",
      },
      slaves: [
        {
          host,
          port: 2222,
          username: "postgres",
          password: "pass",
          database: "db",
        },
      ],
    },
  };
};
