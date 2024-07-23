#!/bin/bash
set -e

echo "Configuring primary database for replication..."

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE USER replicator WITH REPLICATION ENCRYPTED PASSWORD 'replicatorpass';
EOSQL

echo "Created replicator user"

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" -c "\du replicator"

cat >> "$PGDATA/postgresql.conf" <<EOL
wal_level = replica
max_wal_senders = 10
max_replication_slots = 10
EOL

echo "Updated postgresql.conf"

cat >> "$PGDATA/pg_hba.conf" <<EOL
host replication replicator all md5
EOL

echo "Updated pg_hba.conf"
cat "$PGDATA/pg_hba.conf"

echo "Primary database configuration complete"
