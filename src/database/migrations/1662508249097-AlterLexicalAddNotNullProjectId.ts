import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterLexicalAddNotNullProjectId1662508249097
  implements MigrationInterface
{
  name = "AlterLexicalAddNotNullProjectId1662508249097";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "non_functional" DROP CONSTRAINT "FK_c8d4bfb5c9695e1008c001b53a8"`
    );
    await queryRunner.query(
      `ALTER TABLE "functional" DROP CONSTRAINT "FK_28066634a6aa307b378b7edb06e"`
    );
    await queryRunner.query(
      `ALTER TABLE "non_functional" RENAME COLUMN "nfr_links" TO "nfr_links_id"`
    );
    await queryRunner.query(
      `ALTER TABLE "non_functional" RENAME CONSTRAINT "UQ_c8d4bfb5c9695e1008c001b53a8" TO "UQ_6380e5ea169723d0c0c65534795"`
    );
    await queryRunner.query(
      `ALTER TABLE "functional" RENAME COLUMN "backlog_links" TO "backlog_links_id"`
    );
    await queryRunner.query(
      `ALTER TABLE "verification" DROP CONSTRAINT "FK_ebbdbcbd1880030313924d636e7"`
    );
    await queryRunner.query(
      `ALTER TABLE "verification" ALTER COLUMN "artifact_id" SET NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "lexical" DROP CONSTRAINT "FK_664ac60a3c3a69c1535667b3d2e"`
    );
    await queryRunner.query(
      `ALTER TABLE "lexical" ALTER COLUMN "project_id" SET NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "verification" ADD CONSTRAINT "FK_ebbdbcbd1880030313924d636e7" FOREIGN KEY ("artifact_id") REFERENCES "artifact"("artifact_id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "lexical" ADD CONSTRAINT "FK_664ac60a3c3a69c1535667b3d2e" FOREIGN KEY ("project_id") REFERENCES "project"("project_id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "non_functional" ADD CONSTRAINT "FK_6380e5ea169723d0c0c65534795" FOREIGN KEY ("nfr_links_id") REFERENCES "non_functional"("nfunctional_id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "functional" ADD CONSTRAINT "FK_396e7088683f97a65171fbc16b9" FOREIGN KEY ("backlog_links_id") REFERENCES "functional"("functional_id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "functional" DROP CONSTRAINT "FK_396e7088683f97a65171fbc16b9"`
    );
    await queryRunner.query(
      `ALTER TABLE "non_functional" DROP CONSTRAINT "FK_6380e5ea169723d0c0c65534795"`
    );
    await queryRunner.query(
      `ALTER TABLE "lexical" DROP CONSTRAINT "FK_664ac60a3c3a69c1535667b3d2e"`
    );
    await queryRunner.query(
      `ALTER TABLE "verification" DROP CONSTRAINT "FK_ebbdbcbd1880030313924d636e7"`
    );
    await queryRunner.query(
      `ALTER TABLE "lexical" ALTER COLUMN "project_id" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "lexical" ADD CONSTRAINT "FK_664ac60a3c3a69c1535667b3d2e" FOREIGN KEY ("project_id") REFERENCES "project"("project_id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "verification" ALTER COLUMN "artifact_id" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "verification" ADD CONSTRAINT "FK_ebbdbcbd1880030313924d636e7" FOREIGN KEY ("artifact_id") REFERENCES "artifact"("artifact_id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "functional" RENAME COLUMN "backlog_links_id" TO "backlog_links"`
    );
    await queryRunner.query(
      `ALTER TABLE "non_functional" RENAME CONSTRAINT "UQ_6380e5ea169723d0c0c65534795" TO "UQ_c8d4bfb5c9695e1008c001b53a8"`
    );
    await queryRunner.query(
      `ALTER TABLE "non_functional" RENAME COLUMN "nfr_links_id" TO "nfr_links"`
    );
    await queryRunner.query(
      `ALTER TABLE "functional" ADD CONSTRAINT "FK_28066634a6aa307b378b7edb06e" FOREIGN KEY ("backlog_links") REFERENCES "functional"("functional_id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "non_functional" ADD CONSTRAINT "FK_c8d4bfb5c9695e1008c001b53a8" FOREIGN KEY ("nfr_links") REFERENCES "non_functional"("nfunctional_id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }
}
