import { CreationOptional, InferAttributes, InferCreationAttributes, Model } from "sequelize";

export interface UsersFields extends Model<InferAttributes<UsersFields>, InferCreationAttributes<UsersFields>> {
    user_id: CreationOptional<number>;
    name: string;
    mobile_number: string;
    user_type: string;
    status: string;
    created_at?: string;
    updated_at?: string;
}

export interface BusinessFields extends Model<InferAttributes<BusinessFields>, InferCreationAttributes<BusinessFields>> {
    business_id: CreationOptional<number>;
    address: string;
    gst_no: string;
    status: string;
    created_at?: string;
    updated_at?: string;
}


export interface CustomersFields extends Model<InferAttributes<CustomersFields>, InferCreationAttributes<CustomersFields>> {
    customer_id: CreationOptional<number>;
    name: string;
    status: string;
    created_at?: string;
    updated_at?: string;
}



export interface EmployeesFields extends Model<InferAttributes<EmployeesFields>, InferCreationAttributes<EmployeesFields>> {
    employee_id: CreationOptional<number>;
    business_id: number;
    status: string;
    created_at?: string;
    updated_at?: string;
}