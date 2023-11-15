import { getUsers } from "../../repository/users.repository";

export const getUserDetail = (mobile_number: number, user_type: string) => {
    return new Promise( async (resolve, reject) => {
        try {
            let condition = {
                attributes: ['user_id', 'name'],
                raw: true,
                where: {
                    mobile_number, 
                    user_type,
                    status: '1',
                }
            }
            let result = await getUsers(condition);
            resolve(result);
        } catch (error) {
            reject(error);
        }
    }
)};
