import { Service } from "diod";

import { PostgresConnection } from "../../../shared/infrastructure/persistence/PostgresConnection";
import { UserId } from "../../../shop/users/domain/UserId";
import { RetentionUser } from "../domain/RetentionUser";
import { RetentionUserRepository } from "../domain/RetentionUserRepository";

type DatabaseUser = {
	id: string;
	email: string;
	last_activity_date: Date;
	registration_date: Date;
};

@Service()
export class PostgresRetentionUserRepository extends RetentionUserRepository {
	constructor(private readonly connection: PostgresConnection) {
		super();
	}

	async save(user: RetentionUser): Promise<void> {
		const userPrimitives = user.toPrimitives();

		await this.connection.execute`
			INSERT INTO retention.users (id, email, last_activity_date, registration_date)
			VALUES (${userPrimitives.id},
					${userPrimitives.email},
					${userPrimitives.lastActivityDate},
					${userPrimitives.registrationDate});
			`;
	}

	async search(id: UserId): Promise<RetentionUser | null> {
		const query = `SELECT id, email, last_activity_date, registration_date FROM retention.users WHERE id = '${id.value}';`;

		const result = await this.connection.searchOne<DatabaseUser>(query);

		if (!result) {
			return await this.tryToImport(id);
		}

		console.log(`Shop user ${id.value} is already imported`);

		return RetentionUser.fromPrimitives({
			id: result.id,
			email: result.email,
			lastActivityDate: result.last_activity_date,
			registrationDate: result.registration_date,
		});
	}

	async tryToImport(id: UserId): Promise<RetentionUser | null> {
		const shopUser = await this.fetchShopUser(id);

		if (shopUser === null) {
			return null;
		}

		const retentionUser = RetentionUser.fromPrimitives({
			id: shopUser.id,
			email: shopUser.email,
			lastActivityDate: new Date(),
			registrationDate: new Date(),
		});

		await this.save(retentionUser);

		console.log(`Shop user ${id.value} imported to retention context`);

		return retentionUser;
	}

	async fetchShopUser(id: UserId): Promise<{ id: string; email: string } | null> {
		const response = await fetch(`http://localhost:3000/api/shop/users/${id.value}`, {
			method: "GET",
		});

		if (!response.ok) {
			return null;
		}

		const data = await response.json();

		return {
			id: data.id,
			email: data.email,
		};
	}
}
