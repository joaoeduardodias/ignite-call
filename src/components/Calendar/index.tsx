import { getWeekDays } from "@/utils/get-week-days";
import dayjs from "dayjs";
import { CaretLeft, CaretRight } from "phosphor-react";
import { useState } from "react";
import { CalendarActions, CalendarBody, CalendarContainer, CalendarDay, CalendarHeader, CalendarTitle } from "./styles";


export interface CalendarProps { }

export function Calendar(props: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(() => {
    return dayjs().set('date', 1)
  })

  function handlePreviousMonth() {
    const previousMonthDate = currentDate.subtract(1, 'month')

    setCurrentDate(previousMonthDate)

  }
  function handleNextMonth() {
    const previousMonthDate = currentDate.add(1, 'month')

    setCurrentDate(previousMonthDate)

  }

  const shortWeekDays = getWeekDays({ short: true })
  const currentMonth = currentDate.format('MMMM')
  const currentYear = currentDate.format('YYYY')

  return (
    <CalendarContainer>
      <CalendarHeader>
        <CalendarTitle >
          {currentMonth} <span>{currentYear}</span>
        </CalendarTitle>
        <CalendarActions>
          <button type="button" onClick={handlePreviousMonth} title="Previous month" >
            <CaretLeft />
          </button>
          <button type="button" onClick={handleNextMonth} title="Next month">
            <CaretRight />
          </button>
        </CalendarActions>
      </CalendarHeader>
      <CalendarBody>
        <thead>
          <tr>
            {shortWeekDays.map(weekDay => <th key={weekDay}>{weekDay}.</th>)}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>
              <CalendarDay disabled>
                01
              </CalendarDay>
            </td>
            <td>
              <CalendarDay>
                02
              </CalendarDay>
            </td>
            <td>
              <CalendarDay>
                03
              </CalendarDay>
            </td>

          </tr>
          <tr>
            <td>
              <CalendarDay >
                04
              </CalendarDay>
            </td>
            <td>
              <CalendarDay >
                05
              </CalendarDay>
            </td>
            <td>
              <CalendarDay >
                06
              </CalendarDay>
            </td>
            <td>
              <CalendarDay >
                07
              </CalendarDay>
            </td>
            <td>
              <CalendarDay >
                08
              </CalendarDay>
            </td>
            <td>
              <CalendarDay>
                09
              </CalendarDay>
            </td>
            <td>
              <CalendarDay>
                10
              </CalendarDay>
            </td>

          </tr>
        </tbody>
      </CalendarBody>
    </CalendarContainer>
  )
}