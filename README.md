# PG Test Replica

### Description

Demonstration of replication lag for 1000 queries on a master / slave PostgreSQL 9.6 with TypeOrm.

### Requirement

- node.js
- docker-compose

### Install

`yarn`

### Sync replication

`yarn pg:sync:on`

#### PostgreSQL Config

```
synchronous_commit = on
synchronous_standby_names = walreceiver
```

### Async replication

`yarn pg:sync:off`

#### PostgreSQL Config

```
synchronous_commit = off
synchronous_standby_names = walreceiver
```

### Connect with psql

#### Master

`psql -h localhost -U postgres -p 1111 -d db`

#### Salve

`psql -h localhost -U postgres -p 2222 -d db`

#### Check replication on master

```sql
select usename, application_name, client_addr, backend_start, state, sync_state from pg_stat_replication;
```

### Cleanup

```
docker-compose down && docker volume rm pg-test-replica_postgresql_master_data
```
