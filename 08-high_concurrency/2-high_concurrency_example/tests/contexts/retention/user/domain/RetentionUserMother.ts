import {
	RetentionUser,
	RetentionUserPrimitives,
} from "../../../../../src/contexts/retention/user/domain/RetentionUser";
import { DateMother } from "../../../shop/users/domain/DateMother";
import { UserEmailMother } from "../../../shop/users/domain/UserEmailMother";
import { UserIdMother } from "../../../shop/users/domain/UserIdMother";

export class RetentionUserMother {
	static create(params?: Partial<RetentionUserPrimitives>): RetentionUser {
		const primitives: RetentionUserPrimitives = {
			id: UserIdMother.create().value,
			email: UserEmailMother.create().value,
			lastActivityDate: DateMother.create(),
			registrationDate: DateMother.create(),
			...params,
		};

		return RetentionUser.fromPrimitives(primitives);
	}

	static fromToday(id: string): RetentionUser {
		return this.create({
			id,
			lastActivityDate: DateMother.today(),
		});
	}

	static fromYesterday(id: string): RetentionUser {
		return this.create({
			id,
			lastActivityDate: DateMother.yesterday(),
		});
	}
}
