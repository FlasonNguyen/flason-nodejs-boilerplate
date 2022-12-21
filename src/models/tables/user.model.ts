import {
    Table,
    PrimaryKey,
    Column,
    DataType,
    Model,
    CreatedAt,
    UpdatedAt,
    DeletedAt,
    Default,
    AllowNull,
} from 'sequelize-typescript';
// import { DataType } from 'sequelize';

@Table({ tableName: 'user' })
export class UserModel extends Model<UserModel> {
    @PrimaryKey
    @AllowNull
    @Default(DataType.UUIDV4)
    @Column({
        field: 'id',
        type: DataType.UUID,
    })
    id: string;

    @Column({ field: 'name', type: DataType.STRING })
    name: string;

    @Column({
        field: 'login_type',
        type: DataType.STRING,
    })
    login_type: string;

    @Column({
        field: 'gender',
        type: DataType.STRING,
    })
    gender: string;

    @Column({ field: 'phone', type: DataType.STRING, unique: true })
    phone: string;

    @Column({ field: 'username', type: DataType.STRING, unique: true })
    username: string;

    @Column({ field: 'email', type: DataType.STRING, unique: true })
    email: string;

    @Column({ field: 'password', type: DataType.STRING })
    password: string;

    @Column({ field: 'avatar', type: DataType.STRING })
    avatar: string;

    @Column({
        field: 'type',
        type: DataType.STRING,
    })
    type: string;
    @CreatedAt
    @Column({ field: 'created_at' })
    created_at: Date;

    @UpdatedAt
    @Column({ field: 'updated_at' })
    updated_at: Date;

    @DeletedAt
    @Column({ field: 'deleted_at' })
    deleted_at: Date;
}
