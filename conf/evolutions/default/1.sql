# --- Created by Slick DDL
# To stop Slick DDL generation, remove this comment and start using Evolutions

# --- !Ups

create table `report` (`world` VARCHAR(5) NOT NULL,`date` DATE NOT NULL,`detected` INTEGER DEFAULT 0 NOT NULL,`banned` INTEGER DEFAULT 0 NOT NULL,`deleted` INTEGER DEFAULT 0 NOT NULL);
alter table `report` add constraint `pk_entry` primary key(`world`,`date`);

# --- !Downs

ALTER TABLE report DROP PRIMARY KEY;
drop table `report`;

