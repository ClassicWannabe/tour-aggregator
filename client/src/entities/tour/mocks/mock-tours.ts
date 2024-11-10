import { TourDto } from "../model/tour-dto";

export const MOCK_TOURS_DTO: TourDto[] = [
  {
    id: "1",
    supplierId: "1",
    title: "Уникальное озеро Каинды + Чёрный и Чарынский каньоны",
    description:
      "Отправиться в динамичное путешествие в мини-группе к природным достопримечательностям края",
    dates: ["сб, 21 сен в 05:30", "вс, 22 сен в 05:30"],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    thesis: "",
    pricePerPerson: 8000,
  },
  {
    id: "2",
    supplierId: "2",
    title: "Из Алматы — к озеру Иссык и водопаду Медвежий ",
    description:
      "Отправиться в динамичное путешествие в мини-группе к природным достопримечательностям края",
    dates: ["cб, 22 сен в 06:30", "вс, 24 сен в 05:30"],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    thesis: "",
    pricePerPerson: 8000,
  },
];
