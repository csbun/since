import {useListStorage} from './Storage';

export type EventItem = {
  id: string;
  title: string;
  date: string;
  description?: string;
  tags: string[];
};

export const DATE_FORMAT = 'YYYY-MM-DD';
export const EVENT_ITEMS_STORAGE_KEY = 'event_items';

export function useEventItems() {
  const {
    listItems,
    getItemById,
    prependItem,
    appendItem,
    editItem,
    removeItem,
  } = useListStorage<EventItem>(EVENT_ITEMS_STORAGE_KEY);

  return {
    eventItems: listItems,
    getItemById,
    prependItem,
    appendItem,
    editItem,
    removeItem,
  };
}
