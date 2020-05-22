import { EntityRepository, Repository } from "typeorm";

import { Entity1 } from "../entities/Entity1";

@EntityRepository(Entity1)
export class Entity1Repository extends Repository<Entity1> {}
