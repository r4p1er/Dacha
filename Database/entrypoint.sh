/opt/mssql/bin/sqlservr & pid=$! & /usr/src/app/create-sqluser.sh
wait $pid