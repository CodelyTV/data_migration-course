import { DomainEventAttributes } from "../../../shared/domain/event/DomainEvent";
import { UserUpdatedDomainEvent } from "./UserUpdatedDomainEvent";

export class UserEmailUpdatedDomainEvent extends UserUpdatedDomainEvent {
	static eventName = "codely.shop.user.email.updated";

	constructor(
		public readonly id: string,
		public readonly email: string,
		eventId?: string,
		occurredOn?: Date,
	) {
		super(UserEmailUpdatedDomainEvent.eventName, id, eventId, occurredOn);
	}

	static fromPrimitives(
		aggregateId: string,
		eventId: string,
		occurredOn: Date,
		attributes: DomainEventAttributes,
	): UserEmailUpdatedDomainEvent {
		return new UserEmailUpdatedDomainEvent(
			aggregateId,
			attributes.name as string,
			eventId,
			occurredOn,
		);
	}

	toPrimitives(): DomainEventAttributes {
		return {
			id: this.id,
			email: this.email,
		};
	}
}
