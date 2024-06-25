import { UserEmail } from "../../../shop/users/domain/UserEmail";
import { UserId } from "../../../shop/users/domain/UserId";

export type RetentionUserPrimitives = {
	id: string;
	email: string;
	lastActivityDate: Date;
	registrationDate: Date;
};

export class RetentionUser {
	constructor(
		public readonly id: UserId,
		public readonly email: UserEmail,
		private lastActivityDate: Date,
		private readonly registrationDate: Date,
	) {}

	static fromPrimitives(primitives: RetentionUserPrimitives): RetentionUser {
		return new RetentionUser(
			new UserId(primitives.id),
			new UserEmail(primitives.email),
			primitives.lastActivityDate,
			primitives.registrationDate,
		);
	}

	static create(id: string, email: string, registrationDate: Date): RetentionUser {
		return RetentionUser.fromPrimitives({
			id,
			email,
			lastActivityDate: registrationDate,
			registrationDate,
		});
	}

	updateLastActivityDate(lastActivityDate: Date): void {
		this.lastActivityDate = lastActivityDate;
	}

	toPrimitives(): RetentionUserPrimitives {
		return {
			id: this.id.value,
			email: this.email.value,
			lastActivityDate: this.lastActivityDate,
			registrationDate: this.registrationDate,
		};
	}

	lastActivityDateIsOlderThan(other: Date): boolean {
		return this.lastActivityDate <= other;
	}
}
