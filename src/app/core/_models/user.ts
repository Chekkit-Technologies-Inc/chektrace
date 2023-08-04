export class User {
    id: number;
    username: string;
    email: string;
    access_level: number;
    phone_number:string;
    password: string;
    first_name: string;
    last_name: string;
    membership_type:string;
    gender:string;
    company_rep: string;
    company_id?: number;
    profile: Profile;
    call_code: Profile;
    country: Profile;
    currency: Profile;
}

export interface Profile {
    company_name: any;
    location: any;
    reg_number: any;
    company_email: any;
    id: number;
    profile_picture_url: string;
    gs1_api_key: any;
}
