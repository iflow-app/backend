import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeRequirementArtifactRelation1664224601728
  implements MigrationInterface
{
  name = "ChangeRequirementArtifactRelation1664224601728";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "requirement" DROP CONSTRAINT "FK_4e419e9215a43eb920945f015dc"`
    );
    await queryRunner.query(
      `ALTER TABLE "requirement" DROP COLUMN "artifact_id"`
    );
    await queryRunner.query(
      `ALTER TABLE "non_functional" ADD "artifact_id" uuid`
    );
    await queryRunner.query(`ALTER TABLE "functional" ADD "artifact_id" uuid`);
    await queryRunner.query(
      `ALTER TABLE "non_functional" ADD CONSTRAINT "FK_072372fb0eccfee3b5c91a70cf9" FOREIGN KEY ("artifact_id") REFERENCES "artifact"("artifact_id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "functional" ADD CONSTRAINT "FK_cc5b04af6c1173c89b85bece8f4" FOREIGN KEY ("artifact_id") REFERENCES "artifact"("artifact_id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "functional" DROP CONSTRAINT "FK_cc5b04af6c1173c89b85bece8f4"`
    );
    await queryRunner.query(
      `ALTER TABLE "non_functional" DROP CONSTRAINT "FK_072372fb0eccfee3b5c91a70cf9"`
    );
    await queryRunner.query(
      `ALTER TABLE "functional" DROP COLUMN "artifact_id"`
    );
    await queryRunner.query(
      `ALTER TABLE "non_functional" DROP COLUMN "artifact_id"`
    );
    await queryRunner.query(`ALTER TABLE "requirement" ADD "artifact_id" uuid`);
    await queryRunner.query(
      `ALTER TABLE "requirement" ADD CONSTRAINT "FK_4e419e9215a43eb920945f015dc" FOREIGN KEY ("artifact_id") REFERENCES "artifact"("artifact_id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }
}
