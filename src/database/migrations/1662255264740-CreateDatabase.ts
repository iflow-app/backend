import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateDatabase1662255264740 implements MigrationInterface {
    name = 'CreateDatabase1662255264740'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "content" ("content_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "content" bytea NOT NULL, "type" character varying NOT NULL, "artifact_id" uuid NOT NULL, CONSTRAINT "PK_20817ae3445d00a5bc50a58a144" PRIMARY KEY ("content_id"))`);
        await queryRunner.query(`CREATE TYPE "public"."lexical_type_enum" AS ENUM('verb', 'object', 'state')`);
        await queryRunner.query(`CREATE TABLE "lexical" ("lexical_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "notion" text NOT NULL, "impact" text NOT NULL, "type" "public"."lexical_type_enum" NOT NULL, "project_id" uuid, CONSTRAINT "PK_97235902f2d83cf85b278bf4828" PRIMARY KEY ("lexical_id"))`);
        await queryRunner.query(`CREATE TABLE "requirement" ("requirement_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text NOT NULL, "who" text NOT NULL, "what" text NOT NULL, "why" text NOT NULL, "artifact_id" uuid, "project_id" uuid NOT NULL, CONSTRAINT "PK_60af42acc7a5f9b1776780785f5" PRIMARY KEY ("requirement_id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("user_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "password" character varying NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_758b8ce7c18b9d347461b30228d" PRIMARY KEY ("user_id"))`);
        await queryRunner.query(`CREATE TABLE "project" ("project_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" text NOT NULL, "objective" text NOT NULL, "user_id" uuid NOT NULL, CONSTRAINT "PK_1a480c5734c5aacb9cef7b1499d" PRIMARY KEY ("project_id"))`);
        await queryRunner.query(`CREATE TYPE "public"."checkpoint_result_type_enum" AS ENUM('boolean', 'int', 'text')`);
        await queryRunner.query(`CREATE TABLE "checkpoint" ("checkpoint_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "result" text NOT NULL, "result_type" "public"."checkpoint_result_type_enum" NOT NULL, "criteria" text NOT NULL, "verification_id" uuid NOT NULL, CONSTRAINT "PK_3cafc66ca70125e339cd82dfe8c" PRIMARY KEY ("checkpoint_id"))`);
        await queryRunner.query(`CREATE TABLE "verification" ("verification_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text NOT NULL, "artifact_id" uuid, CONSTRAINT "PK_9e7eb9e23e11af4d8a03ee7ceca" PRIMARY KEY ("verification_id"))`);
        await queryRunner.query(`CREATE TYPE "public"."artifact_stage_enum" AS ENUM('pre-traceability', 'elicitation')`);
        await queryRunner.query(`CREATE TABLE "artifact" ("artifact_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "stage" "public"."artifact_stage_enum" NOT NULL, "objective" text NOT NULL, "project_id" uuid NOT NULL, "evolve_id" uuid, CONSTRAINT "PK_2487ebf6a33e4d4f868ade9777d" PRIMARY KEY ("artifact_id"))`);
        await queryRunner.query(`CREATE TABLE "non_functional" ("nfunctional_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "identifier" character varying NOT NULL, "priority" smallint NOT NULL, "requirement_id" uuid NOT NULL, "nfr_links" uuid, CONSTRAINT "UQ_11a73474152bfe3c93275a7a8ed" UNIQUE ("requirement_id", "identifier"), CONSTRAINT "UQ_c8d4bfb5c9695e1008c001b53a8" UNIQUE ("nfr_links"), CONSTRAINT "REL_422428432948d2222b1dffba68" UNIQUE ("requirement_id"), CONSTRAINT "PK_957a0b3a78c5dc039834a5de7ad" PRIMARY KEY ("nfunctional_id"))`);
        await queryRunner.query(`CREATE TABLE "house_of_quality" ("weight" smallint NOT NULL, "functional_id" uuid NOT NULL, "nfunctional_id" uuid NOT NULL, CONSTRAINT "PK_814ac0f560a7d2eb7a463e33bf8" PRIMARY KEY ("functional_id", "nfunctional_id"))`);
        await queryRunner.query(`CREATE TYPE "public"."functional_level_type_enum" AS ENUM('epic', 'feature', 'user story')`);
        await queryRunner.query(`CREATE TABLE "functional" ("functional_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "level_type" "public"."functional_level_type_enum" NOT NULL, "identifier" character varying NOT NULL, "name" character varying NOT NULL, "requirement_id" uuid NOT NULL, "backlog_links" uuid, CONSTRAINT "UQ_08a9b4a795ee8b4d06fa97cf556" UNIQUE ("requirement_id", "identifier"), CONSTRAINT "REL_d6fa5025bde8ff7f89724c58b5" UNIQUE ("requirement_id"), CONSTRAINT "PK_fd98e3711fdfbcd376d52c888b2" PRIMARY KEY ("functional_id"))`);
        await queryRunner.query(`ALTER TABLE "content" ADD CONSTRAINT "FK_ffd99674a09dd76c2aa66c62fd7" FOREIGN KEY ("artifact_id") REFERENCES "artifact"("artifact_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "lexical" ADD CONSTRAINT "FK_664ac60a3c3a69c1535667b3d2e" FOREIGN KEY ("project_id") REFERENCES "project"("project_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "requirement" ADD CONSTRAINT "FK_4e419e9215a43eb920945f015dc" FOREIGN KEY ("artifact_id") REFERENCES "artifact"("artifact_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "requirement" ADD CONSTRAINT "FK_a71760fd90a5d7c2edb2c982447" FOREIGN KEY ("project_id") REFERENCES "project"("project_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "project" ADD CONSTRAINT "FK_1cf56b10b23971cfd07e4fc6126" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "checkpoint" ADD CONSTRAINT "FK_63bb81c455cb80bc85e524da34b" FOREIGN KEY ("verification_id") REFERENCES "verification"("verification_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "verification" ADD CONSTRAINT "FK_ebbdbcbd1880030313924d636e7" FOREIGN KEY ("artifact_id") REFERENCES "artifact"("artifact_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "artifact" ADD CONSTRAINT "FK_5f5da14712db92faa1ee41ed737" FOREIGN KEY ("project_id") REFERENCES "project"("project_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "artifact" ADD CONSTRAINT "FK_84416425125abf970573f9dae9e" FOREIGN KEY ("evolve_id") REFERENCES "artifact"("artifact_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "non_functional" ADD CONSTRAINT "FK_422428432948d2222b1dffba68b" FOREIGN KEY ("requirement_id") REFERENCES "requirement"("requirement_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "non_functional" ADD CONSTRAINT "FK_c8d4bfb5c9695e1008c001b53a8" FOREIGN KEY ("nfr_links") REFERENCES "non_functional"("nfunctional_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "house_of_quality" ADD CONSTRAINT "FK_349abe44ec4bfc3b7ef18024ff0" FOREIGN KEY ("functional_id") REFERENCES "functional"("functional_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "house_of_quality" ADD CONSTRAINT "FK_ce022fee7cc022b81d22c6a636d" FOREIGN KEY ("nfunctional_id") REFERENCES "non_functional"("nfunctional_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "functional" ADD CONSTRAINT "FK_d6fa5025bde8ff7f89724c58b5e" FOREIGN KEY ("requirement_id") REFERENCES "requirement"("requirement_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "functional" ADD CONSTRAINT "FK_28066634a6aa307b378b7edb06e" FOREIGN KEY ("backlog_links") REFERENCES "functional"("functional_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "functional" DROP CONSTRAINT "FK_28066634a6aa307b378b7edb06e"`);
        await queryRunner.query(`ALTER TABLE "functional" DROP CONSTRAINT "FK_d6fa5025bde8ff7f89724c58b5e"`);
        await queryRunner.query(`ALTER TABLE "house_of_quality" DROP CONSTRAINT "FK_ce022fee7cc022b81d22c6a636d"`);
        await queryRunner.query(`ALTER TABLE "house_of_quality" DROP CONSTRAINT "FK_349abe44ec4bfc3b7ef18024ff0"`);
        await queryRunner.query(`ALTER TABLE "non_functional" DROP CONSTRAINT "FK_c8d4bfb5c9695e1008c001b53a8"`);
        await queryRunner.query(`ALTER TABLE "non_functional" DROP CONSTRAINT "FK_422428432948d2222b1dffba68b"`);
        await queryRunner.query(`ALTER TABLE "artifact" DROP CONSTRAINT "FK_84416425125abf970573f9dae9e"`);
        await queryRunner.query(`ALTER TABLE "artifact" DROP CONSTRAINT "FK_5f5da14712db92faa1ee41ed737"`);
        await queryRunner.query(`ALTER TABLE "verification" DROP CONSTRAINT "FK_ebbdbcbd1880030313924d636e7"`);
        await queryRunner.query(`ALTER TABLE "checkpoint" DROP CONSTRAINT "FK_63bb81c455cb80bc85e524da34b"`);
        await queryRunner.query(`ALTER TABLE "project" DROP CONSTRAINT "FK_1cf56b10b23971cfd07e4fc6126"`);
        await queryRunner.query(`ALTER TABLE "requirement" DROP CONSTRAINT "FK_a71760fd90a5d7c2edb2c982447"`);
        await queryRunner.query(`ALTER TABLE "requirement" DROP CONSTRAINT "FK_4e419e9215a43eb920945f015dc"`);
        await queryRunner.query(`ALTER TABLE "lexical" DROP CONSTRAINT "FK_664ac60a3c3a69c1535667b3d2e"`);
        await queryRunner.query(`ALTER TABLE "content" DROP CONSTRAINT "FK_ffd99674a09dd76c2aa66c62fd7"`);
        await queryRunner.query(`DROP TABLE "functional"`);
        await queryRunner.query(`DROP TYPE "public"."functional_level_type_enum"`);
        await queryRunner.query(`DROP TABLE "house_of_quality"`);
        await queryRunner.query(`DROP TABLE "non_functional"`);
        await queryRunner.query(`DROP TABLE "artifact"`);
        await queryRunner.query(`DROP TYPE "public"."artifact_stage_enum"`);
        await queryRunner.query(`DROP TABLE "verification"`);
        await queryRunner.query(`DROP TABLE "checkpoint"`);
        await queryRunner.query(`DROP TYPE "public"."checkpoint_result_type_enum"`);
        await queryRunner.query(`DROP TABLE "project"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "requirement"`);
        await queryRunner.query(`DROP TABLE "lexical"`);
        await queryRunner.query(`DROP TYPE "public"."lexical_type_enum"`);
        await queryRunner.query(`DROP TABLE "content"`);
    }

}
