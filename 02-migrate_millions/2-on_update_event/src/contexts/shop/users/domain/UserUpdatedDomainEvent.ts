import { DomainEvent, DomainEventAttributes } from "../../../shared/domain/event/DomainEvent";

export class UserUpdatedDomainEvent extends DomainEvent {
	static eventName = "codely.shop.user.*_updated";

	constructor(
		eventName: string,
		public readonly id: string,
		eventId?: string,
		occurredOn?: Date,
	) {
		super(eventName, id, eventId, occurredOn);
	}

	static fromPrimitives(
		aggregateId: string,
		eventId: string,
		occurredOn: Date,
		_attributes: DomainEventAttributes,
	): UserUpdatedDomainEvent {
		return new UserUpdatedDomainEvent(
			UserUpdatedDomainEvent.eventName,
			aggregateId,
			eventId,
			occurredOn,
		);
	}

	toPrimitives(): { [key: string]: unknown } {
		return {
			id: this.id,
		};
	}
}
