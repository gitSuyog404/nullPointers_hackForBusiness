-- Create database if it doesn't exist
CREATE DATABASE IF NOT EXISTS food_rescue;

-- Use the database
USE food_rescue;

-- Drop tables if they exist (in correct order due to foreign key constraints)
DROP TABLE IF EXISTS order_item;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS food_item;
DROP TABLE IF EXISTS delivery_rider;
DROP TABLE IF EXISTS restaurant;
DROP TABLE IF EXISTS customer;
DROP TABLE IF EXISTS users;

-- Users table (base class)
CREATE TABLE users (
                       id BIGINT AUTO_INCREMENT PRIMARY KEY,
                       name VARCHAR(255),
                       email VARCHAR(255) UNIQUE,
                       password VARCHAR(255),
                       phone VARCHAR(255) UNIQUE,
                       role VARCHAR(50),
                       status BOOLEAN NOT NULL DEFAULT true
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Customer table (extends Users)
CREATE TABLE customer (
                          id BIGINT PRIMARY KEY,
                          address VARCHAR(255),
                          CONSTRAINT fk_customer_user
                              FOREIGN KEY (id) REFERENCES users(id)
                                  ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Restaurant table (extends Users)
CREATE TABLE restaurant (
                            id BIGINT PRIMARY KEY,
                            address VARCHAR(255),
                            registration_number VARCHAR(255),
                            CONSTRAINT fk_restaurant_user
                                FOREIGN KEY (id) REFERENCES users(id)
                                    ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- DeliveryRider table (extends Users)
CREATE TABLE delivery_rider (
                                id BIGINT PRIMARY KEY,
                                vehicle_number VARCHAR(255),
                                license_number VARCHAR(255),
                                CONSTRAINT fk_rider_user
                                    FOREIGN KEY (id) REFERENCES users(id)
                                        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- FoodItem table
CREATE TABLE food_item (
                           id BIGINT AUTO_INCREMENT PRIMARY KEY,
                           name VARCHAR(255),
                           description TEXT,
                           quantity INT,
                           price DOUBLE,
                           available BOOLEAN,
                           expiry_time DATETIME,
                           restaurant_id BIGINT,
                           CONSTRAINT fk_food_restaurant
                               FOREIGN KEY (restaurant_id) REFERENCES restaurant(id)
                                   ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Orders table
CREATE TABLE orders (
                        id BIGINT AUTO_INCREMENT PRIMARY KEY,
                        order_time DATETIME,
                        status VARCHAR(50),
                        customer_id BIGINT,
                        restaurant_id BIGINT,
                        rider_id BIGINT,
                        CONSTRAINT fk_order_customer
                            FOREIGN KEY (customer_id) REFERENCES customer(id),
                        CONSTRAINT fk_order_restaurant
                            FOREIGN KEY (restaurant_id) REFERENCES restaurant(id),
                        CONSTRAINT fk_order_rider
                            FOREIGN KEY (rider_id) REFERENCES delivery_rider(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- OrderItem table
CREATE TABLE order_item (
                            id BIGINT AUTO_INCREMENT PRIMARY KEY,
                            quantity INT,
                            food_item_id BIGINT,
                            orders_id BIGINT,
                            CONSTRAINT fk_orderitem_food
                                FOREIGN KEY (food_item_id) REFERENCES food_item(id),
                            CONSTRAINT fk_orderitem_order
                                FOREIGN KEY (orders_id) REFERENCES orders(id)
                                    ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create indexes for better performance
CREATE INDEX idx_user_email ON users(email);
CREATE INDEX idx_user_phone ON users(phone);
CREATE INDEX idx_food_restaurant ON food_item(restaurant_id);
CREATE INDEX idx_order_customer ON orders(customer_id);
CREATE INDEX idx_order_restaurant ON orders(restaurant_id);
CREATE INDEX idx_order_rider ON orders(rider_id);