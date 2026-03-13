import { UserRole } from "./types";

export class User {
    constructor(
        public id: number,
        public username: string,
        public email: string,
        public role: UserRole
    ) {}
}