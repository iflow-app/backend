import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterArtifactDropObjective1662508905392
  implements MigrationInterface
{
  name = "AlterArtifactDropObjective1662508905392";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "artifact" DROP COLUMN "objective"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "artifact" ADD "objective" text NOT NULL`
    );
  }
}
