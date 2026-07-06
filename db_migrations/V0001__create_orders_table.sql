CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    comment TEXT,
    ip_address VARCHAR(64),
    user_agent TEXT,
    os_info VARCHAR(255),
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);