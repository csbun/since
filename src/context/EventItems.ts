import {createContext, useContext} from 'react';
import uid from '../utils/uid';
import {setItem} from './Storage';

export type EventItem = {
  id: string;
  title: string;
  date: string;
  description?: string;
  tags: string[];
};

export const DATE_FORMAT = 'YYYY-MM-DD';
export const EVENT_ITEMS_STORAGE_KEY = 'event_items';

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
    setEventItems(prev => {
      const newList = [newItem, ...prev];
      console.log(newList);
      setItem(EVENT_ITEMS_STORAGE_KEY, newList).then();
      return newList;
    });
  }

  function appendEventItem(eventItem: Omit<EventItem, 'id'>) {
    const newItem = {id: uid(), ...eventItem};
    setEventItems(prev => {
      const newList = [...prev, newItem];
      setItem(EVENT_ITEMS_STORAGE_KEY, newList).then();
      return newList;
    });
  }

  function removeEventItem(id: string) {
    setEventItems(prev => {
      const newList = prev.filter(item => item.id !== id);
      setItem(EVENT_ITEMS_STORAGE_KEY, newList).then();
      return newList;
    });
  }

  function editEventItem(newItem: EventItem) {
    setEventItems(prev => {
      const newList = prev.map(item => {
        if (item.id === newItem.id) {
          return newItem;
        }
        return item;
      });
      setItem(EVENT_ITEMS_STORAGE_KEY, newList).then();
      return newList;
    });
  }

  return {
    eventItems,
    getById,
    prependEventItem,
    appendEventItem,
    editEventItem,
    removeEventItem,
  };
}
