import { DomainError } from "../../../shared/domain/DomainError";

export class RetentionUserDoesNotExistError extends DomainError {
	readonly type = "RetentionUserDoesNotExistError";
	readonly message = `The user ${this.id} does not exist`;

	constructor(public readonly id: string) {
		super();
	}
}
