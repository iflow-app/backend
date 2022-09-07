import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterFunctionalBacklog1662568402844 implements MigrationInterface {
  name = "AlterFunctionalBacklog1662568402844";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "functional" DROP CONSTRAINT "FK_396e7088683f97a65171fbc16b9"`
    );
    await queryRunner.query(
      `CREATE TABLE "backlog" ("functionalFunctionalId_1" uuid NOT NULL, "functionalFunctionalId_2" uuid NOT NULL, CONSTRAINT "PK_151b80ab338c362db062f8e223b" PRIMARY KEY ("functionalFunctionalId_1", "functionalFunctionalId_2"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_ee748ce1a706359b29a8e895fa" ON "backlog" ("functionalFunctionalId_1") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_5d852f830153becc3cb1421ac0" ON "backlog" ("functionalFunctionalId_2") `
    );
    await queryRunner.query(
      `ALTER TABLE "functional" DROP COLUMN "backlog_links_id"`
    );
    await queryRunner.query(
      `ALTER TABLE "backlog" ADD CONSTRAINT "FK_ee748ce1a706359b29a8e895fa6" FOREIGN KEY ("functionalFunctionalId_1") REFERENCES "functional"("functional_id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "backlog" ADD CONSTRAINT "FK_5d852f830153becc3cb1421ac05" FOREIGN KEY ("functionalFunctionalId_2") REFERENCES "functional"("functional_id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "backlog" DROP CONSTRAINT "FK_5d852f830153becc3cb1421ac05"`
    );
    await queryRunner.query(
      `ALTER TABLE "backlog" DROP CONSTRAINT "FK_ee748ce1a706359b29a8e895fa6"`
    );
    await queryRunner.query(
      `ALTER TABLE "functional" ADD "backlog_links_id" uuid`
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_5d852f830153becc3cb1421ac0"`
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_ee748ce1a706359b29a8e895fa"`
    );
    await queryRunner.query(`DROP TABLE "backlog"`);
    await queryRunner.query(
      `ALTER TABLE "functional" ADD CONSTRAINT "FK_396e7088683f97a65171fbc16b9" FOREIGN KEY ("backlog_links_id") REFERENCES "functional"("functional_id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }
}
