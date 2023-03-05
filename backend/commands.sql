-- Database:

DROP TABLE users;
DROP TABLE membership_plans;
DROP TABLE studios;
DROP TABLE trainers;
DROP TABLE schedule_types;
DROP TABLE schedules;
DROP TABLE subscriptions;
DROP TABLE bookings;

-- role could be "CUSTOMER", "ADMIN"

CREATE table users ( id serial primary key, name varchar(100), phone_number varchar(20),  email varchar(100), password varchar(100), profile_pic varchar(1000), role varchar(10));

INSERT into users (name, email, password, role) values ('Admin', 'admin@admin.com', 'password', 'ADMIN');
INSERT into users (name, email, password, role) values ('Studio', 'studio@admin.com', 'password', 'STUDIO');

CREATE table membership_plans ( id serial primary key, name varchar(100), price int, picture varchar(1000), terms_and_conditions varchar(10000), payment_frequency varchar(20), expiry_duration int, expiry_duration_unit varchar(100));

CREATE table studios ( id serial primary key, name varchar(100), address varchar(1000), capacity int, picture varchar(1000));

CREATE table trainers ( id serial primary key, name varchar(100));

CREATE table schedule_types ( id serial primary key, name varchar(100));

CREATE table schedules ( id serial primary key, name varchar(1000), start_time varchar(100), end_time varchar(100), schedule_date varchar(100), studio_id int, trainer varchar(100), schedule_type varchar(100));

CREATE table subscriptions ( user_id int, membership_plan_id int, card_number varchar(1000), name varchar(100), cvv varchar(100), expiry varchar(100), billing_address varchar(1000), is_active bool );

CREATE table bookings ( user_id int, schedule_id int, checkin_time int);
