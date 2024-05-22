import { Injectable } from "@nestjs/common";
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { UserService } from "src/Services/Users/User.service";


@Injectable()
@ValidatorConstraint({
    async: true
})
export class EmailIsUnique implements ValidatorConstraintInterface {

    constructor(private repository: UserService) { }

    async validate(email: string, validationArguments?: ValidationArguments): Promise<boolean> {
        const userExists = await this.repository.getUserByEmail(email);

        return !userExists;
    }
}