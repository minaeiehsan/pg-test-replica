import { Logger, QueryRunner } from "typeorm";

export class ModeLogger implements Logger {
  logQuery(query: string, _?: any[], queryRunner?: QueryRunner): string {
    const qr: any = queryRunner;
    const out = `
      Query: ${query}
      Mode: ${qr.mode}
      ${"*".repeat(50)}
      `;
    // console.log(out);
    return out;
  }
  logQueryError(): void {
    return;
  }
  logQuerySlow(): void {
    return;
  }
  logSchemaBuild(): void {
    return;
  }
  logMigration(): void {
    return;
  }
  log(): void {
    return;
  }
}
