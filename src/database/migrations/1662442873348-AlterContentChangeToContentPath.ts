import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterContentChangeToContentPath1662442873348
  implements MigrationInterface
{
  name = "AlterContentChangeToContentPath1662442873348";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "content" RENAME COLUMN "content" TO "path"`
    );
    await queryRunner.query(`ALTER TABLE "content" DROP COLUMN "path"`);
    await queryRunner.query(`ALTER TABLE "content" ADD "path" text NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "content" DROP COLUMN "path"`);
    await queryRunner.query(`ALTER TABLE "content" ADD "path" bytea NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "content" RENAME COLUMN "path" TO "content"`
    );
  }
}
