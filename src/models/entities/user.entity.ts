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
    DefaultScope,
    Scopes, Index,
} from 'sequelize-typescript';
import {Gender, Role, LoginType} from '@/common/constants';
import {IUser} from '@/interfaces';

// =========================== DECLARING SCOPES ===========================
@DefaultScope(() => ({
    attributes: {exclude: ['password']},
}))
@Scopes(() => ({
    withPassword: {
        attributes: {include: ['password']},
    },
}))
// =========================== DECLARING TABLE ===========================
@Table({tableName: 'user'})
export class UserEntity extends Model<UserEntity> implements IUser {
    @Index
    @PrimaryKey
    @AllowNull
    @Default(DataType.UUIDV4)
    @Column({
        field: 'id',
        type: DataType.UUID,
    })
    id: string;

    @Column({
        field: 'login_type',
        type: DataType.STRING,
    })
    login_type: LoginType;

    @Column({
        field: 'role',
        type: DataType.STRING,
    })
    role: Role;

    @Column({
        field: 'gender',
        type: DataType.STRING,
    })
    gender: Gender;

    @Column({field: 'phone', type: DataType.STRING, unique: true})
    phone: string;

    @Index
    @Column({field: 'email', type: DataType.STRING, unique: true})
    email: string;

    @Column({field: 'password', type: DataType.STRING})
    password: string;

    @Column({field: 'avatar', type: DataType.STRING})
    avatar: string;

    @CreatedAt
    @Column({field: 'created_at'})
    created_at: Date;

    @UpdatedAt
    @Column({field: 'updated_at'})
    updated_at: Date;

    @DeletedAt
    @Column({field: 'deleted_at'})
    deleted_at: Date;

    // =========================== HOOKS ===========================
    // @BeforeCreate
    // static async hashPassword(user: UserEntity, options: any) {
    //   user.password = await bcrypt.hash(user.password, 10);
    // }

    // =========================== METHODS ===========================
    // public comparePassword(attempt: string): Promise<boolean> {
    //   return bcrypt.compare(attempt, this.password);
    // }

    // public toResponseObject(showToken: boolean = true): IUser {
    //   const { id, username, token, email, role, avatar
    // } = this;
    //   const responseObject: any = { id, username, email, role, avatar };
    //   if (showToken) {
    //     responseObject.token = token;
    //   }
    //   return responseObject;
    // }

    // public get token() {
    //   const { id, username, email, role, avatar } = this;
    //   return jwt.sign(
    //     {
    //       id, username, email, role, avatar
    //     },
    //     process.env.SECRET,
    //     { expiresIn: '7d' },
    //   );
    // }

    // =========================== ASSOCIATIONS ===========================
    // @BelongsTo(() => UserEntity)
    // user: UserEntity;
}
