total_in_postgres=$(docker exec 2-between_different_systems-7_2_first_importation-postgres-1 psql -U codely -d ecommerce -c "SELECT COUNT(*) AS total FROM shop.users"| head -n3 | tail -n1)
total_in_elastic=$(curl -s -X GET "http://localhost:9200/users/_count" | jq -r '.count')

if [ "$total_in_postgres" -ne "$total_in_elastic" ]; then
  echo "The total number of users is different between Postgres and Elastic"
  echo "Total in postgres: $total_in_postgres"
  echo "Total in elastic: $total_in_elastic"
  exit 1
fi

exit 0
