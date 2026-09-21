CREATE DATABASE IF NOT EXISTS nep_living CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE nep_living;
CREATE TABLE users (id INT PRIMARY KEY AUTO_INCREMENT, name VARCHAR(120) NOT NULL, email VARCHAR(180) UNIQUE NOT NULL, password_hash VARCHAR(255) NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);
CREATE TABLE products (id INT PRIMARY KEY AUTO_INCREMENT, name VARCHAR(180) NOT NULL, slug VARCHAR(180) UNIQUE NOT NULL, category VARCHAR(80), price DECIMAL(12,2), image_url TEXT, description TEXT, featured BOOLEAN DEFAULT FALSE);
CREATE TABLE orders (id INT PRIMARY KEY AUTO_INCREMENT, user_id INT, status VARCHAR(40) DEFAULT 'pending', total DECIMAL(12,2), created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (user_id) REFERENCES users(id));
INSERT INTO products (name, slug, category, price, image_url, description, featured) VALUES
('Ghế Lounge Arco','ghe-lounge-arco','Ghế',24800000,'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=1000&q=85','Da thuộc Ý, gỗ óc chó nguyên khối.',true),
('Bàn trà Nép','ban-tra-nep','Bàn',18900000,'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&w=1000&q=85','Đá travertine tự nhiên, hoàn thiện mờ.',true),
('Đèn sàn Halo','den-san-halo','Đèn',7200000,'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1000&q=85','Ánh sáng ấm 2700K, thép sơn tĩnh điện.',true),
('Sofa Mây','sofa-may','Sofa',32600000,'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1000&q=85','Sợi linen dệt tay, đệm lông vũ.',true);
