-- Création des types nécessaires
CREATE TYPE transaction_type AS ENUM ('payment', 'refund', 'payout');

-- Table USERS
CREATE TABLE IF NOT EXISTS users
(
    id                UUID PRIMARY KEY                  DEFAULT gen_random_uuid(),
    email             VARCHAR(255)             NOT NULL UNIQUE,
    password_hash     VARCHAR(255)             NOT NULL,
    is_email_verified BOOLEAN                  NOT NULL DEFAULT FALSE,
    first_name        VARCHAR(255)             NOT NULL,
    last_name         VARCHAR(255)             NOT NULL,
    birth_date        TIMESTAMP WITH TIME ZONE NOT NULL,
    is_seller         BOOLEAN                  NOT NULL DEFAULT FALSE,
    validation_token  VARCHAR(255)             NULL,
    created_at        TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at        TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Table CAMPAIGNS
CREATE TABLE IF NOT EXISTS campaigns
(
    id             UUID PRIMARY KEY                  DEFAULT gen_random_uuid(),
    seller_id      UUID                     NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    title          VARCHAR(255)             NOT NULL,
    description    TEXT                     NOT NULL,
    image_urls     TEXT[]                   NOT NULL,
    ticket_price   NUMERIC(10, 2)           NOT NULL CHECK (ticket_price > 0),
    min_tickets    INT                      NOT NULL CHECK (min_tickets > 0),
    allow_overflow BOOLEAN                  NOT NULL DEFAULT FALSE,
    end_date       TIMESTAMP WITH TIME ZONE NOT NULL,
    is_closed      BOOLEAN                  NOT NULL DEFAULT FALSE,
    created_at     TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at     TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Table TICKETS (1 ligne = 1 ticket)
CREATE TABLE IF NOT EXISTS tickets
(
    id           UUID PRIMARY KEY                  DEFAULT gen_random_uuid(),
    campaign_id  UUID                     NOT NULL REFERENCES campaigns (id) ON DELETE CASCADE,
    buyer_id     UUID                     NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    amount_paid  NUMERIC(10, 2)           NOT NULL CHECK (amount_paid >= 0),
    purchased_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Table DRAWS
CREATE TABLE IF NOT EXISTS draws
(
    id                UUID PRIMARY KEY                  DEFAULT gen_random_uuid(),
    campaign_id       UUID                     NOT NULL REFERENCES campaigns (id) ON DELETE CASCADE,
    winning_ticket_id UUID                     REFERENCES tickets (id) ON DELETE SET NULL,
    drawn_at          TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    succeeded         BOOLEAN                  NOT NULL
);

-- Table STRIPE_TRANSACTIONS
CREATE TABLE IF NOT EXISTS stripe_transactions
(
    id                UUID PRIMARY KEY                  DEFAULT gen_random_uuid(),
    campaign_id       UUID                     NOT NULL REFERENCES campaigns (id) ON DELETE CASCADE,
    user_id           UUID                     NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    stripe_charge_id  VARCHAR(255)             NOT NULL,
    type              transaction_type         NOT NULL,
    amount            NUMERIC(10, 2)           NOT NULL CHECK (amount >= 0),
    commission_amount NUMERIC(10, 2)           NOT NULL DEFAULT 0,
    net_amount        NUMERIC(10, 2)           NOT NULL DEFAULT 0,
    created_at        TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Table relationnelle TICKETS_PAYMENTS
CREATE TABLE IF NOT EXISTS ticket_payments
(
    ticket_id             UUID NOT NULL REFERENCES tickets (id) ON DELETE CASCADE,
    stripe_transaction_id UUID NOT NULL REFERENCES stripe_transactions (id) ON DELETE CASCADE,
    PRIMARY KEY (ticket_id, stripe_transaction_id)
);
-- Table souscription
CREATE TABLE IF NOT EXISTS subscribers
(
    id                 UUID PRIMARY KEY   DEFAULT gen_random_uuid(),
    email              TEXT      NOT NULL UNIQUE,
    is_verified        BOOLEAN   NOT NULL DEFAULT FALSE,
    verification_token TEXT,
    created_at         TIMESTAMP NOT NULL DEFAULT NOW()
);