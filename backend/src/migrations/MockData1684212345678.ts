import { MigrationInterface, QueryRunner } from 'typeorm';

export class MockData1684212345678 implements MigrationInterface {
  name = 'MockData1684212345678';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "folders" (
                                       "id" SERIAL PRIMARY KEY,
                                       "name" VARCHAR NOT NULL,
                                       "createdAt" TIMESTAMP DEFAULT now()
            );
        `);

    await queryRunner.query(`
            CREATE TABLE "files" (
                                     "id" SERIAL PRIMARY KEY,
                                     "name" VARCHAR NOT NULL,
                                     "path" VARCHAR NOT NULL,
                                     "uploadedAt" TIMESTAMP DEFAULT now(),
                                     "folderId" INTEGER,
                                     CONSTRAINT "FK_folder" FOREIGN KEY ("folderId") REFERENCES "folders"("id") ON DELETE CASCADE
            );
        `);
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "files"`);
    await queryRunner.query(`DROP TABLE "folders"`);
  }
}
