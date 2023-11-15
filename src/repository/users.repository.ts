
import { getUsersModel } from "../models/users.model";

import { UsersFields } from "../models/Interface"

export async function getUsers(condition: any = {}): Promise<UsersFields[] | []> {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await getUsersModel().findAll(condition);
            resolve(response);
        } catch (err) {
            reject(err);
        }
    });
}

export async function createUser(userData: any): Promise<UsersFields | null> {
    return new Promise(async (resolve, reject) => {
        try {
            const createdUser = await getUsersModel().create(userData);
            resolve(createdUser);
        } catch (err) {
            reject(err);
        }
    });
}
