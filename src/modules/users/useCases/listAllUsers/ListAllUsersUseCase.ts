import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class ListAllUsersUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User[] {
    const logedUser = this.usersRepository.findById(user_id);

    if (!logedUser) {
      throw new Error("Usuário não encontrado");
    }

    if (!logedUser.admin) {
      throw new Error("Você não tem permissão nesta rota");
    }

    const users = this.usersRepository.list();

    return users;
  }
}

export { ListAllUsersUseCase };
