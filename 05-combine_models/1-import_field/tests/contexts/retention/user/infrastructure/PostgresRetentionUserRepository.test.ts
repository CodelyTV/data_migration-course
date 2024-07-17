import { PostgresRetentionUserRepository } from "../../../../../src/contexts/retention/user/infrastructure/PostgresRetentionUserRepository";
import { PostgresConnection } from "../../../../../src/contexts/shared/infrastructure/persistence/PostgresConnection";
import { PostgresUserRepository } from "../../../../../src/contexts/shop/users/infrastructure/PostgresUserRepository";
import { DateMother } from "../../../shop/users/domain/DateMother";
import { UserIdMother } from "../../../shop/users/domain/UserIdMother";
import { UserMother } from "../../../shop/users/domain/UserMother";
import { RetentionUserMother } from "../domain/RetentionUserMother";

describe("PostgresRetentionUserRepository should", () => {
	const connection = new PostgresConnection();

	const userRepository = new PostgresUserRepository(connection);
	const repository = new PostgresRetentionUserRepository(connection);

	beforeEach(async () => {
		await new PostgresConnection().truncateAll();
	});

	it("save a user", async () => {
		const user = RetentionUserMother.create();

		await repository.save(user);
	});

	it("return null searching a non existing user", async () => {
		const nonExistingUserId = UserIdMother.create();

		expect(await repository.search(nonExistingUserId)).toBeNull();
	});

	it("return and existing user", async () => {
		const user = RetentionUserMother.create();

		await repository.save(user);

		expect(await repository.search(user.id)).toEqual(user);
	});

	it("import and return a shop user", async () => {
		const shopUser = UserMother.create();
		await userRepository.save(shopUser);

		const user = RetentionUserMother.create({
			id: shopUser.id.value,
			email: shopUser.email.value,
			lastActivityDate: DateMother.now(),
			registrationDate: DateMother.now(),
		});

		const actualUser = await repository.search(user.id);

		expect(actualUser?.id).toEqual(user.id);
		expect(actualUser?.email).toEqual(user.email);
	});
});
