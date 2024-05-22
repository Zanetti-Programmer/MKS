import { ValidationOptions, registerDecorator } from "class-validator";
import { EmailIsUnique } from "src/Resources/Validator/Users/EmailIsUnique.validator";

export const VerifyEmail = (validationOptions: ValidationOptions) => {
    return (object: Object, property: string) => {
        registerDecorator({
            target: object.constructor,
            propertyName: property,
            options: validationOptions,
            constraints: [],
            validator: EmailIsUnique
        });
    }
}