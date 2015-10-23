# Users SCHEMA
# --- !Ups

CREATE TABLE users (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `email` varchar(255) NOT NULL,
    `encrypted_password` varchar(255) NOT NULL,
    `created_at` datetime NOT NULL,
    `updated_at` datetime NOT NULL,
    PRIMARY KEY(id)
)


# --- !Downs

DROP TABLE users