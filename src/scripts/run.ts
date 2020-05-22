import { connect, disconnect } from "../config/typeorm";

import { pgTestReplica } from "./pgTestReplica";

connect()
  .then(pgTestReplica)
  .then(disconnect)
  .then(() => console.info("finished "))
  .catch((error) => console.error("failed", { error }));
