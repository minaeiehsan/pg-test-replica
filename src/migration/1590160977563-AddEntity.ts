import {MigrationInterface, QueryRunner} from "typeorm";

export class AddEntity1590160977563 implements MigrationInterface {
    name = 'AddEntity1590160977563'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "entity2" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "content" character varying NOT NULL, "entity1Id" integer NOT NULL, CONSTRAINT "PK_5f728322281630d04c808febd8e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_47bcff5f92ccd60af81ae93775" ON "entity2" ("entity1Id") `);
        await queryRunner.query(`CREATE TABLE "entity1" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "content" character varying NOT NULL, "json" json NOT NULL, "idx" integer NOT NULL, "uq1" integer NOT NULL, "uq2" integer NOT NULL, CONSTRAINT "PK_646624c2139fb542f990d5bdffa" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_bc370084305ebe771b54935d0d" ON "entity1" ("idx") `);
        await queryRunner.query(`CREATE INDEX "unique_uq1_uq2_idx" ON "entity1" ("uq1", "uq2") `);
        await queryRunner.query(`ALTER TABLE "entity2" ADD CONSTRAINT "FK_47bcff5f92ccd60af81ae937750" FOREIGN KEY ("entity1Id") REFERENCES "entity1"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "entity2" DROP CONSTRAINT "FK_47bcff5f92ccd60af81ae937750"`);
        await queryRunner.query(`DROP INDEX "unique_uq1_uq2_idx"`);
        await queryRunner.query(`DROP INDEX "IDX_bc370084305ebe771b54935d0d"`);
        await queryRunner.query(`DROP TABLE "entity1"`);
        await queryRunner.query(`DROP INDEX "IDX_47bcff5f92ccd60af81ae93775"`);
        await queryRunner.query(`DROP TABLE "entity2"`);
    }

}
