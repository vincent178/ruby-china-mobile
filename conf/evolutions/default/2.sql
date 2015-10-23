# Users SCHEMA
# --- !Ups

CREATE TABLE users (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `email` varchar(255) NOT NULL,
    `encrypted_password` varchar(255) NOT NULL,
    `created_at` TIMESTAMP DEFAULT now(),
    `updated_at` TIMESTAMP DEFAULT now(),
    PRIMARY KEY(id)
)


# --- !Downs

DROP TABLE users