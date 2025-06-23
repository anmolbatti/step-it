import DateTimePicker from '@react-native-community/datetimepicker';

export default DatePicker = ({ display, value, mode, onChange, onConfirm, onCancel }) => {
    return (
        <DateTimePicker 
            display={display}
            value={value} 
            mode={mode} 
            onChange={onChange}
            onConfirm={onConfirm}
            onCancel={onCancel}
        />
    )
}