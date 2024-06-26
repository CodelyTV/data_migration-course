#!/bin/bash

CSVFILE="postgres_dump-shop.users_with_retention_format.csv"

mysql -h 127.0.0.1 -P 3306 -u root -padminpassword ecommerce <<EOF
LOAD DATA INFILE '/var/lib/mysql/shared/$CSVFILE'
INTO TABLE retention__users
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
(id, email, @last_activity_date, @registration_date)
SET last_activity_date = STR_TO_DATE(@last_activity_date, '%Y-%m-%d %H:%i:%s'),
    registration_date = STR_TO_DATE(@registration_date, '%Y-%m-%d %H:%i:%s');
EOF

echo "🚀 Importado correctamente!"
