import React, {useState} from 'react';
import {DATE_FORMAT, EventItem, useEventItems} from '../context/EventItems';
import {
  Button,
  Datepicker,
  Input,
  Layout,
  NativeDateService,
} from '@ui-kitten/components';
import {useNavigation} from '@react-navigation/native';

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

export default function Editor(props: {
  eventItem?: EventItem;
  onSave: (eventItem: Omit<EventItem, 'id'>) => void;
}) {
  const [title, setTitle] = useState(props.eventItem?.title);
  const [date, setDate] = useState(props.eventItem?.date);

  const formatDateService = new NativeDateService('zh', {format: DATE_FORMAT});

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

// class Editor extends Component {

//   static propTypes = {
//     updateItem: PropTypes.func.isRequired,
//     addItem: PropTypes.func.isRequired,
//     navigation: navigationPropType.isRequired,
//     currentUser: currentUserPropType.isRequired,
//   }

//   static navigationOptions = {
//     title: 'Edit',
//   }

//   constructor(props) {
//     super(props);
//     // extend props from navigate when edit existed item
//     this.state = Object.assign({
//       title: '',
//       // desc: '',
//       date: toMidnightTimeStamp(new Date()),
//       stopTracking: false,
//     }, props.navigation.state.params);
//     this.isEdit = !!this.state.uniqueKey;
//   }

//   onChangeStopTracking = () => {
//     let { endDate, stopTracking } = this.state;
//     stopTracking = !stopTracking; // toggle

//     if (stopTracking && !endDate) {
//       endDate = toMidnightTimeStamp(new Date());
//     }
//     this.setState({ stopTracking, endDate });
//   }

//   onSave = () => {
//     if (!this.state.title) {
//       return;
//     }
//     const { uid } = this.props.currentUser;
//     if (this.isEdit) {
//       this.props.updateItem(uid, this.state);
//     } else {
//       this.props.addItem(uid, this.state);
//     }
//     this.props.navigation.goBack();
//   }

//   render() {
//     const stopTrackingCheckbox = this.isEdit ? (<CheckBox
//       style={styles.checkBox}
//       rightText="Stop tracking this Event"
//       isChecked={this.state.stopTracking}
//       onClick={this.onChangeStopTracking}
//     />) : null;
//     const endDatePicker = this.state.stopTracking ? (<DatePicker
//       style={styles.calendar}
//       defaultDate={this.state.endDate}
//       onChange={endDate => this.setState({ endDate })}
//     />) : null;
//     return (<Screen style={styles.screen}>
//       <TextInput
//         placeholder="Title"
//         onChangeText={title => this.setState({ title })}
//         value={this.state.title}
//       />
//       <DatePicker
//         style={styles.calendar}
//         defaultDate={this.state.date}
//         forceShowCalendar={!this.isEdit}
//         onChange={date => this.setState({ date })}
//       />
//       { stopTrackingCheckbox }
//       { endDatePicker }
//       <Button
//         disabled={!this.state.title}
//         onPress={this.onSave}
//         accessibilityLabel="Press to save"
//       ><Text style={{ color: this.state.title ? '#000' : '#aaa' }}>Save</Text></Button>
//     </Screen>);
//   }
// }

// function mapStateToProps(state) {
//   return { currentUser: state.currentUser };
// }

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({ addItem, updateItem }, dispatch);
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Editor);
