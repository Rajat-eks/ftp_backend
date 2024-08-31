export declare function sendEmail(userEmail: any, subject: any, text: any): Promise<true | {
    mssg: string;
    status: string;
    detail: any;
}>;
export declare function sendMultipleEmail(userEmail: any, subject: any, text: any): Promise<true | {
    msg: string;
    status: string;
    detail: any;
}>;
