const rota = "proposal"
export class ProposalApi {

    static async get() {
        try {
        const response = await fetch(`http://localhost:4000/gestor/${rota}/1.0/`);
        const responseJson = await response.json();
            return responseJson;
        } catch (e) {
            throw e;
        }
    }

    static async getId(data) {
        try {
        const response = await fetch(`http://localhost:4000/gestor/${rota}/1.0/`+data);
        const responseJson = await response.json();
            return responseJson;
        } catch (e) {
            throw e;
        }
    }

    static async create(data) {

        const response = await fetch(`http://localhost:4000/gestor/${rota}/1.0/`,{
            method:'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {  
            
        })
        .catch(console.error);
        
        return response;

    }
    
    static async update(data) {

        const response = await fetch(`http://localhost:4000/gestor/${rota}/1.0/`+data.id,{
            method:'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {  
        })
        .catch(console.error);
        return response

    }

    static async delete(data) {         
        const response = await fetch(`http://localhost:4000/gestor/${rota}/1.0/`+data,{
            method:'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
        })
        .then(response => response.json())
        .then(data => {  
        })
        .catch(console.error);
        return response;
    }
}