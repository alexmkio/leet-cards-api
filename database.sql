CREATE TABLE IF NOT EXISTS cards (
	id serial primary key NOT NULL,
	question text NOT NULL,
	answer text NOT NULL,
	side text NOT NULL,
	categories text[] NOT NULL
);

INSERT INTO cards (
  question,
  answer,
  side,
  categories
) VALUES (
  'Is an array an object?',
  'Yes',
  'FE',
  '{"JavaScript"}'
);