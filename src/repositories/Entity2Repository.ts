import { EntityRepository, Repository } from "typeorm";

import { Entity2 } from "../entities/Entity2";

@EntityRepository(Entity2)
export class Entity2Repository extends Repository<Entity2> {}
