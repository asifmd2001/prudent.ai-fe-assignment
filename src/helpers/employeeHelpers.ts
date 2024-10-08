import { Employee, Organization } from "../state/orgSlice/types";

export function findEmployeeById(organizations: Organization[], orgId: number, empId: number): Employee | undefined {
    const organization = organizations.find(org => org.id === orgId);

    if (!organization) {
        console.log(`Organization with ID ${orgId} not found.`);
        return undefined;
    }

    function searchEmployee(employees: Employee[], empId: number): Employee | undefined {
        for (const employee of employees) {
            if (employee.id === empId) {
                return employee;
            }
            const foundInSubordinates = searchEmployee(employee.subordinates ?? [], empId);
            if (foundInSubordinates) {
                return foundInSubordinates;
            }
        }
        return undefined;
    }

    return searchEmployee(organization.employees, empId);
}


export function updateEmployeeById(organizations: Organization[], orgId: number, empId: number, updatedData: Partial<Employee>): Organization | undefined {
    const organization = organizations.find(org => org.id === orgId);

    if (!organization) {
        console.log(`Organization with ID ${orgId} not found.`);
        return undefined;
    }


    function searchAndUpdateEmployee(employees: Employee[]): Employee[] {
        return employees.map(employee => {
            if (employee.id === empId) {
                return { ...employee, ...updatedData };
            }

            return {
                ...employee,
                subordinates: searchAndUpdateEmployee(employee?.subordinates ?? [])
            };
        });
    }

    const updatedOrganization: Organization = {
        ...organization,
        employees: searchAndUpdateEmployee(organization.employees)
    };

    return updatedOrganization;
}

export function addSubordinate(organizations: Organization[], orgId: number, empId: number, newSubordinate: Employee): Organization | undefined {

    const organization = organizations.find(org => org.id === orgId);
    if (!organization) {
        console.log(`Organization with ID ${orgId} not found.`);
        return undefined;
    }


    function updateEmployee(employees: Employee[]): Employee[] {
        return employees.map(employee => {
            if (employee.id === empId) {

                return {
                    ...employee,
                    subordinates: [...employee.subordinates ?? [], newSubordinate]
                };
            }

            return {
                ...employee,
                subordinates: updateEmployee(employee.subordinates ?? [])
            };
        });
    }


    return {
        ...organization,
        employees: updateEmployee(organization.employees)
    };
}

function collectEmployeeIds(employees: Employee[]): number[] {
    const ids: number[] = [];

    function traverse(employeeList: Employee[]) {
        for (const employee of employeeList) {
            ids.push(employee.id);
            traverse(employee.subordinates ?? []);
        }
    }

    traverse(employees);
    return ids;
}

export function generateUniqueEmpId(organization: Organization): number {
    const existingIds = collectEmployeeIds(organization.employees);

    if (existingIds.length === 0) {
        return 1;
    }

    const maxId = Math.max(...existingIds);
    return maxId + 1;
}


function deleteEmployeeById(employees: Employee[], empId: number): Employee[] {
    return employees
        .filter(employee => employee.id !== empId)
        .map(employee => ({
            ...employee,
            subordinates: deleteEmployeeById(employee.subordinates ?? [], empId)
        }));
}

export function deleteEmployee(organizations: Organization[], orgId: number, empId: number): Organization | undefined {

    const organization = organizations.find(org => org.id === orgId);

    if (!organization) {
        console.log(`Organization with ID ${orgId} not found.`);
        return undefined;
    }

    return {
        ...organization,
        employees: deleteEmployeeById(organization.employees, empId)
    };
}