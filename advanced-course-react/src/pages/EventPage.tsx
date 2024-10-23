import { useEffect, useState } from "react"
import { Button, Layout, Modal, Row } from "antd"
import { useGetUsers } from "../store/services/usersApi"
import { getArrayFromLocalStorage, LOCAL_STORAGE_KEYS } from "../helpers/lib/localStorage"
import { useAppDispatch } from "../helpers/hooks/useAppDispatch"
import { setUsers } from "../store/slices/usersSlice"
import { useSelector } from "react-redux"
import { StateSchema } from "../store/config/stateChema"
import { getAuthState } from "../store/selectors/authSelectors"
import { IEvent } from "../types/eventTypes"
import { createEvent, setEvents } from "../store/slices/eventsSlice"
import EventForm from "../components/EventForm"
import EventCalendar from "../components/EventCalendar"
import { useAddEvent, useGetEvents } from "../store/services/eventsApi"

const EventPage = () => {
  const dispatch = useAppDispatch()
  const [addEvent] = useAddEvent()
  const {data: users} = useGetUsers()
  const {data: allEvents = []} = useGetEvents()
  const {user} = useSelector((state: StateSchema) => getAuthState(state))
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const localUsersData = getArrayFromLocalStorage(LOCAL_STORAGE_KEYS.USERS)
  const localEventsData = getArrayFromLocalStorage(LOCAL_STORAGE_KEYS.EVENTS)
  const guests = users?.filter(guest => guest.username !== user.username)
  const currentEvents = allEvents?.filter((event) => event.author === user.username || event.guest === user.username)
  
  useEffect(() => {
    if (localUsersData && Array.isArray(localUsersData)) {
      dispatch(setUsers(localUsersData))
    } else if (users) {
      dispatch(setUsers(users))
    }
  }, [dispatch, users, localUsersData])
  
  useEffect(() => {
    if (localEventsData && Array.isArray(localEventsData)) {
      dispatch(setEvents(localEventsData))
    } else if (currentEvents) {
      dispatch(setEvents(currentEvents))
    }
  }, [dispatch, currentEvents, localEventsData])

  const submitForm = (event: IEvent) => {
    dispatch(createEvent(event))
    addEvent(event)
    setIsModalOpen(false)
  }

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleCancelModal = () => {
    setIsModalOpen(false)
  }
  
  return (
    <Layout>
      <EventCalendar events={currentEvents}/>
      <Row justify={"center"}>
        <Button type="primary" onClick={showModal}>Добавить событие</Button>
      </Row>
      <Modal title={"Basic Modal"} open={isModalOpen} onCancel={handleCancelModal} footer={[]}>
        <EventForm guests={guests} submit={(event: IEvent) => submitForm(event)}/>
      </Modal>
    </Layout>
  )
}

export default EventPage