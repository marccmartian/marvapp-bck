import { EmailAdapter } from "../../config/email.adapter";
import { envs } from "../../config/envs.adapter";
import { CustomError } from "../../domain/errors/custom-errors";

export interface EmailService {
    sendEmailValidationLink(email: string, token: string): Promise<boolean>;
}

export class EmailServiceImp implements EmailService {

    constructor(
        private readonly emailAdapter: EmailAdapter
    ) {}

    async sendEmailValidationLink(email: string, token: string): Promise<boolean> {
        const link = `${envs.WEBSERVICE_URL}/user/validate-email/${token}`;
        const html = `
            <h1>Validate your email</h1>
            <p>Please, click on the following link to validate your email.</p>
            <p>Here is your email 👉🏼 <a href="${link}">${email}</a></p>
        `;

        const isSent = await this.emailAdapter.sendEmail({
            to: email,
            subject: 'Validate your email',
            htmlBody: html
        });
        if(!isSent) throw CustomError.internalServer('Error sending email');

        return true;
    }

}