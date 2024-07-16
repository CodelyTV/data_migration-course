import { Service } from "diod";

import { PostgresConnection } from "../../../shared/infrastructure/persistence/PostgresConnection";
import { User } from "../domain/User";
import { UserId } from "../domain/UserId";
import { UserRepository } from "../domain/UserRepository";

type DatabaseUser = {
	id: string;
	name: string;
	email: string;
	profile_picture: string;
};

@Service()
export class PostgresUserRepository implements UserRepository {
	constructor(private readonly connection: PostgresConnection) {}

	async save(user: User): Promise<void> {
		const userPrimitives = user.toPrimitives();

		await this.connection.execute`
			INSERT INTO shop.users (id, name, email, profile_picture)
			VALUES (
				${userPrimitives.id},
				${userPrimitives.name},
				${userPrimitives.email},
				${userPrimitives.profilePicture}
		   )
			ON CONFLICT (id)
			DO UPDATE SET
				name = EXCLUDED.name,
				email = EXCLUDED.email,
				profile_picture = EXCLUDED.profile_picture;
		`;
	}

	async search(id: UserId): Promise<User | null> {
		const query = `SELECT id, name, email, profile_picture FROM shop.users WHERE id = '${id.value}';`;

		const result = await this.connection.searchOne<DatabaseUser>(query);

		if (!result) {
			return null;
		}

		return User.fromPrimitives({
			id: result.id,
			name: result.name,
			email: result.email,
			profilePicture: result.profile_picture,
		});
	}
}
