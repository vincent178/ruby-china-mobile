#  SCHEMA
# --- !Ups done

CREATE TABLE scopes (
    `id` INT(11) NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `created_at` TIMESTAMP DEFAULT now(),
    `updated_at` TIMESTAMP DEFAULT now(),
    PRIMARY KEY(id)
);

CREATE TABLE roles (
    `id` INT(11) NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `created_at` TIMESTAMP DEFAULT now(),
    `updated_at` TIMESTAMP DEFAULT now(),
    PRIMARY KEY(id)
);

CREATE TABLE scope_role (
    `id` INT(11) NOT NULL AUTO_INCREMENT,
    `scope_id` INT(11) NOT NULL,
    `role_id` INT(11) NOT NULL,
    `created_at` TIMESTAMP DEFAULT now(),
    `updated_at` TIMESTAMP DEFAULT now(),
    PRIMARY KEY(id)
);

# --- !Downs

DROP TABLE scopes
DROP TABLE roles
DROP TABLE scope_role