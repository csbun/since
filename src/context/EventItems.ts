import {createContext, useContext} from 'react';
import uid from '../utils/uid';

export type EventItem = {
  id: string;
  title: string;
  date: string;
  description?: string;
  tags: string[];
};

export const DATE_FORMAT = 'YYYY-MM-DD';

export const EventItemsContext = createContext<{
  eventItems: EventItem[];
  setEventItems: React.Dispatch<React.SetStateAction<EventItem[]>>;
}>({
  eventItems: [],
  setEventItems: () => {},
});

export function useEventItems() {
  const {eventItems, setEventItems} = useContext(EventItemsContext);

  function getById(id: string) {
    return eventItems.find(item => item.id === id);
  }
  function prependEventItem(eventItem: Omit<EventItem, 'id'>) {
    const newItem = {id: uid(), ...eventItem};
    setEventItems(prev => [newItem, ...prev]);
  }

  function appendEventItem(eventItem: Omit<EventItem, 'id'>) {
    const newItem = {id: uid(), ...eventItem};
    setEventItems(prev => [...prev, newItem]);
  }

  function removeEventItem(id: string) {
    setEventItems(prev => prev.filter(item => item.id !== id));
  }

  return {
    eventItems,
    getById,
    prependEventItem,
    appendEventItem,
    removeEventItem,
  };
}
