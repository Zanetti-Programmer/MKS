import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableFilms1715696175323 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        queryRunner.query(`
            CREATE  TABLE  IF  NOT  EXISTS  public.films
            (
                id uuid NOT NULL  DEFAULT uuid_generate_v4(),
                "userId" uuid,
                name character varying(100) COLLATE pg_catalog."default" NOT NULL,
                genre character varying(50) COLLATE pg_catalog."default" NOT NULL,
                sinopse TEXT NOT NULL,
                created_at timestamp without time zone  NOT NULL  DEFAULT  now(),
                updated_at timestamp without time zone  NOT NULL  DEFAULT  now(),
                deleted_at timestamp without time zone,
                PRIMARY KEY (id),
                FOREIGN KEY ("userId") REFERENCES  public.users (id) MATCH SIMPLE
                ON DELETE CASCADE 
                ON UPDATE CASCADE
            );

            ALTER TABLE IF EXISTS public.films OWNER to root;
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        queryRunner.query(`
        drop table if exists public.films;
        `)
    }

}
