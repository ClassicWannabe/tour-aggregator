import { Typography } from "@/shared/ui/components/typography";
import { Tag } from "antd";

type Props = {
  imageSrc?: string;
  title: string;
  description: string;
  price: number;
  dates: string[];
};

export default function TourCard({ title, description, dates, price }: Props) {
  return (
    <article className="shadow-sm rounded-lg bg-back-layer1 max-w-md-[320px] pb-2">
      <div className="w-full rounded-lg h-[180px] bg-gray"></div>
      <div className="py-2 px-3">
        <div className="flex justify-between items-center gap-2"></div>
        <div className="flex flex-col gap-2">
          <Typography variant="headline4">{title}</Typography>
          <Typography variant="body2">{description}</Typography>
          <div className="flex items-center gap-1">
            {dates.map((date, i) => (
              <Tag key={i} bordered={false}>
                {date}
              </Tag>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <Typography className="text-brand-main" variant="headline3">
              {price}
            </Typography>
            <span>за человка</span>
          </div>
        </div>
      </div>
    </article>
  );
}
