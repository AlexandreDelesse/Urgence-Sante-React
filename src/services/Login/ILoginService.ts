import { GetLoginDTO } from "../../interfaces/api/login/GetLoginDTO";

export interface ILoginService {
    GetLogin: () => GetLoginDTO
}