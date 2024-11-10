"use client";

import { Typography } from "@/shared/ui/components/typography";
import { Button, Input } from "antd";
import SearchInputIcon from "@/shared/icons/search-input.svg";
import { useEffect, useState } from "react";
import type { Tour } from "@/entities/tour/model/tour-model";
import { useService } from "@/shared/di/use-service";
import { TourAdapter } from "@/shared/api/tour";
import { TourTabs } from "@/entities/tour/ui/tour-tabs";

export default function Home() {
  const [tours, setTours] = useState<Tour[]>([]);

  const toursApi = useService(TourAdapter);

  useEffect(() => {
    fetchTours();
  }, []);

  useEffect(() => {
    console.log("Tours", tours);
  }, [tours]);

  async function fetchTours() {
    const response = await toursApi.getMany();
    setTours(response);
  }

  return (
    <section>
      <div className="px-12 pt-[100px] pb-5 flex flex-col gap-3">
        <Typography variant="headline2">
          <span className="text-brand-main">CheTam</span> - маркетплейс туров
          напрямую от авторов туров и туристических услуг
        </Typography>
        <Input
          placeholder="Куда хотите отправиться"
          suffix={<SearchInputIcon />}
          size="large"
        />
        <Button size="large" type="primary">
          Найти
        </Button>
      </div>
      <TourTabs />
    </section>
  );
}
