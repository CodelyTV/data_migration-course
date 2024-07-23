import { UserEmail } from "../../../shop/users/domain/UserEmail";
import { UserId } from "../../../shop/users/domain/UserId";

export type RetentionUserPrimitives = {
	id: string;
	email: string;
	lastActivityDate: Date;
	registrationDate: Date;
	totalReviews: number | null;
};

export class RetentionUser {
	constructor(
		public readonly id: UserId,
		public readonly email: UserEmail,
		private lastActivityDate: Date,
		private readonly registrationDate: Date,
		private totalReviews: number | null,
	) {}

	static fromPrimitives(primitives: RetentionUserPrimitives): RetentionUser {
		return new RetentionUser(
			new UserId(primitives.id),
			new UserEmail(primitives.email),
			primitives.lastActivityDate,
			primitives.registrationDate,
			primitives.totalReviews,
		);
	}

	static create(id: string, email: string, registrationDate: Date): RetentionUser {
		return RetentionUser.fromPrimitives({
			id,
			email,
			lastActivityDate: registrationDate,
			registrationDate,
			totalReviews: 0,
		});
	}

	updateLastActivityDate(lastActivityDate: Date): void {
		this.lastActivityDate = lastActivityDate;
	}

	lastActivityDateIsOlderThan(other: Date): boolean {
		return this.lastActivityDate <= other;
	}

	incrementTotalReviews(): void {
		if (!this.totalReviewsHaveBeenImported()) {
			throw new Error("User total reviews is pending to import for the first time");
		}

		this.totalReviews = (this.totalReviews ?? 0) + 1;
	}

	totalReviewsHaveBeenImported(): boolean {
		return this.totalReviews !== null;
	}

	toPrimitives(): RetentionUserPrimitives {
		return {
			id: this.id.value,
			email: this.email.value,
			lastActivityDate: this.lastActivityDate,
			registrationDate: this.registrationDate,
			totalReviews: this.totalReviews,
		};
	}
}
