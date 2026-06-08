
DROP POLICY "Anyone can submit an enquiry" ON public.enquiries;

CREATE POLICY "Anyone can submit an enquiry"
ON public.enquiries FOR INSERT
TO anon, authenticated
WITH CHECK (
  char_length(name) BETWEEN 1 AND 120
  AND char_length(phone) BETWEEN 5 AND 30
  AND char_length(email) BETWEEN 3 AND 255
  AND char_length(service_type) BETWEEN 1 AND 60
  AND char_length(pickup) BETWEEN 1 AND 255
  AND (drop_location IS NULL OR char_length(drop_location) <= 255)
  AND (notes IS NULL OR char_length(notes) <= 2000)
  AND status = 'pending'
);
