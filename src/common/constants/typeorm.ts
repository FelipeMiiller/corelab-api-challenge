export enum DataSource {
  TYPEORM = 'typeorm',
  MEMORY = 'memory',
  REDIS = 'redis',
  POSTGRES = 'postgres',
}

export enum Provider_DATA_SOURCE {
  default = 'DATA_SOURCE',

  tasks = 'TASK_REPOSITORY',
}
