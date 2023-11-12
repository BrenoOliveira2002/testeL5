import ClientRepository from "../repository/ClientRepository";


class ClientService {
  
  static async listClientBySegment(segmentacao: string) {
    return await ClientRepository.listClientBySeg(segmentacao);
  }

}

export default ClientService;
