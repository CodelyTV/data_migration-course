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
	total_reviews: number;
};

@Service()
export class PostgresRetentionUserRepository extends RetentionUserRepository {
	constructor(private readonly connection: PostgresConnection) {
		super();
	}

	async save(user: RetentionUser): Promise<void> {
		const userPrimitives = user.toPrimitives();

		await this.connection.execute`
			INSERT INTO retention.users (id, email, last_activity_date, registration_date, total_reviews)
			VALUES (${userPrimitives.id},
					${userPrimitives.email},
					${userPrimitives.lastActivityDate},
					${userPrimitives.registrationDate},
					${userPrimitives.totalReviews})
			ON CONFLICT (id) DO UPDATE SET
				email = EXCLUDED.email,
				last_activity_date = EXCLUDED.last_activity_date,
				registration_date = EXCLUDED.registration_date,
				total_reviews = EXCLUDED.total_reviews;
		`;
	}

	async search(id: UserId): Promise<RetentionUser | null> {
		const query = `SELECT id, email, last_activity_date, registration_date, total_reviews FROM retention.users WHERE id = '${id.value}';`;

		const result = await this.connection.searchOne<DatabaseUser>(query);

		if (!result) {
			return null;
		}

		return RetentionUser.fromPrimitives({
			id: result.id,
			email: result.email,
			lastActivityDate: result.last_activity_date,
			registrationDate: result.registration_date,
			totalReviews: result.total_reviews,
		});
	}
}
