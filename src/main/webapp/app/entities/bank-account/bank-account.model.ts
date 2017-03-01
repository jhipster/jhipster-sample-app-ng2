import { User } from '../../shared';
import { Operation } from '../operation';
export class BankAccount {
    constructor(
        public id?: number,
        public name?: string,
        public balance?: number,
        public user?: User,
        public operation?: Operation,
    ) {
    }
}
