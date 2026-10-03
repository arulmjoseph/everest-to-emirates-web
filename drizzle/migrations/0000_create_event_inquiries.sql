CREATE TABLE public.event_inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL CHECK (char_length(name) BETWEEN 1 AND 100),
  email text NOT NULL CHECK (char_length(email) BETWEEN 3 AND 255),
  participate boolean NOT NULL,
  sponsor boolean NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.event_inquiries TO service_role;
ALTER TABLE public.event_inquiries ENABLE ROW LEVEL SECURITY;