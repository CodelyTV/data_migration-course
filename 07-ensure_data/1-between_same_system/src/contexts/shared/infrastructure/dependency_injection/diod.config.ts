import { ContainerBuilder } from "diod";

import { SendWelcomeEmailOnUserRegistered } from "../../../retention/email/application/send_welcome_email/SendWelcomeEmailOnUserRegistered";
import { WelcomeEmailSender } from "../../../retention/email/application/send_welcome_email/WelcomeEmailSender";
import { EmailSender } from "../../../retention/email/domain/EmailSender";
import { FakeEmailSender } from "../../../retention/email/infrastructure/FakeEmailSender";
import { CreateRetentionUserOnUserRegistered } from "../../../retention/user/application/create/CreateRetentionUserOnUserRegistered";
import { RetentionUserCreator } from "../../../retention/user/application/create/RetentionUserCreator";
import { RetentionUserFinder } from "../../../retention/user/application/find/RetentionUserFinder";
import { IncrementRetentionUserTotalReviewsOnProductReviewCreated } from "../../../retention/user/application/increment_total_reviews/IncrementRetentionUserTotalReviewsOnProductReviewCreated";
import { RetentionUserTotalReviewsIncrementer } from "../../../retention/user/application/increment_total_reviews/RetentionUserTotalReviewsIncrementer";
import { RetentionUserLastActivityUpdater } from "../../../retention/user/application/update_last_activity_date/RetentionUserLastActivityUpdater";
import { UpdateLastActivityDateOnUserUpdated } from "../../../retention/user/application/update_last_activity_date/UpdateLastActivityDateOnUserUpdated";
import { RetentionUserRepository } from "../../../retention/user/domain/RetentionUserRepository";
import { PostgresRetentionUserRepository } from "../../../retention/user/infrastructure/PostgresRetentionUserRepository";
import { ProductReviewCreator } from "../../../shop/product_reviews/application/create/ProductReviewCreator";
import { ProductReviewRepository } from "../../../shop/product_reviews/domain/ProductReviewRepository";
import { PostgresProductReviewRepository } from "../../../shop/product_reviews/infrastructure/PostgresProductReviewRepository";
import { ProductFinder } from "../../../shop/products/application/find/ProductFinder";
import { ProductLatestTopReviewsUpdater } from "../../../shop/products/application/update_latest_top_reviews/ProductLatestTopReviewsUpdater";
import { UpdateLatestTopReviewsOnProductReviewCreated } from "../../../shop/products/application/update_latest_top_reviews/UpdateLatestTopReviewsOnProductReviewCreated";
import { DomainProductFinder } from "../../../shop/products/domain/DomainProductFinder";
import { ProductRepository } from "../../../shop/products/domain/ProductRepository";
import { PostgresProductRepository } from "../../../shop/products/infrastructure/PostgresProductRepository";
import { UserFinder } from "../../../shop/users/application/find/UserFinder";
import { UserRegistrar } from "../../../shop/users/application/registrar/UserRegistrar";
import { UserEmailUpdater } from "../../../shop/users/application/update_email/UserEmailUpdater";
import { DomainUserFinder } from "../../../shop/users/domain/DomainUserFinder";
import { UserRepository } from "../../../shop/users/domain/UserRepository";
import { PostgresUserRepository } from "../../../shop/users/infrastructure/PostgresUserRepository";
import { EventBus } from "../../domain/event/EventBus";
import { UuidGenerator } from "../../domain/UuidGenerator";
import { DomainEventFailover } from "../event_bus/failover/DomainEventFailover";
import { RabbitMqConnection } from "../event_bus/rabbitmq/RabbitMqConnection";
import { RabbitMqEventBus } from "../event_bus/rabbitmq/RabbitMqEventBus";
import { OfficialUuidGenerator } from "../OfficialUuidGenerator";
import { PostgresConnection } from "../persistence/PostgresConnection";

const builder = new ContainerBuilder();

// Shared
builder.register(UuidGenerator).use(OfficialUuidGenerator);

builder.registerAndUse(PostgresConnection).asSingleton();

builder.registerAndUse(RabbitMqConnection).asSingleton();
builder.registerAndUse(DomainEventFailover);
builder.register(EventBus).use(RabbitMqEventBus).asSingleton();

// Shop context
builder.register(ProductRepository).use(PostgresProductRepository);
builder.registerAndUse(ProductFinder);
builder.registerAndUse(DomainProductFinder);

builder.registerAndUse(UpdateLatestTopReviewsOnProductReviewCreated).addTag("subscriber");
builder.registerAndUse(ProductLatestTopReviewsUpdater);

builder.register(ProductReviewRepository).use(PostgresProductReviewRepository);
builder.registerAndUse(ProductReviewCreator);

builder.register(UserRepository).use(PostgresUserRepository);
builder.registerAndUse(UserFinder);
builder.registerAndUse(DomainUserFinder);
builder.registerAndUse(UserRegistrar);
builder.registerAndUse(UserEmailUpdater);

// Retention context
builder.register(EmailSender).use(FakeEmailSender);
builder.registerAndUse(SendWelcomeEmailOnUserRegistered).addTag("subscriber");
builder.registerAndUse(WelcomeEmailSender);

builder.register(RetentionUserRepository).use(PostgresRetentionUserRepository);
builder.registerAndUse(RetentionUserFinder);

builder.registerAndUse(UpdateLastActivityDateOnUserUpdated).addTag("subscriber");
builder.registerAndUse(RetentionUserLastActivityUpdater);

builder.registerAndUse(CreateRetentionUserOnUserRegistered).addTag("subscriber");
builder.registerAndUse(RetentionUserCreator);

builder
	.registerAndUse(IncrementRetentionUserTotalReviewsOnProductReviewCreated)
	.addTag("subscriber");
builder.registerAndUse(RetentionUserTotalReviewsIncrementer);

export const container = builder.build();
