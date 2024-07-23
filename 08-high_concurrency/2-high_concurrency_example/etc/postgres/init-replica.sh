#!/bin/bash
set -e

echo "Configuring replica database..."

echo "2-high_concurrency_example-8_2_first_importation-postgres-1:5432:*:replicator:replicatorpass" > ~/.pgpass
chmod 0600 ~/.pgpass

echo "Waiting for primary to be ready..."
until pg_isready -h 2-high_concurrency_example-8_2_first_importation-postgres-1 -U replicator
do
    echo "Waiting for primary database to be ready..."
    sleep 2
done

echo "Primary is ready. Starting base backup..."
rm -rf $PGDATA/*
PGPASSWORD=replicatorpass pg_basebackup -h 2-high_concurrency_example-8_2_first_importation-postgres-1 -D "$PGDATA" -P -U replicator -R -Fp -Xs -v

echo "Base backup completed. Configuring replica..."

cat > "$PGDATA/postgresql.auto.conf" <<EOL
primary_conninfo = 'host=2-high_concurrency_example-8_2_first_importation-postgres-1 port=5432 user=replicator password=replicatorpass'
hot_standby = on
EOL

touch "$PGDATA/standby.signal"

echo "Replica configuration complete"

echo "Contents of postgresql.auto.conf:"
cat "$PGDATA/postgresql.auto.conf"

echo "Checking for standby.signal:"
ls -l "$PGDATA/standby.signal"

echo "Replica initialization script completed."
