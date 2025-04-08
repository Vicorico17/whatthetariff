-- Clear existing data
TRUNCATE TABLE tariffs;

-- Insert initial tariff data
INSERT INTO tariffs (country, tariff_name, tariff_rate, description, effective_date, status) VALUES
-- Global baseline tariff
('All Countries', 'Global Baseline Reciprocal Tariff', 10.0, 'Baseline tariff rate for all countries unless specified otherwise', '2025-04-05', 'active'),
('All Countries', 'Secondary Oil Import Tariff', 25.0, 'Tariff on all products from countries that import Venezuelan oil', '2025-03-30', 'active'),
('All Countries', 'Oil Sanctions Tariff', 50.0, 'Tariff on all products from countries that import Iranian or Russian oil', '2025-03-30', 'active'),

-- Country-specific tariffs
('Algeria', 'Standard Reciprocal Tariff', 30.0, 'Standard reciprocal tariff on all products', '2025-04-09', 'active'),
('Angola', 'Standard Reciprocal Tariff', 32.0, 'Standard reciprocal tariff on all products', '2025-04-09', 'active'),
('Bangladesh', 'Standard Reciprocal Tariff', 37.0, 'Standard reciprocal tariff on all products', '2025-04-09', 'active'),
('Bosnia and Herzegovina', 'Standard Reciprocal Tariff', 36.0, 'Standard reciprocal tariff on all products', '2025-04-09', 'active'),
('Botswana', 'Standard Reciprocal Tariff', 38.0, 'Standard reciprocal tariff on all products', '2025-04-09', 'active'),
('Brunei', 'Standard Reciprocal Tariff', 24.0, 'Standard reciprocal tariff on all products', '2025-04-09', 'active'),
('Cambodia', 'Standard Reciprocal Tariff', 49.0, 'Standard reciprocal tariff on all products', '2025-04-09', 'active'),
('Cameroon', 'Standard Reciprocal Tariff', 12.0, 'Standard reciprocal tariff on all products', '2025-04-09', 'active'),

-- Canada special tariffs
('Canada', 'USMCA Duty Free', 0.0, 'Goods entered duty free under USMCA', '2025-03-07', 'active'),
('Canada', 'Energy Resources Tariff', 10.0, 'Tariff on energy and energy resources', '2025-03-07', 'active'),
('Canada', 'Non-USMCA Potash Tariff', 10.0, 'Tariff on potash not covered by USMCA', '2025-03-07', 'active'),
('Canada', 'Standard Products Tariff', 25.0, 'Tariff on all other products', '2025-03-07', 'active'),
('Canada', 'Dairy and Lumber Tariff', 250.0, 'Special tariff on dairy products and lumber', '2025-03-07', 'active'),

-- China tariffs
('China', 'Standard Reciprocal Tariff', 34.0, 'Standard reciprocal tariff including Hong Kong and Macau goods', '2025-04-09', 'active'),
('China', 'Base Product Tariff', 20.0, 'Base tariff on all products including Hong Kong goods', '2025-02-04', 'active'),
('China', 'Enhanced Product Tariff', 50.0, 'Enhanced tariff on all products', '2025-04-09', 'active'),

-- Additional major economies
('European Union', 'Standard Reciprocal Tariff', 20.0, 'Standard reciprocal tariff on all products', '2025-04-09', 'active'),
('India', 'Standard Reciprocal Tariff', 27.0, 'Standard reciprocal tariff on all products', '2025-04-09', 'active'),
('Japan', 'Standard Reciprocal Tariff', 24.0, 'Standard reciprocal tariff on all products', '2025-04-09', 'active'),
('South Korea', 'Standard Reciprocal Tariff', 26.0, 'Standard reciprocal tariff on all products', '2025-04-09', 'active'),
('United Kingdom', 'Pending DST Investigation', 0.0, 'Tariff pending Digital Services Tax investigation', '2025-02-21', 'inactive'),

-- Southeast Asian countries
('Vietnam', 'Standard Reciprocal Tariff', 46.0, 'Standard reciprocal tariff on all products', '2025-04-09', 'active'),
('Thailand', 'Standard Reciprocal Tariff', 37.0, 'Standard reciprocal tariff on all products', '2025-04-09', 'active'),
('Malaysia', 'Standard Reciprocal Tariff', 24.0, 'Standard reciprocal tariff on all products', '2025-04-09', 'active'),
('Indonesia', 'Standard Reciprocal Tariff', 32.0, 'Standard reciprocal tariff on all products', '2025-04-09', 'active'),

-- Other significant trading partners
('Mexico', 'USMCA Duty Free', 0.0, 'Goods entered duty free under USMCA', '2025-03-07', 'active'),
('Mexico', 'Non-USMCA Potash', 10.0, 'Tariff on potash not covered by USMCA', '2025-03-07', 'active'),
('Mexico', 'Standard Products', 25.0, 'Tariff on all other products', '2025-03-07', 'active'),
('Switzerland', 'Standard Reciprocal Tariff', 32.0, 'Standard reciprocal tariff on all products', '2025-04-09', 'active'),
('Taiwan', 'Standard Reciprocal Tariff', 32.0, 'Standard reciprocal tariff on all products', '2025-04-09', 'active'); 