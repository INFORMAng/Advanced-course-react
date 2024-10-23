import { Badge, BadgeProps, Calendar } from "antd"
import { IEvent } from "../types/eventTypes"
import { FC, memo } from "react"
import dayjs, { Dayjs } from "dayjs"

interface EventCalendarProps {
  events: IEvent[]
}

const EventCalendar: FC<EventCalendarProps> = ({events}) => {
    const dateCellRender = (value: Dayjs) => {
      const formatedDate = dayjs(value.toDate()).format('YYYY.MM.DD')
      const currentDayEvents= events.filter(event => event.data === formatedDate)
      
      return (
        <div>
          {currentDayEvents.map(event => 
            <div key={event.id}>{event.description}</div>
          )}
        </div>
      );
    };

  return (
      <Calendar cellRender={dateCellRender}/>
  )
}

export default memo(EventCalendar)