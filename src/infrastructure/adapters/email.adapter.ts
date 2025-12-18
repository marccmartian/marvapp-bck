import nodemailer, { Transporter } from 'nodemailer';

interface Attachement {
    fileName: string,
    path: string,
}

interface SendEmailOptions {
    to: string | string[],
    subject: string,
    htmlBody: string,
    attachments?: Attachement[];
}

export class EmailAdapter {

    private transporter: Transporter;

    // las props: host, port, secure, connectionTimeout, se agregaron para producción
    constructor(
        mailerService: string,
        mailerEmail: string,
        mailerPassword: string
    ){
        this.transporter = nodemailer.createTransport({
            service: mailerService,
            host: mailerService === 'gmail' ? 'smtp.gmail.com' : undefined,
            port: 465,
            secure: true,
            auth: {
                user: mailerEmail,
                pass: mailerPassword
            },
            connectionTimeout: 10000,
        })
    }

    async sendEmail(options: SendEmailOptions): Promise<boolean> {
        const {to, subject, htmlBody, attachments = [] } = options

        try {
            const info = await this.transporter.sendMail({
                to,
                subject,
                html: htmlBody,
                attachments
            });
            // console.log(info);
            return true
        } catch (error) {
            console.error("Error enviando email:", error);        
            return false
        }
    }

}