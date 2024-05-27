import { getWeekDays } from "@/utils/get-week-days";
import { CaretLeft, CaretRight } from "phosphor-react";
import { CalendarActions, CalendarBody, CalendarContainer, CalendarDay, CalendarHeader, CalendarTitle } from "./styles";


export interface CalendarProps { }

export function Calendar(props: CalendarProps) {

  const shortWeekDays = getWeekDays({ short: true })

  return (
    <CalendarContainer>
      <CalendarHeader>
        <CalendarTitle>
          Maio <span>2024</span>
        </CalendarTitle>
        <CalendarActions>
          <button>
            <CaretLeft />
          </button>
          <button>
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