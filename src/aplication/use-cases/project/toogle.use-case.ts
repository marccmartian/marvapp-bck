import { CustomError, ProjectRepository } from "../../../domain";

interface ToogleIsTopI {
    execute(id: string): Promise<boolean>
}

export class ToogleIsTopUseCase implements ToogleIsTopI {

    constructor(
        private readonly projectRepository: ProjectRepository
    ){}

    async execute(id: string): Promise<boolean> {
        const projectEntity = await this.projectRepository.findProjectById(id);
        if(!projectEntity) throw CustomError.notFound("The project not found");

        projectEntity.toogleIsTop();
        
        await this.projectRepository.updateIstop(projectEntity);
        return true;
    }

}