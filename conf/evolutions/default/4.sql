#  nodes SCHEMA
# --- !Ups

CREATE TABLE nodes (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `name` varchar(255) NOT NULL,
    `summary` varchar(255) NOT NULL,
    `topics_count` int(11) NOT NULL DEFAULT 0,
    `created_at` TIMESTAMP DEFAULT now(),
    `updated_at` TIMESTAMP DEFAULT now(),
    PRIMARY KEY(id)
)


# --- !Downs

DROP TABLE nodes