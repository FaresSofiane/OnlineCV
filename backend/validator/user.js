import { Validator } from 'jsonschema';

export function verifyUser(user) {
    if (!user) {
        throw new Error('User information not provided');
    }
    const validator = new Validator();
    const userSchema = {
        type: 'object',
        properties: {
            username: {
                type: 'string',
                minLength: 3,
                errorMessage: 'Username is invalid'
            },
            email: {
                type: 'string',
                format: 'email',
                errorMessage: 'Email is invalid'
            },
            password: {
                type: 'string',
                minLength: 6,
                errorMessage: 'Password is invalid',
                pattern: '^(?=.*[A-Z])(?=.*[0-9]).+$' // Le mot de passe doit contenir au moins une majuscule et un chiffre
            }
        },
        required: ['username', 'email', 'password']
    };
    const result = validator.validate(user, userSchema);
    if (result.errors.length) {
        const errorInputsMsg = result.errors.map(error => {
            return error.schema.errorMessage || error.message;
        }).join(" ");
        throw new Error(errorInputsMsg);
    }
}