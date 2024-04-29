import React, {useState} from 'react';
import {DATE_FORMAT, EventItem} from '../context/EventItems';
import {Button, Datepicker, Input, Layout, NativeDateService} from '@ui-kitten/components';

const styles = {
  screen: {
    padding: 10,
    // flexGrow: 1,
  },
  checkBox: {
    paddingTop: 8,
    paddingBottom: 10,
  },
  calendar: {
    // flexGrow: 1,
    // marginTop: 5,
    marginBottom: 5,
  },
};

const formatDateService = new NativeDateService('cn', {
  i18n: {
    dayNames: {
      short: ['日', '一', '二', '三', '四', '五', '六'],
      long: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
    },
    monthNames: {
      short: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
      long: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
    },
  },
  format: DATE_FORMAT,
});

export default function Editor(props: {eventItem?: EventItem; onSave: (eventItem: Omit<EventItem, 'id'>) => void}) {
  const [title, setTitle] = useState(props.eventItem?.title);
  const [date, setDate] = useState(props.eventItem?.date);

  return (
    <Layout style={{padding: 10}}>
      <Input
        label="事件"
        onChangeText={t => {
          setTitle(t);
        }}
        value={title}
        status={title !== undefined && title.length === 0 ? 'danger' : 'basic'}
        style={{marginBottom: 20}}
      />
      <Datepicker
        label="日期"
        placeholder={'请选日期'}
        min={new Date(0)}
        max={new Date(6 * 10e11)}
        date={date ? formatDateService.parse(date, DATE_FORMAT) : undefined}
        status={date !== undefined && date.length === 0 ? 'danger' : 'basic'}
        dateService={formatDateService}
        onSelect={nextDate => {
          const dateStr = formatDateService.format(nextDate, DATE_FORMAT);
          setDate(dateStr);
        }}
        style={{marginBottom: 20}}
      />
      <Button
        disabled={!title || !date}
        onPress={() => {
          if (title && date) {
            props.onSave({tags: [], ...props.eventItem, title, date});
          }
        }}>
        Save
      </Button>
    </Layout>
  );
}
