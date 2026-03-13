import { UserRole } from "./types.js";

export class User {
    constructor(
        public id: number,
        public username: string,
        public email: string,
        public role: UserRole
    ) {}
}