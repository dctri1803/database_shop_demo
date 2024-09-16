import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateDiscounts1724329693043 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'discounts',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'discountType',
            type: 'enum',
            enum: ['%', 'fixed'],
            default: `'%'`,
          },
          {
            name: 'discountAmount',
            type: 'integer',
          },
          {
            name: 'expiredAt',
            type: 'datetime',
          },
          {
            name: 'startAt',
            type: 'datetime',
          },
          {
            name: 'discountStatus',
            type: 'enum',
            enum: ['active', 'inactive'],
            default: `'inactive'`,
          },
          {
            name: 'adminId',
            type: 'integer',
          },
        ],
      }),
    );
    await queryRunner.createForeignKey(
      'discounts',
      new TableForeignKey({
        columnNames: ['adminId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('discounts');
  }
}
