export interface TourDto {
  id: string;
  title: string;
  thesis: string;
  description: string;
  transportDescription?: string;
  isActive: boolean;
  pricePerPerson: number;
  createdAt: Date;
  updatedAt: Date;
  supplierId: string;
  dates?: string[];
}
