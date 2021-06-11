const rota = "user"
export class LoginApi {

    static async getLogin(email,password) {
        try {
        const response = await fetch(`http://localhost:4000/gestor/${rota}/1.0/${email}/${password}`);
        const responseJson = await response.json();
            return responseJson;
        } catch (e) {
            throw e;
        }
    }

}