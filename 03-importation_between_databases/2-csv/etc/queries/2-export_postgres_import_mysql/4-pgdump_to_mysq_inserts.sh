#!/bin/bash

PG_DUMP_FILE="postgres_dump-shop.users.sql"
MYSQL_INSERT_FILE="mysql_inserts-retention__users.sql"

awk '/^COPY shop.users \(id, name, email, profile_picture, created_at\) FROM stdin;$/,/^\\\.$/' "$PG_DUMP_FILE" |
grep -v 'COPY shop.users' |
grep -v '\\.' |
while IFS=$'\t' read -r id _name email _profile_picture created_at; do
  formatted_date=$(echo "$created_at" | sed -E 's/\..*$/''/')

  echo "INSERT INTO retention__users (id, email, last_activity_date, registration_date) VALUES ('$id', '$email', '$formatted_date', '$formatted_date');" >> "$MYSQL_INSERT_FILE"
done

echo "🚀 Inserts generados"
