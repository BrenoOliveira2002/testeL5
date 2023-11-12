import ClientRepository from "../repository/ClientRepository";


class ClientService {
  static async listClients() {
    return await ClientRepository.getClientSeg();
  }

  static async getProdocutById(segmentacao: string) {
    return await ClientRepository.listClientBySeg(segmentacao);
  }

}

export default ClientService;
