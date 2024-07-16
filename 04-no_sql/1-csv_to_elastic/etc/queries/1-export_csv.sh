PGPASSWORD=c0d3ly7v psql -h localhost -p 5432 -U codely -d ecommerce -c "\COPY shop.users TO 'postgres_dump-shop.users.csv' WITH (FORMAT CSV);"
