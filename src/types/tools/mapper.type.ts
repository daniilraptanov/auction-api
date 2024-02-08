export interface IMapper<Model, DTO> {
    toDTO(model: Model): DTO;
    fromDTO(dto: DTO): Model;
}
