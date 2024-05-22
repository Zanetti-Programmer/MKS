import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { hash } from "bcrypt";

@Injectable()
export class PasswordHashPipe implements PipeTransform {

    constructor(private configService: ConfigService) { }

    async transform(password: string, metadata: ArgumentMetadata) {
        const salt = String(this.configService.get<string>('PASSWORD_SALT'));

        return await hash(password, salt);
    }

}