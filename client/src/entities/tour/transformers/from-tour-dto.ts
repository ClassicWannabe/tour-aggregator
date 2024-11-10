import { TourDto } from "../model/tour-dto";
import { Tour } from "../model/tour-model";

export function fromTourDto(dto?: TourDto[]): Tour[] {
  if (!dto) return [];

  return dto.map((item) => ({
    id: item.id,
    title: item.title,
    description: item.description,
    dates: item.dates || [],
    price: item.pricePerPerson,
    supplierId: item.supplierId,
  }));
}
