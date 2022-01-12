import { ConfigService } from "src/config/config.service";
import Mailgun from 'mailgun-js';
import templatesRU from './templates/ru.json';
import templatesEN from './templates/en.json';
import { Template } from "./interfaces/template.type";
import { Values } from "./interfaces/values.type";
import { Result } from "src/shared/concrete/Result";
import { Injectable } from "@nestjs/common";
import { ApplicationLanguage } from "src/static/applicationLanguage";

@Injectable()
export class MailgunService {
    private client: Mailgun.Mailgun;
    private templates: Record<string, Template> = templatesRU;

    constructor(
        private configService: ConfigService
    ) {
        this.client = this.buildClient();
    }

    public async send(to: string, type: string, values: Values, language?: ApplicationLanguage): Promise<Result<boolean | undefined, Error | undefined>> {
        this.templates = language == 'en-EN' ? templatesEN : templatesRU;
        
        return new Promise((resolve) => {
            this.client.messages().send({
                to: to,
                from: this.configService.props.mailgun.from,
                subject: this.executeTemplate(this.templates[type].subject, values.title),
                template:'new_template',
                'h:X-Mailgun-Variables': JSON.stringify({
                    heading: this.executeTemplate(this.templates[type].subject, values.title),
                    text: this.executeTemplate(this.templates[type].body, values.body)
                }),
            }, (err, _) => {
                if (err) {
                    const error = new Error(err.message);
                    return resolve(Result.fail(error));
                }

                return resolve(Result.ok(true));
            });
        });
    }

    private buildClient(): Mailgun.Mailgun {
        return new Mailgun({
            apiKey: this.configService.props.mailgun.key,
            domain: this.configService.props.mailgun.domain,
            host: this.configService.props.mailgun.host
        });
    }

    private executeTemplate(body: string, data: any) {
        const executedBody = body.replace(/\$(\w+)/ig, (_, p1) => {
            return data[p1] || 'undefined';
        });
        return executedBody;
    }
}
