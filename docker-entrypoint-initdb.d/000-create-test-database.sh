#!/bin/bash -eu

mysql=( mysql --protocol=socket -uroot -p"${MYSQL_ROOT_PASSWORD}" )

if [ -n "$MYSQL_TEST_DATABASE" ]; then
  "${mysql[@]}" <<-EOSQL
      CREATE DATABASE IF NOT EXISTS \`$MYSQL_TEST_DATABASE\`;
      GRANT ALL ON \`$MYSQL_TEST_DATABASE\`.* TO '$MYSQL_USER'@'%';
EOSQL
fi
