import "reflect-metadata";

import { container } from "../../../../contexts/shared/infrastructure/dependency_injection/diod.config";
import { DomainEventFailover } from "../../../../contexts/shared/infrastructure/event_bus/failover/DomainEventFailover";
import { RabbitMqConnection } from "../../../../contexts/shared/infrastructure/event_bus/rabbitmq/RabbitMqConnection";
import { RabbitMqEventBus } from "../../../../contexts/shared/infrastructure/event_bus/rabbitmq/RabbitMqEventBus";
import { HttpNextResponse } from "../../../../contexts/shared/infrastructure/http/HttpNextResponse";
import { PostgresConnection } from "../../../../contexts/shared/infrastructure/persistence/PostgresConnection";

export async function POST(): Promise<Response> {
	const postgresConnection = container.get(PostgresConnection);

	const eventBus = new RabbitMqEventBus(
		new RabbitMqConnection(),
		new DomainEventFailover(postgresConnection),
	);

	await eventBus.publishFromFailover();

	return HttpNextResponse.created();
}
