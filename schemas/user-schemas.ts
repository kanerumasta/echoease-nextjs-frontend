import {z} from 'zod'

export const UserSchema = z.object({
    first_name: z.string(),
    last_Name:z.string(),
    email:z.string().email(),
})

export type TUserSchema = z.infer<typeof UserSchema>


export const ProfileSchema = z.object({
    dob : z.string(),
    gender : z.string(),
    phone : z.string(),
    street:z.string(),
    brgy:z.string(),
    city:z.string(),
    country:z.string(),
    zipcode : z.string()
    

})

export type TProfileSchema = z.infer<typeof ProfileSchema>

