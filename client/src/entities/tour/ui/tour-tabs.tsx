import { Tabs } from "antd";
import TourCard from "./tour-card";
import { Typography } from "@/shared/ui/components/typography";
import { ReactNode, useState } from "react";
import { Tour } from "@/entities/tour/model/tour-model";
import MenuOutlined from "@/shared/icons/menu-outlined.svg";

// TODO: From model
type TourTabType = "all" | "hike" | "by_car" | "city";
interface TourTab {
  key: TourTabType;
  label: {
    text: string;
    icon: ReactNode;
  };
  tours: Tour[];
}

const mockTabs: TourTab[] = [
  {
    key: "all",
    label: {
      text: "Все туры",
      icon: <MenuOutlined />,
    },
    tours: [
      {
        id: "1",
        supplierId: "1",
        title: "Уникальное озеро Каинды + Чёрный и Чарынский каньоны",
        description:
          "Отправиться в динамичное путешествие в мини-группе к природным достопримечательностям края",
        dates: ["сб, 21 сен в 05:30", "вс, 22 сен в 05:30"],
        price: 12000,
      },
    ],
  },
  {
    key: "hike",
    label: {
      text: "Пешие",
      icon: <MenuOutlined />,
    },
    tours: [
      {
        id: "1",
        supplierId: "1",
        title: "Уникальное озеро Каинды + Чёрный и Чарынский каньоны",
        description:
          "Отправиться в динамичное путешествие в мини-группе к природным достопримечательностям края",
        dates: ["сб, 21 сен в 05:30", "вс, 22 сен в 05:30"],
        price: 12000,
      },
    ],
  },
  {
    key: "by_car",
    label: {
      text: "Выездные",
      icon: <MenuOutlined />,
    },
    tours: [
      {
        id: "2",
        supplierId: "2",
        title: "Из Алматы — к озеру Иссык и водопаду Медвежий ",
        description:
          "Отправиться в динамичное путешествие в мини-группе к природным достопримечательностям края",
        dates: ["cб, 22 сен в 06:30", "вс, 24 сен в 05:30"],
        price: 16000,
      },
    ],
  },
  {
    key: "city",
    label: {
      text: "Городские",
      icon: <MenuOutlined />,
    },
    tours: [],
  },
];

export function TourTabs() {
  const [activeTab, setActiveTab] = useState<TourTabType>("all");

  function handleTabChange(activeKey: string) {
    setActiveTab(activeKey as TourTabType);
  }
  return (
    <Tabs
      centered
      type="card"
      onChange={handleTabChange}
      items={mockTabs.map(({ label, tours, key }) => {
        return {
          label: (
            <div className="flex items-center gap-2">
              {label.icon}
              {activeTab === key && (
                <span className={"overflow-hidden"}>{label.text}</span>
              )}
            </div>
          ),
          key,
          children: (
            <div className="px-4 mb-4">
              {!!tours.length ? (
                tours.map((tour, i) => (
                  <TourCard
                    key={`${tour.title}-${i}`}
                    title={tour.title}
                    description={tour.description}
                    dates={tour.dates}
                    price={tour.price}
                  />
                ))
              ) : (
                <div className="d-flex items-center justify-center text-center">
                  <Typography variant="body1">Tour jok</Typography>
                </div>
              )}
            </div>
          ),
        };
      })}
    />
  );
}
