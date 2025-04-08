-- Clear existing data
TRUNCATE TABLE tariffs;

-- Insert initial tariff data
INSERT INTO tariffs (country, tariff_name, tariff_rate, description, effective_date, status) VALUES
-- Global baseline tariff
('All Countries', 'Global Baseline Reciprocal Tariff', 10.0, 'Baseline tariff rate for all countries unless specified otherwise', '2025-04-05', 'implemented'),
('All Countries', 'Secondary Oil Import Tariff', 25.0, 'Tariff on all products from countries that import Venezuelan oil', '2025-03-30', 'threatened'),
('All Countries', 'Oil Sanctions Tariff', 50.0, 'Tariff on all products from countries that import Iranian or Russian oil', '2025-03-30', 'threatened'),

-- Country-specific tariffs
('Algeria', 'Standard Reciprocal Tariff', 30.0, 'Standard reciprocal tariff on all products', '2025-04-09', 'implemented'),
('Angola', 'Standard Reciprocal Tariff', 32.0, 'Standard reciprocal tariff on all products', '2025-04-09', 'implemented'),
('Bangladesh', 'Standard Reciprocal Tariff', 37.0, 'Standard reciprocal tariff on all products', '2025-04-09', 'implemented'),
('Bosnia and Herzegovina', 'Standard Reciprocal Tariff', 36.0, 'Standard reciprocal tariff on all products', '2025-04-09', 'implemented'),
('Botswana', 'Standard Reciprocal Tariff', 38.0, 'Standard reciprocal tariff on all products', '2025-04-09', 'implemented'),
('Brunei', 'Standard Reciprocal Tariff', 24.0, 'Standard reciprocal tariff on all products', '2025-04-09', 'implemented'),
('Cambodia', 'Standard Reciprocal Tariff', 49.0, 'Standard reciprocal tariff on all products', '2025-04-09', 'implemented'),
('Cameroon', 'Standard Reciprocal Tariff', 12.0, 'Standard reciprocal tariff on all products', '2025-04-09', 'implemented'),

-- Canada special tariffs
('Canada', 'USMCA Duty Free', 0.0, 'Goods entered duty free under USMCA', '2025-03-07', 'implemented'),
('Canada', 'Energy Resources Tariff', 10.0, 'Tariff on energy and energy resources', '2025-03-07', 'implemented'),
('Canada', 'Non-USMCA Potash Tariff', 10.0, 'Tariff on potash not covered by USMCA', '2025-03-07', 'implemented'),
('Canada', 'Standard Products Tariff', 25.0, 'Tariff on all other products', '2025-03-07', 'implemented'),
('Canada', 'Dairy and Lumber Tariff', 250.0, 'Special tariff on dairy products and lumber', '2025-03-07', 'threatened'),

-- China tariffs
('China', 'Standard Reciprocal Tariff', 34.0, 'Standard reciprocal tariff including Hong Kong and Macau goods', '2025-04-09', 'implemented'),
('China', 'Base Product Tariff', 20.0, 'Base tariff on all products including Hong Kong goods', '2025-02-04', 'implemented'),
('China', 'Enhanced Product Tariff', 50.0, 'Enhanced tariff on all products', '2025-04-09', 'threatened'),

-- Additional major economies
('European Union', 'Standard Reciprocal Tariff', 20.0, 'Standard reciprocal tariff on all products', '2025-04-09', 'implemented'),
('India', 'Standard Reciprocal Tariff', 27.0, 'Standard reciprocal tariff on all products', '2025-04-09', 'implemented'),
('Japan', 'Standard Reciprocal Tariff', 24.0, 'Standard reciprocal tariff on all products', '2025-04-09', 'implemented'),
('South Korea', 'Standard Reciprocal Tariff', 26.0, 'Standard reciprocal tariff on all products', '2025-04-09', 'implemented'),
('United Kingdom', 'Pending DST Investigation', 0.0, 'Tariff pending Digital Services Tax investigation', '2025-02-21', 'threatened'),

-- Southeast Asian countries
('Vietnam', 'Standard Reciprocal Tariff', 46.0, 'Standard reciprocal tariff on all products', '2025-04-09', 'implemented'),
('Thailand', 'Standard Reciprocal Tariff', 37.0, 'Standard reciprocal tariff on all products', '2025-04-09', 'implemented'),
('Malaysia', 'Standard Reciprocal Tariff', 24.0, 'Standard reciprocal tariff on all products', '2025-04-09', 'implemented'),
('Indonesia', 'Standard Reciprocal Tariff', 32.0, 'Standard reciprocal tariff on all products', '2025-04-09', 'implemented'),

-- Other significant trading partners
('Mexico', 'USMCA Duty Free', 0.0, 'Goods entered duty free under USMCA', '2025-03-07', 'implemented'),
('Mexico', 'Non-USMCA Potash', 10.0, 'Tariff on potash not covered by USMCA', '2025-03-07', 'implemented'),
('Mexico', 'Standard Products', 25.0, 'Tariff on all other products', '2025-03-07', 'implemented'),
('Switzerland', 'Standard Reciprocal Tariff', 32.0, 'Standard reciprocal tariff on all products', '2025-04-09', 'implemented'),
('Taiwan', 'Standard Reciprocal Tariff', 32.0, 'Standard reciprocal tariff on all products', '2025-04-09', 'implemented');

-- Update the check constraint on the status column
ALTER TABLE tariffs
DROP CONSTRAINT IF EXISTS tariffs_status_check;

ALTER TABLE tariffs
ADD CONSTRAINT tariffs_status_check CHECK (status IN ('implemented', 'threatened', 'active', 'inactive')); 