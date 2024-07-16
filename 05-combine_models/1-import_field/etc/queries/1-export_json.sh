PGPASSWORD=c0d3ly7v psql -h localhost -p 5432 -U codely -d ecommerce -c "\COPY (SELECT row_to_json(u) FROM shop.users u) TO 'postgres_dump-shop.users.json';"
