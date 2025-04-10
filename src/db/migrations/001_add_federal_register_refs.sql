-- Add Federal Register document reference columns to tariffs table
ALTER TABLE tariffs
ADD COLUMN federal_register_doc_number TEXT,
ADD COLUMN federal_register_citation TEXT,
ADD COLUMN federal_register_url TEXT,
ADD COLUMN federal_register_publication_date DATE;

-- Create an index on the document number for faster lookups
CREATE INDEX idx_tariffs_fr_doc_number ON tariffs(federal_register_doc_number);

-- Add a foreign key-like constraint to ensure doc numbers are unique when present
ALTER TABLE tariffs
ADD CONSTRAINT unique_fr_doc_number UNIQUE (federal_register_doc_number)
DEFERRABLE INITIALLY DEFERRED;

-- Update the existing data to mark it as not having Federal Register references
COMMENT ON COLUMN tariffs.federal_register_doc_number IS 'The Federal Register document number that established this tariff';
COMMENT ON COLUMN tariffs.federal_register_citation IS 'The Federal Register citation (e.g. 85 FR 12345)';
COMMENT ON COLUMN tariffs.federal_register_url IS 'The URL to the Federal Register document';
COMMENT ON COLUMN tariffs.federal_register_publication_date IS 'The publication date of the Federal Register document'; 