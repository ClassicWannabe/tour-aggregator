import { MOCK_TOURS_DTO } from "@/entities/tour/mocks/mock-tours";
import { Api } from "..";
import { fromTourDto } from "@/entities/tour/transformers/from-tour-dto";
import { TourDto } from "@/entities/tour/model/tour-dto";

export class TourAdapter {
  constructor(private api: Api) {}

  async getMany() {
    // await this.api.get('/tours')
    const response = await new Promise<TourDto[]>((resolve) => {
      setTimeout(() => {
        resolve(MOCK_TOURS_DTO);
      }, 500);
    });

    return fromTourDto(response);
  }

  async getOne(id: string) {}

  async updateOne(id: string, body: unknown) {}

  async createOne(body: unknown) {}

  async deleteOne(id: string) {}

  // ...other
}
