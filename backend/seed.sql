-- Crear tabla temporal para generar 50 números
CREATE TEMPORARY TABLE numbers (n INT);
INSERT INTO numbers (n)
VALUES
(1),(2),(3),(4),(5),(6),(7),(8),(9),(10),
(11),(12),(13),(14),(15),(16),(17),(18),(19),(20),
(21),(22),(23),(24),(25),(26),(27),(28),(29),(30),
(31),(32),(33),(34),(35),(36),(37),(38),(39),(40),
(41),(42),(43),(44),(45),(46),(47),(48),(49),(50);

-- Insertar trabajadores
INSERT INTO workers (name, description, phone, city, image, createdAt, updatedAt)
SELECT
  CONCAT('Carlitos_', n),
  'Trabajo lento pero prolijo',
  CONCAT('243', LPAD(n, 3, '0')),
  CASE
    WHEN n % 4 = 0 THEN 'Casilda'
    WHEN n % 4 = 1 THEN 'Rosario'
    WHEN n % 4 = 2 THEN 'Santa Fe'
  END,
  'https://res.cloudinary.com/dx3hcqjmv/image/upload/v1750436235/servicios/wguc40xbgaqt1gh1rf8p.avif',
  NOW(),
  NOW()
FROM numbers;

-- Insertar 2 categorías aleatorias por trabajador
INSERT INTO worker_category (worker_id, category_id, createdAt, updatedAt)
SELECT
  w.id,
  FLOOR(1 + RAND() * 5),
  NOW(),
  NOW()
FROM workers w
WHERE w.id BETWEEN (SELECT MIN(id) FROM workers) AND (SELECT MIN(id) FROM workers) + 49;

INSERT INTO worker_category (worker_id, category_id, createdAt, updatedAt)
SELECT
  w.id,
  FLOOR(1 + RAND() * 5),
  NOW(),
  NOW()
FROM workers w
WHERE w.id BETWEEN (SELECT MIN(id) FROM workers) AND (SELECT MIN(id) FROM workers) + 49;
