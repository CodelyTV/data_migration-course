/* eslint-disable @typescript-eslint/no-explicit-any */
import postgres from "postgres";

export class PostgresConnection {
	private sqlInstance: postgres.Sql | null = null;

	get sql(): postgres.Sql {
		if (!this.sqlInstance) {
			this.sqlInstance = postgres({
				host: "localhost",
				port: 5432,
				user: "codely",
				password: "c0d3ly7v",
				database: "ecommerce",
				onnotice: () => {},
				max: 20,
			});
		}

		return this.sqlInstance;
	}

	async searchOne<T>(query: string): Promise<T | null> {
		return (await this.sql.unsafe(query))[0] as T;
	}

	async searchAll<T>(query: string): Promise<T[]> {
		return (await this.sql.unsafe(query)) as T[];
	}

	async execute(strings: TemplateStringsArray, ...values: any[]): Promise<void> {
		await this.sql(strings, ...values);
	}

	async executeUnsafe(query: string): Promise<void> {
		await this.sql.unsafe(query);
	}

	async truncateAll(): Promise<void> {
		await this.executeUnsafe(`DO
$$
DECLARE
    r RECORD;
BEGIN
    FOR r IN (SELECT schemaname, tablename
              FROM pg_tables
              WHERE schemaname IN ('shop', 'shared', 'product'))
    LOOP
        EXECUTE 'TRUNCATE TABLE ' || quote_ident(r.schemaname) || '.' || quote_ident(r.tablename) || ' CASCADE';
    END LOOP;
END
$$;`);
	}

	async refresh(productWithReviewsMaterialized: string): Promise<void> {
		await this.executeUnsafe(`REFRESH MATERIALIZED VIEW ${productWithReviewsMaterialized}`);
	}
}
