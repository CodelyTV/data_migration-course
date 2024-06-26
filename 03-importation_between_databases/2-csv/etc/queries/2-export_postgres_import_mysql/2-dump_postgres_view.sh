PGPASSWORD=c0d3ly7v pg_dump -h localhost -p 5432 -U codely -t "shop.retention__users" ecommerce -F p --file=retention__users.sql

# Desde Postgres 13 las views y las materializadas no exportan datos
