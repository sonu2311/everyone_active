-- Database:

DROP TABLE users;

-- role could be "CUSTOMER", "ADMIN"

CREATE table users ( id serial primary key, name varchar(100), phone_number varchar(20),  email varchar(100), password varchar(100), profile_pic varchar(1000), role varchar(10));

INSERT into users (name, email, password, role) values ('Admin', 'admin@admin.com', 'password', 'ADMIN');

CREATE table membership_plans ( id serial primary key, name varchar(100), price int, picture varchar(1000), terms_and_conditions varchar(10000), payment_frequency varchar(20), expiry_duration int, expiry_duration_unit varchar(100));

