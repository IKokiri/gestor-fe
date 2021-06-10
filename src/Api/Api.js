export class ApiGlobal {

    static async getUsers() {
        try {
        const response = await fetch(`http://localhost:4000/gestor/user/1.0/`);
        const responseJson = await response.json();
            return responseJson;
        } catch (e) {
            throw e;
        }
    }
    
    static async getPeople() {
        try {
        const response = await fetch(`http://localhost:4000/gestor/person/1.0/`);
        const responseJson = await response.json();
            return responseJson;
        } catch (e) {
            throw e;
        }
    }
    
    static async getDepartments() {
        try {
        const response = await fetch(`http://localhost:4000/gestor/department/1.0/`);
        const responseJson = await response.json();
            return responseJson;
        } catch (e) {
            throw e;
        }
    }

    static async getPositions() {
        try {
        const response = await fetch(`http://localhost:4000/gestor/position/1.0/`);
        const responseJson = await response.json();
            return responseJson;
        } catch (e) {
            throw e;
        }
    }

    
    static async getEmployees() {
        try {
        const response = await fetch(`http://localhost:4000/gestor/employee/1.0/`);
        const responseJson = await response.json();
            return responseJson;
        } catch (e) {
            throw e;
        }
    }
    
    static async getContracts() {
        try {
        const response = await fetch(`http://localhost:4000/gestor/contract/1.0/`);
        const responseJson = await response.json();
            return responseJson;
        } catch (e) {
            throw e;
        }
    }
    
    static async getProposals() {
        try {
        const response = await fetch(`http://localhost:4000/gestor/proposal/1.0/`);
        const responseJson = await response.json();
            return responseJson;
        } catch (e) {
            throw e;
        }
    }
}