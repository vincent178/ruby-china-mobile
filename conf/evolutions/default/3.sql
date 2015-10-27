#  SCHEMA
# --- !Ups

CREATE TABLE comments (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `body` varchar(255) NOT NULL,
    `body_html` varchar(255) NOT NULL,
    `user_id` int(11) NOT NULL,
    `created_at` TIMESTAMP DEFAULT now(),
    `updated_at` TIMESTAMP DEFAULT now(),
    PRIMARY KEY(id)
)


# --- !Downs

DROP TABLE comments