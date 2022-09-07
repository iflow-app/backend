import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterFunctionalChangePk1662571531371
  implements MigrationInterface
{
  name = "AlterFunctionalChangePk1662571531371";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "house_of_quality" DROP CONSTRAINT "FK_349abe44ec4bfc3b7ef18024ff0"`
    );
    await queryRunner.query(
      `ALTER TABLE "house_of_quality" DROP CONSTRAINT "PK_814ac0f560a7d2eb7a463e33bf8"`
    );
    await queryRunner.query(
      `ALTER TABLE "backlog" DROP CONSTRAINT "FK_5d852f830153becc3cb1421ac05"`
    );
    await queryRunner.query(
      `ALTER TABLE "backlog" DROP CONSTRAINT "FK_ee748ce1a706359b29a8e895fa6"`
    );
    await queryRunner.query(
      `ALTER TABLE "backlog" DROP CONSTRAINT "PK_151b80ab338c362db062f8e223b"`
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_ee748ce1a706359b29a8e895fa"`
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_5d852f830153becc3cb1421ac0"`
    );
    await queryRunner.query(
      `ALTER TABLE "functional" DROP CONSTRAINT "UQ_08a9b4a795ee8b4d06fa97cf556"`
    );
    await queryRunner.query(
      `ALTER TABLE "functional" DROP CONSTRAINT "PK_fd98e3711fdfbcd376d52c888b2"`
    );
    await queryRunner.query(
      `ALTER TABLE "functional" DROP COLUMN "functional_id"`
    );
    await queryRunner.query(
      `ALTER TABLE "functional" ADD "functional_id" SERIAL NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "functional" ADD CONSTRAINT "PK_fd98e3711fdfbcd376d52c888b2" PRIMARY KEY ("functional_id")`
    );
    await queryRunner.query(
      `ALTER TABLE "functional" DROP COLUMN "identifier"`
    );
    await queryRunner.query(`ALTER TABLE "functional" DROP COLUMN "name"`);
    await queryRunner.query(
      `ALTER TABLE "functional" ALTER COLUMN "level_type" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "house_of_quality" DROP COLUMN "functional_id"`
    );
    await queryRunner.query(
      `ALTER TABLE "house_of_quality" ADD "functional_id" integer NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "house_of_quality" ADD CONSTRAINT "PK_814ac0f560a7d2eb7a463e33bf8" PRIMARY KEY ("nfunctional_id", "functional_id")`
    );
    await queryRunner.query(
      `ALTER TABLE "house_of_quality" ADD CONSTRAINT "FK_349abe44ec4bfc3b7ef18024ff0" FOREIGN KEY ("functional_id") REFERENCES "functional"("functional_id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "backlog" DROP COLUMN "functionalFunctionalId_1"`
    );
    await queryRunner.query(
      `ALTER TABLE "backlog" ADD "functionalFunctionalId_1" integer NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "backlog" DROP COLUMN "functionalFunctionalId_2"`
    );
    await queryRunner.query(
      `ALTER TABLE "backlog" ADD "functionalFunctionalId_2" integer NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "backlog" ADD CONSTRAINT "PK_151b80ab338c362db062f8e223b" PRIMARY KEY ("functionalFunctionalId_1", "functionalFunctionalId_2")`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_ee748ce1a706359b29a8e895fa" ON "backlog" ("functionalFunctionalId_1") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_5d852f830153becc3cb1421ac0" ON "backlog" ("functionalFunctionalId_2") `
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
      `ALTER TABLE "backlog" DROP CONSTRAINT "PK_151b80ab338c362db062f8e223b"`
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_5d852f830153becc3cb1421ac0"`
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_ee748ce1a706359b29a8e895fa"`
    );
    await queryRunner.query(
      `ALTER TABLE "house_of_quality" DROP CONSTRAINT "FK_349abe44ec4bfc3b7ef18024ff0"`
    );
    await queryRunner.query(
      `ALTER TABLE "house_of_quality" DROP CONSTRAINT "PK_814ac0f560a7d2eb7a463e33bf8"`
    );
    await queryRunner.query(
      `ALTER TABLE "functional" DROP CONSTRAINT "PK_fd98e3711fdfbcd376d52c888b2"`
    );
    await queryRunner.query(
      `ALTER TABLE "functional" DROP COLUMN "functional_id"`
    );
    await queryRunner.query(
      `ALTER TABLE "functional" ADD "functional_id" uuid NOT NULL DEFAULT uuid_generate_v4()`
    );
    await queryRunner.query(
      `ALTER TABLE "functional" ADD CONSTRAINT "PK_fd98e3711fdfbcd376d52c888b2" PRIMARY KEY ("functional_id")`
    );
    await queryRunner.query(
      `ALTER TABLE "functional" ALTER COLUMN "level_type" SET NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "functional" ADD "name" character varying NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "functional" ADD "identifier" character varying NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "functional" ADD CONSTRAINT "UQ_08a9b4a795ee8b4d06fa97cf556" UNIQUE ("identifier", "requirement_id")`
    );
    await queryRunner.query(
      `ALTER TABLE "backlog" DROP COLUMN "functionalFunctionalId_2"`
    );
    await queryRunner.query(
      `ALTER TABLE "backlog" DROP COLUMN "functionalFunctionalId_1"`
    );
    await queryRunner.query(
      `ALTER TABLE "backlog" ADD "functionalFunctionalId_2" uuid NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "backlog" ADD "functionalFunctionalId_1" uuid NOT NULL`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_5d852f830153becc3cb1421ac0" ON "backlog" ("functionalFunctionalId_2") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_ee748ce1a706359b29a8e895fa" ON "backlog" ("functionalFunctionalId_1") `
    );
    await queryRunner.query(
      `ALTER TABLE "backlog" ADD CONSTRAINT "PK_151b80ab338c362db062f8e223b" PRIMARY KEY ("functionalFunctionalId_1", "functionalFunctionalId_2")`
    );
    await queryRunner.query(
      `ALTER TABLE "backlog" ADD CONSTRAINT "FK_ee748ce1a706359b29a8e895fa6" FOREIGN KEY ("functionalFunctionalId_1") REFERENCES "functional"("functional_id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "backlog" ADD CONSTRAINT "FK_5d852f830153becc3cb1421ac05" FOREIGN KEY ("functionalFunctionalId_2") REFERENCES "functional"("functional_id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "house_of_quality" DROP COLUMN "functional_id"`
    );
    await queryRunner.query(
      `ALTER TABLE "house_of_quality" ADD "functional_id" uuid NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "house_of_quality" ADD CONSTRAINT "PK_814ac0f560a7d2eb7a463e33bf8" PRIMARY KEY ("functional_id", "nfunctional_id")`
    );
    await queryRunner.query(
      `ALTER TABLE "house_of_quality" ADD CONSTRAINT "FK_349abe44ec4bfc3b7ef18024ff0" FOREIGN KEY ("functional_id") REFERENCES "functional"("functional_id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }
}
