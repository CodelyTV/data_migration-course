REPLICA_CONTAINER="2-high_concurrency_example-8_2_first_importation-postgres-replica-1"

exec_in_container() {
    docker exec -u postgres $REPLICA_CONTAINER bash -c "$1"
}

echo "Desconectando la réplica..."

# Detener PostgreSQL
exec_in_container "pg_ctl stop -D /var/lib/postgresql/data"
# Eliminar la configuración de replicación
exec_in_container "sed -i '/primary_conninfo/d' /var/lib/postgresql/data/postgresql.auto.conf"
exec_in_container "rm -f /var/lib/postgresql/data/standby.signal"

X_MOMENT=$(date -u +"%Y-%m-%dT%H:%M:%SZ")

echo ""
echo "✅ Réplica desconectada"
echo "Momento X: $X_MOMENT"
