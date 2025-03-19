import React from "react"
import { ITourProgram } from "@/lib/interfaces/tours"
import { getTranslations } from "next-intl/server"
import getHours from "@/lib/utils/get-hours"

type Props = {
  program: ITourProgram
}

const TourProgram: React.FC<Props> = async ({ program }) => {
  const t = await getTranslations()

  return (
    <article className="flex flex-col gap-2">
      <h2 className="text-headline4 text-primaryBlack">{t("TourDetails.program")}</h2>
      <div className="flex flex-col gap-3">
        {program.map((dayProgram, idx) => {
          return (
            <div key={idx} className="flex flex-col gap-2">
              <h4 className="text-headline5 text-primaryBlack">
                - {new Date(dayProgram[0].time).toLocaleDateString("ru-RU")}
              </h4>
              {dayProgram.map((programItem, idx2) => (
                <div className="flex gap-2 items-start" key={idx2}>
                  <div className="flex flex-col items-center self-stretch">
                    <span className="h-[10px] w-[10px] min-h-[10px] min-w-[10px] rounded-full bg-primaryGreen" />
                    <span className="w-[1px] h-full bg-lightGray" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="text-base font-bold leading-3">{getHours(programItem.time)}</p>
                    <p className="text-body2">{programItem.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )
        })}
      </div>
    </article>
  )
}

export default TourProgram
