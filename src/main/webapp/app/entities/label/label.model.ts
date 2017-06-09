import { Operation } from '../operation';
export class Label {
    constructor(
        public id?: number,
        public label?: string,
        public operation?: Operation,
    ) {
    }
}
