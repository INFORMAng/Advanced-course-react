import { FC, useState } from "react"
import { Button, DatePicker, Form, Input, Row, Select } from "antd"
import { rules } from "../utils/rules"
import { IUser } from "../types/usersTypes"
import { IEvent } from "../types/eventTypes"
import { format } from "date-fns"
import { Dayjs } from "dayjs"
import { useSelector } from "react-redux"
import { StateSchema } from "../store/config/stateChema"
import { getAuthState } from "../store/selectors/authSelectors"
import { v4 as uuidv4 } from 'uuid';

interface EventFormProps {
  guests: IUser[] | undefined
  submit: (event: IEvent) => void;
}

const EventForm: FC<EventFormProps> = ({guests, submit}) => {
  const {user} = useSelector((state: StateSchema) => getAuthState(state))
  const emptyEvent: IEvent = {
    id: '',
    author: '',
    guest: '',
    data: '',
    description: '',
  }
  const [event, setEvent] = useState<IEvent>(emptyEvent)

  const selectDate = (date: Dayjs) => {
    const formatedDate = date?.toDate()
    const eventDate = format(formatedDate, 'yyyy.MM.dd');
    setEvent({...event, data: eventDate})
  }

  const submitForm = () => {
    submit({...event, author: user.username, id: uuidv4()})
  }

  return (
    <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          autoComplete="off"
          onFinish={submitForm}
        >
          <Form.Item
            label="Описание события"
            name="description"
            rules={[rules.required()]}
          >
            <Input value={event.description} onChange={e => setEvent({...event, description: e.target.value})}/>
          </Form.Item>

          <Form.Item
            label="Дата события"
            name="date"
            rules={[rules.required(), rules.isDateAfter('Нельзя выбрать событие в прошлом')]}
          >
            <DatePicker onChange={(date) => selectDate(date)}/>
          </Form.Item>

          <Form.Item
            label="Гость"
            name="guests"
          >
            <Select value={event.guest} onChange={(guest: string) => setEvent({...event, guest})}>
              {guests?.map(guest => (
                <Select.Option key={guest.id} value={guest.username}>{guest.username}</Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Row justify="end">
              <Button 
                type="primary" 
                htmlType="submit" 
              >
                Добавить событие
              </Button>
            </Row>
          </Form.Item>
        </Form>
  )
}

export default EventForm