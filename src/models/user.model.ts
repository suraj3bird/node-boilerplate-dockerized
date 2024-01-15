import { Document, model, Schema } from 'mongoose'
import { IRole } from '@interfaces/role'
const roles = ['ADMIN', 'SUPERADMIN', 'USER']
const status = ['ACTIVE', 'INACTIVE', 'PENDING', 'BANNED']

const UserSchema = new Schema(
  {
    name: String,
    avatar: String,
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      select: false,
      required: true,
      minLength: 8
    },
    role: {
      type: String,
      enum: roles,
      default: 'USER'
    },
    status: {
      type: String,
      enum: status,
      default: 'INACTIVE'
    }
  },
  { timestamps: true }
)
export interface IUser extends Document {
  name: string
  avatar?: string
  email: string
  password: string
  role: IRole
  status: string
}

const User = model<IUser>('User', UserSchema)
export default User
