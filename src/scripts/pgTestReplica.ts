import { LessThanOrEqual, getCustomRepository } from "typeorm";

import { Entity1 } from "../entities/Entity1";
import { Entity1Repository } from "../repositories/Entity1Repository";
import { Entity2Repository } from "../repositories/Entity2Repository";

const cleanup = async (): Promise<void> => {
  const repo1 = getCustomRepository(Entity1Repository);
  const repo2 = getCustomRepository(Entity2Repository);
  await repo1.query("TRUNCATE entity1 RESTART IDENTITY CASCADE");
  await repo2.query("TRUNCATE entity2 RESTART IDENTITY CASCADE");
  console.log(
    `\n\n print Lag After each 100 queries\nLag: #write on master - #exist on slave`
  );
};

const buildEntity1 = (i: number): Partial<Entity1> => ({
  content: "content".repeat(1000),
  json: { key: "key", values: [{ key: "key", value: "value" }] },
  idx: i ** 2,
  uq1: i,
  uq2: i + 1,
});

export const pgTestReplica = async (): Promise<void> => {
  const repo1 = getCustomRepository(Entity1Repository);
  const repo2 = getCustomRepository(Entity2Repository);
  await cleanup();

  const NUM = 10001;

  for (let i = 1; i < NUM; i++) {
    const entity1 = await repo1.save(buildEntity1(i));
    await repo2.save({
      content: "content".repeat(1000),
      entity1,
    });

    if (i % 100 == 0) {
      const [lagInEntity1, lagInEntity2] = await Promise.all([
        await repo1.count({ id: LessThanOrEqual(i) }),
        await repo2.count({ id: LessThanOrEqual(i) }),
      ]);
      console.log(`Entity1: ${i - lagInEntity1}`);
      console.log(`Entity2: ${i - lagInEntity2}`);
    }
  }
};
