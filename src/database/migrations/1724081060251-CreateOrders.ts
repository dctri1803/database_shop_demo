import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateOrders1724081060251 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'orders',
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
            name: 'buyerName',
            type: 'varchar',
          },
          {
            name: 'buyerPhone',
            type: 'varchar',
          },
          {
            name: 'buyerEmail',
            type: 'varchar',
          },
          {
            name: 'buyerAddress',
            type: 'varchar',
          },
          {
            name: 'status',
            type: 'enum',
            enum: ['pending', 'confirm', 'cancel'],
            default: `'pending'`,
          },
          {
            name: 'userId',
            type: 'integer',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'orders',
      new TableForeignKey({
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('orders');
  }
}
