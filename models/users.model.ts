import {
  Table,
  Model,
  Column,
  DataType,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  AutoIncrement,
  Unique,
} from "sequelize-typescript";

@Table({
  timestamps: true,
  tableName: "users",
})

// export interface IngredientInput extends Optional<IngredientAttributes, 'id'> {}
// export interface IngredientOuput extends Required<IngredientAttributes> {}
export class Users extends Model {
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
  })
  id!: number;
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  firstName!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  lastName!: string;

  @Unique("email")
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password!: string;

  @Column({
    type: DataType.ENUM,
    values: ["admin", "user"],
    allowNull: false,
  })
  userType!: string;

  @CreatedAt
  creationAt!: Date;

  @UpdatedAt
  updatedAt!: Date;

}
