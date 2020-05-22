import { LessThanOrEqual, getCustomRepository } from "typeorm";

import { Entity1Repository } from "../repositories/Entity1Repository";

export const pgTestReplica = async (): Promise<void> => {
  const repo = getCustomRepository(Entity1Repository);
  await repo.query("TRUNCATE entity1 RESTART IDENTITY CASCADE");
  console.log(
    `\n\n print Lag After each 100 queries\nLag: #write on master - #exist on slave`
  );

  for (let i = 1; i < 1001; i++) {
    await repo.save({ content: "content" });
    if (i % 100 == 0) {
      console.log(i - (await repo.count({ id: LessThanOrEqual(i) })));
    }
  }
};
