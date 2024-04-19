import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import './datepickercalendar.scss'

const Calendar = ({ selectedDate, onDateChange }) => {

  const dateData = localStorage.getItem("calDate")
  const [selectedDateState, setSelectedDateState] = useState(selectedDate);

  useEffect(() => {
    setSelectedDateState(selectedDate); // Update selected date when prop changes
  }, [selectedDate]);

  const handleDateChange = (date) => {
    setSelectedDateState(date);
    onDateChange(date); // Call the callback function with the selected date
  };

  return (
    <div className="calendar-date-selector">
      <DatePicker
        selected={selectedDateState}
        onChange={handleDateChange}
        dateFormat="MM/dd/yyyy"
        isClearable
        showYearDropdown
        scrollableMonthYearDropdown
        placeholderText="Select a date"
      />

    </div>
  );
};

export default Calendar
