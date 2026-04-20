-- Schema
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(20) NOT NULL CHECK (role IN ('admin', 'agent')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE fields (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  crop_type VARCHAR(100) NOT NULL,
  planting_date DATE NOT NULL,
  stage VARCHAR(20) NOT NULL DEFAULT 'planted' CHECK (stage IN ('planted', 'growing', 'ready', 'harvested')),
  agent_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE field_updates (
  id SERIAL PRIMARY KEY,
  field_id INTEGER NOT NULL REFERENCES fields(id) ON DELETE CASCADE,
  agent_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  stage VARCHAR(20) NOT NULL CHECK (stage IN ('planted', 'growing', 'ready', 'harvested')),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Seed demo users (passwords are bcrypt of "password123")
INSERT INTO users (name, email, password, role) VALUES
  ('Admin User', 'admin@smartseason.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin'),
  ('Alice Agent', 'alice@smartseason.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'agent'),
  ('Bob Agent', 'bob@smartseason.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'agent');

INSERT INTO fields (name, crop_type, planting_date, stage, agent_id) VALUES
  ('Kiambu Plot A', 'Maize', '2025-01-10', 'growing', 2),
  ('Nakuru Field 1', 'Beans', '2025-02-01', 'planted', 2),
  ('Meru Farm East', 'Tomatoes', '2024-11-15', 'ready', 3),
  ('Kisumu Block 3', 'Sorghum', '2024-09-01', 'harvested', 3);
