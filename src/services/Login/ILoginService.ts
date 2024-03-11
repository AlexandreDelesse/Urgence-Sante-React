import { CrewDTO } from "../../interfaces/api/login/CrewDTO";
import { GetLoginDTO } from "../../interfaces/api/login/GetLoginDTO";

export interface ILoginService {
    GetLogin: () => Promise<GetLoginDTO>
    PostLogin: (id: number, employee: string) => Promise<CrewDTO>
}