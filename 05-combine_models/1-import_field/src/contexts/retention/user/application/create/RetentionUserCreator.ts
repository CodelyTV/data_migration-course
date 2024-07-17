import { Service } from "diod";

import { RetentionUser } from "../../domain/RetentionUser";
import { RetentionUserRepository } from "../../domain/RetentionUserRepository";

@Service()
export class RetentionUserCreator {
	constructor(private readonly repository: RetentionUserRepository) {}

	async create(id: string, email: string, registrationDate: Date): Promise<void> {
		const user = RetentionUser.create(id, email, registrationDate);

		await this.repository.save(user);
	}
}
