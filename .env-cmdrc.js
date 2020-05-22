const typeorm = {
  TYPEORM_CONNECTION: "postgres",
  TYPEORM_DATABASE: "db",
  TYPEORM_HOST: "127.0.0.1",
  TYPEORM_PORT: 1111,
  TYPEORM_SYNCHRONIZE: false,
  TYPEORM_USERNAME: "postgres",
  TYPEORM_PASSWORD: "pass",
  TYPEORM_ENTITIES: "src/entities/*.ts",
  TYPEORM_MIGRATIONS: "src/migration/*.ts",
  TYPEORM_MIGRATIONS_DIR: "src/migration",
  TYPEORM_ENTITIES_DIR: "src/entities",
  TYPEORM_MAX_QUERY_EXECUTION_TIME: 500,
};

module.exports = {
  defaults: {
    ...typeorm,
  },
};
