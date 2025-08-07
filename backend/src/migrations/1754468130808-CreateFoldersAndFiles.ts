import { MigrationInterface, QueryRunner } from "typeorm";


export class CreateFoldersAndFiles1754468130808 implements MigrationInterface {
    name = 'CreateFoldersAndFiles1754468130808';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "files" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "path" character varying NOT NULL, "uploaded_at" TIMESTAMP NOT NULL, "folder_id" integer, CONSTRAINT "PK_6c16b9093a142e0e7613b04a3d9" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(
            `CREATE TABLE "folders" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL, CONSTRAINT "PK_8578bd31b0e7f6d6c2480dbbca8" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(
            `ALTER TABLE "files" ADD CONSTRAINT "FK_27bc84e6954d2fa309a4f61326f" FOREIGN KEY ("folder_id") REFERENCES "folders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );

        await queryRunner.query(`
            INSERT INTO "folders" ("name", "created_at") VALUES
                                                             ('Документы', NOW()),
                                                             ('Изображения', NOW()),
                                                             ('PDF отчёты', NOW());
        `);

        await queryRunner.query(`
            INSERT INTO "files" ("name", "path", "uploaded_at", "folder_id") VALUES
                                                                                 ('Резюме.pdf', 'uploads/Отчеты_pdf.pdf', NOW(), 1),
                                                                                 ('Фото.png', 'uploads/Резюме_pdf.pdf', NOW(), 2),
                                                                                 ('Отчёт Q1.pdf', 'uploads/Фото_pdf.pdf', NOW(), 3),
                                                                                 ('Отчёт Q2.pdf', 'uploads/Отчеты_pdf.pdf', NOW(), 3);
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "files" DROP CONSTRAINT "FK_27bc84e6954d2fa309a4f61326f"`,
        );
        await queryRunner.query(`DROP TABLE "folders"`);
        await queryRunner.query(`DROP TABLE "files"`);
    }
}
