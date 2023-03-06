export class User {
    id: string;
    email: string;
    language: string;
    firstname: string;

    // eslint-disable-next-line complexity
    constructor(user: User) {
        this.id = user?.id;
        this.email = user?.email;
        this.language = user?.language || 'en';
        this.firstname = user?.firstname;
    }
}
