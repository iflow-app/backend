import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterNonFunctionalPriority1662580105768
  implements MigrationInterface
{
  name = "AlterNonFunctionalPriority1662580105768";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "non_functional" DROP COLUMN "priority"`
    );
    await queryRunner.query(
      `CREATE TYPE "public"."non_functional_priority_enum" AS ENUM('one', 'two', 'three')`
    );
    await queryRunner.query(
      `ALTER TABLE "non_functional" ADD "priority" "public"."non_functional_priority_enum"`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "non_functional" DROP COLUMN "priority"`
    );
    await queryRunner.query(
      `DROP TYPE "public"."non_functional_priority_enum"`
    );
    await queryRunner.query(
      `ALTER TABLE "non_functional" ADD "priority" smallint NOT NULL`
    );
  }
}
