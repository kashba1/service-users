
import { getUsersModel } from "../models/users.model";

import { UsersFields } from "../models/Interface"

export async function getAllConstant(condition: any = {}): Promise<UsersFields[] | []> {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await getUsersModel().findAll(condition);
            resolve(response);
        } catch (err) {
            reject(err);
        }
    });
}
