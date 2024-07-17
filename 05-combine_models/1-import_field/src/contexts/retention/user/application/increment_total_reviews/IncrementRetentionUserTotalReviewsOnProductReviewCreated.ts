import { Service } from "diod";

import { DomainEventClass } from "../../../../shared/domain/event/DomainEventClass";
import { DomainEventSubscriber } from "../../../../shared/domain/event/DomainEventSubscriber";
import { ProductReviewCreatedDomainEvent } from "../../../../shop/product_reviews/domain/ProductReviewCreatedDomainEvent";
import { RetentionUserTotalReviewsIncrementer } from "./RetentionUserTotalReviewsIncrementer";

@Service()
export class IncrementRetentionUserTotalReviewsOnProductReviewCreated
	implements DomainEventSubscriber<ProductReviewCreatedDomainEvent>
{
	constructor(private readonly incrementer: RetentionUserTotalReviewsIncrementer) {}

	async on(event: ProductReviewCreatedDomainEvent): Promise<void> {
		await this.incrementer.increment(event.userId);
	}

	subscribedTo(): DomainEventClass[] {
		return [ProductReviewCreatedDomainEvent];
	}

	name(): string {
		return "codely.retention.increment_retention_user_total_reviews_on_product_review_created";
	}
}
