export interface Employee {
    id: number;
    name: string;
    position: string;
    subordinates?: Employee[];
}

export interface Organization {
    id: number;
    name: string;
    employees: Employee[];
}
