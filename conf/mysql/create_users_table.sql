# Users SCHEMA
# --- !Ups done

CREATE TABLE users (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `email` varchar(255) NOT NULL,
    `username` varchar(255) NOT NULL,
    `avatar_url` varchar(255),
    `created_at` TIMESTAMP DEFAULT now(),
    `updated_at` TIMESTAMP DEFAULT now(),
    PRIMARY KEY(id)
)



# --- !Downs

DROP TABLE users