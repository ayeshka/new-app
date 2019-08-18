export class Salary {
    constructor(
        public id: string,
        public payRollRN: number, // payroll Refference Number
        public basicSalary: number,
        public allowances: number,
        public deductions: number,
        public ETF: number,
        public EPF: number,
        public PAYE: number
        ) {

    }
}