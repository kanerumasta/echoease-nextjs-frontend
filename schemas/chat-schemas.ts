import {z} from 'zod'
import { UserSchema } from './user-schemas'

export const ConversationSchema = z.object({
    code:z.string(),
    users:z.array(UserSchema)
})

export type TConversationSchema = z.infer<typeof ConversationSchema>