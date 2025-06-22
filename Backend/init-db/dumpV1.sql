-- Food Rescue Backend MySQL Schema
-- Drop tables if they exist (in correct order to handle foreign key constraints)
DROP TABLE IF EXISTS order_item;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS food_item;
DROP TABLE IF EXISTS delivery_rider;
DROP TABLE IF EXISTS restaurant;
DROP TABLE IF EXISTS customer;
DROP TABLE IF EXISTS user;

-- Create User table (parent table for inheritance)
CREATE TABLE user (
                      id BIGINT AUTO_INCREMENT PRIMARY KEY,
                      name VARCHAR(255),
                      email VARCHAR(255),
                      password VARCHAR(255),
                      phone VARCHAR(255),
                      role ENUM('CUSTOMER', 'RESTAURANT', 'DELIVERY_RIDER', 'ADMIN') NOT NULL,
                      status BOOLEAN NOT NULL DEFAULT TRUE
);

-- Create Customer table (inherits from User - JOINED strategy)
CREATE TABLE customer (
                          id BIGINT PRIMARY KEY,
                          address VARCHAR(500),
                          FOREIGN KEY (id) REFERENCES user(id) ON DELETE CASCADE
);

-- Create Restaurant table (inherits from User - JOINED strategy)
CREATE TABLE restaurant (
                            id BIGINT PRIMARY KEY,
                            address VARCHAR(500),
                            registration_number VARCHAR(255),
                            FOREIGN KEY (id) REFERENCES user(id) ON DELETE CASCADE
);

-- Create DeliveryRider table (inherits from User - JOINED strategy)
CREATE TABLE delivery_rider (
                                id BIGINT PRIMARY KEY,
                                vehicle_number VARCHAR(255),
                                license_number VARCHAR(255),
                                FOREIGN KEY (id) REFERENCES user(id) ON DELETE CASCADE
);

-- Create FoodItem table
CREATE TABLE food_item (
                           id BIGINT AUTO_INCREMENT PRIMARY KEY,
                           name VARCHAR(255),
                           description TEXT,
                           quantity INT,
                           price DOUBLE,
                           available BOOLEAN,
                           expiry_time DATETIME,
                           restaurant_id BIGINT,
                           FOREIGN KEY (restaurant_id) REFERENCES restaurant(id) ON DELETE CASCADE
);

-- Create Orders table
CREATE TABLE orders (
                        id BIGINT AUTO_INCREMENT PRIMARY KEY,
                        order_time DATETIME,
                        status ENUM('PENDING', 'CONFIRMED', 'PREPARING', 'READY_FOR_PICKUP', 'OUT_FOR_DELIVERY', 'DELIVERED', 'CANCELLED') NOT NULL,
                        customer_id BIGINT,
                        restaurant_id BIGINT,
                        rider_id BIGINT,
                        FOREIGN KEY (customer_id) REFERENCES customer(id) ON DELETE SET NULL,
                        FOREIGN KEY (restaurant_id) REFERENCES restaurant(id) ON DELETE SET NULL,
                        FOREIGN KEY (rider_id) REFERENCES delivery_rider(id) ON DELETE SET NULL
);

-- Create OrderItem table
CREATE TABLE order_item (
                            id BIGINT AUTO_INCREMENT PRIMARY KEY,
                            quantity INT,
                            food_item_id BIGINT,
                            orders_id BIGINT,
                            FOREIGN KEY (food_item_id) REFERENCES food_item(id) ON DELETE CASCADE,
                            FOREIGN KEY (orders_id) REFERENCES orders(id) ON DELETE CASCADE
);

-- Create indexes for better performance
CREATE INDEX idx_user_email ON user(email);
CREATE INDEX idx_user_role ON user(role);
CREATE INDEX idx_food_item_restaurant ON food_item(restaurant_id);
CREATE INDEX idx_food_item_available ON food_item(available);
CREATE INDEX idx_orders_customer ON orders(customer_id);
CREATE INDEX idx_orders_restaurant ON orders(restaurant_id);
CREATE INDEX idx_orders_rider ON orders(rider_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_order_item_food_item ON order_item(food_item_id);
CREATE INDEX idx_order_item_orders ON order_item(orders_id);

-- Sample data insertion (optional)
-- Insert sample users
INSERT INTO user (name, email, password, phone, role, status) VALUES
                                                                  ('John Doe', 'john.customer@email.com', 'password123', '1234567890', 'CUSTOMER', TRUE),
                                                                  ('Pizza Palace', 'pizza.palace@email.com', 'password123', '0987654321', 'RESTAURANT', TRUE),
                                                                  ('Mike Rider', 'mike.rider@email.com', 'password123', '1122334455', 'DELIVERY_RIDER', TRUE);

-- Insert customer data
INSERT INTO customer (id, address) VALUES
    (1, '123 Main Street, City Center');

-- Insert restaurant data
INSERT INTO restaurant (id, address, registration_number) VALUES
    (2, '456 Food Street, Downtown', 'REG123456789');

-- Insert delivery rider data
INSERT INTO delivery_rider (id, vehicle_number, license_number) VALUES
    (3, 'ABC-1234', 'DL123456789');

-- Insert sample food items
INSERT INTO food_item (name, description, quantity, price, available, expiry_time, restaurant_id) VALUES
                                                                                                      ('Margherita Pizza', 'Fresh tomato sauce, mozzarella cheese, basil', 5, 12.99, TRUE, '2024-12-31 23:59:59', 2),
                                                                                                      ('Pepperoni Pizza', 'Tomato sauce, mozzarella, pepperoni', 3, 15.99, TRUE, '2024-12-31 23:59:59', 2),
                                                                                                      ('Caesar Salad', 'Fresh romaine lettuce, parmesan, croutons', 8, 8.99, TRUE, '2024-12-30 23:59:59', 2);

-- Insert sample order
INSERT INTO orders (order_time, status, customer_id, restaurant_id, rider_id) VALUES
    (NOW(), 'PENDING', 1, 2, NULL);

-- Insert sample order items
INSERT INTO order_item (quantity, food_item_id, orders_id) VALUES
                                                               (2, 1, 1),
                                                               (1, 3, 1);