import { Service } from "diod";

import { PostgresConnection } from "../../persistence/PostgresConnection";

type DatabaseEvent = {
	eventId: string;
	eventName: string;
	body: string;
};

@Service()
export class DomainEventFailover {
	constructor(private readonly connection: PostgresConnection) {}

	async publish(eventId: string, eventName: string, serializedEvent: string): Promise<void> {
		const query = `INSERT INTO shared__failover_domain_events (eventId, eventName, body) VALUES ('${eventId}', '${eventName}', '${serializedEvent}')`;

		await this.connection.executeUnsafe(query);
	}

	async consume(total: number): Promise<DatabaseEvent[]> {
		const query = `SELECT eventId, eventName, body FROM shared__failover_domain_events LIMIT ${total}`;
		const result = await this.connection.searchAll<DatabaseEvent>(query);

		await this.connection.executeUnsafe(
			`DELETE FROM shared__failover_domain_events LIMIT ${total}`,
		);

		return result;
	}
}
