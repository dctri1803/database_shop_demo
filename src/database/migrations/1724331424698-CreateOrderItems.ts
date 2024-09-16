import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateOrderItems1724331424698 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'orderItems',
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
            name: 'quantity',
            type: 'integer',
          },
          {
            name: 'price',
            type: 'integer',
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
            name: 'discountId',
            type: 'integer',
          },
          {
            name: 'orderId',
            type: ' integer',
          },
          {
            name: 'productId',
            type: ' integer',
          },
        ],
      }),
    );
    await queryRunner.createForeignKey(
      'orderItems',
      new TableForeignKey({
        columnNames: ['discountId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'discounts',
        onDelete: 'CASCADE',
      }),
    );
    await queryRunner.createForeignKey(
      'orderItems',
      new TableForeignKey({
        columnNames: ['orderId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'orders',
        onDelete: 'CASCADE',
      }),
    );
    await queryRunner.createForeignKey(
      'orderItems',
      new TableForeignKey({
        columnNames: ['productId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'products',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('orderItems');
  }
}
