import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterNonFunctionalChangePk1662578924377
  implements MigrationInterface
{
  name = "AlterNonFunctionalChangePk1662578924377";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "house_of_quality" DROP CONSTRAINT "FK_ce022fee7cc022b81d22c6a636d"`
    );
    await queryRunner.query(
      `ALTER TABLE "house_of_quality" DROP CONSTRAINT "PK_814ac0f560a7d2eb7a463e33bf8"`
    );
    await queryRunner.query(
      `ALTER TABLE "non_functional" DROP CONSTRAINT "FK_6380e5ea169723d0c0c65534795"`
    );
    await queryRunner.query(
      `ALTER TABLE "non_functional" DROP CONSTRAINT "UQ_6380e5ea169723d0c0c65534795"`
    );
    await queryRunner.query(
      `ALTER TABLE "non_functional" DROP CONSTRAINT "UQ_11a73474152bfe3c93275a7a8ed"`
    );
    await queryRunner.query(
      `ALTER TABLE "non_functional" DROP CONSTRAINT "PK_957a0b3a78c5dc039834a5de7ad"`
    );
    await queryRunner.query(
      `ALTER TABLE "non_functional" DROP COLUMN "nfunctional_id"`
    );
    await queryRunner.query(
      `ALTER TABLE "non_functional" ADD "nfunctional_id" SERIAL NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "non_functional" ADD CONSTRAINT "PK_957a0b3a78c5dc039834a5de7ad" PRIMARY KEY ("nfunctional_id")`
    );
    await queryRunner.query(
      `ALTER TABLE "non_functional" DROP COLUMN "identifier"`
    );
    await queryRunner.query(
      `ALTER TABLE "non_functional" DROP COLUMN "nfr_links_id"`
    );
    await queryRunner.query(
      `ALTER TABLE "non_functional" ADD "nfr_links_id" integer`
    );
    await queryRunner.query(
      `ALTER TABLE "non_functional" ADD CONSTRAINT "UQ_6380e5ea169723d0c0c65534795" UNIQUE ("nfr_links_id")`
    );
    await queryRunner.query(
      `ALTER TABLE "non_functional" ADD CONSTRAINT "FK_6380e5ea169723d0c0c65534795" FOREIGN KEY ("nfr_links_id") REFERENCES "non_functional"("nfunctional_id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "house_of_quality" DROP COLUMN "nfunctional_id"`
    );
    await queryRunner.query(
      `ALTER TABLE "house_of_quality" ADD "nfunctional_id" integer NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "house_of_quality" ADD CONSTRAINT "PK_814ac0f560a7d2eb7a463e33bf8" PRIMARY KEY ("functional_id", "nfunctional_id")`
    );
    await queryRunner.query(
      `ALTER TABLE "house_of_quality" ADD CONSTRAINT "FK_ce022fee7cc022b81d22c6a636d" FOREIGN KEY ("nfunctional_id") REFERENCES "non_functional"("nfunctional_id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "house_of_quality" DROP CONSTRAINT "FK_ce022fee7cc022b81d22c6a636d"`
    );
    await queryRunner.query(
      `ALTER TABLE "house_of_quality" DROP CONSTRAINT "PK_814ac0f560a7d2eb7a463e33bf8"`
    );
    await queryRunner.query(
      `ALTER TABLE "non_functional" DROP CONSTRAINT "FK_6380e5ea169723d0c0c65534795"`
    );
    await queryRunner.query(
      `ALTER TABLE "non_functional" DROP CONSTRAINT "UQ_6380e5ea169723d0c0c65534795"`
    );
    await queryRunner.query(
      `ALTER TABLE "non_functional" DROP CONSTRAINT "PK_957a0b3a78c5dc039834a5de7ad"`
    );
    await queryRunner.query(
      `ALTER TABLE "non_functional" DROP COLUMN "nfunctional_id"`
    );
    await queryRunner.query(
      `ALTER TABLE "non_functional" ADD "nfunctional_id" uuid NOT NULL DEFAULT uuid_generate_v4()`
    );
    await queryRunner.query(
      `ALTER TABLE "non_functional" ADD CONSTRAINT "PK_957a0b3a78c5dc039834a5de7ad" PRIMARY KEY ("nfunctional_id")`
    );
    await queryRunner.query(
      `ALTER TABLE "non_functional" DROP COLUMN "nfr_links_id"`
    );
    await queryRunner.query(
      `ALTER TABLE "non_functional" ADD "nfr_links_id" uuid`
    );
    await queryRunner.query(
      `ALTER TABLE "non_functional" ADD CONSTRAINT "FK_6380e5ea169723d0c0c65534795" FOREIGN KEY ("nfr_links_id") REFERENCES "non_functional"("nfunctional_id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "non_functional" ADD CONSTRAINT "UQ_6380e5ea169723d0c0c65534795" UNIQUE ("nfr_links_id")`
    );
    await queryRunner.query(
      `ALTER TABLE "non_functional" ADD "identifier" character varying NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "non_functional" ADD CONSTRAINT "UQ_11a73474152bfe3c93275a7a8ed" UNIQUE ("identifier", "requirement_id")`
    );
    await queryRunner.query(
      `ALTER TABLE "house_of_quality" DROP COLUMN "nfunctional_id"`
    );
    await queryRunner.query(
      `ALTER TABLE "house_of_quality" ADD "nfunctional_id" uuid NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "house_of_quality" ADD CONSTRAINT "PK_814ac0f560a7d2eb7a463e33bf8" PRIMARY KEY ("nfunctional_id", "functional_id")`
    );
    await queryRunner.query(
      `ALTER TABLE "house_of_quality" ADD CONSTRAINT "FK_ce022fee7cc022b81d22c6a636d" FOREIGN KEY ("nfunctional_id") REFERENCES "non_functional"("nfunctional_id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }
}
