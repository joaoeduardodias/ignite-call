import { Calendar } from "@/components/Calendar";
import { useState } from "react";
import { Container, TimePicker, TimePickerHeader, TimePickerItem, TimePickerList } from "./styles";


export interface CalendarStepProps { }

export function CalendarStep(props: CalendarStepProps) {

  const [isDateSelected, setIsDateSelected] = useState(true)

  return (
    <Container isTimePickerOpen={isDateSelected}>
      <Calendar />
      {isDateSelected && (
        <TimePicker >
          <TimePickerHeader>terça-feira <span>20 de maio</span></TimePickerHeader>
          <TimePickerList>
            <TimePickerItem>08:00h</TimePickerItem>
            <TimePickerItem>09:00h</TimePickerItem>
            <TimePickerItem>10:00h</TimePickerItem>
            <TimePickerItem>11:00h</TimePickerItem>
            <TimePickerItem>12:00h</TimePickerItem>
            <TimePickerItem>13:00h</TimePickerItem>
            <TimePickerItem>14:00h</TimePickerItem>
            <TimePickerItem>15:00h</TimePickerItem>
            <TimePickerItem>16:00h</TimePickerItem>
            <TimePickerItem>17:00h</TimePickerItem>
            <TimePickerItem>18:00h</TimePickerItem>
          </TimePickerList>
        </TimePicker>
      )}
    </Container>
  )
}