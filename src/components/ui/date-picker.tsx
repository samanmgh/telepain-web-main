import React, {useState, useEffect} from "react";
import {
  format,
  subMonths,
  addMonths,
  subYears,
  addYears,
  isEqual,
  getDaysInMonth,
  getDay
} from "date-fns";
import {CalenderIcon, ChevronLeftIcon, ChevronRightIcon} from "@/assets/icons";

type DatepickerType = "date" | "month" | "year";

export default function DatePicker({error, onChange, label}:
{
  label?: string;
  error?: string;
  onChange?: (value: string) => void;
}) {
  const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  const [dayCount, setDayCount] = useState<Array<number>>([]);
  const [blankDays, setBlankDays] = useState<Array<number>>([]);
  const [showDatepicker, setShowDatepicker] = useState(false);
  const [datepickerHeaderDate, setDatepickerHeaderDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [type, setType] = useState<DatepickerType>("date");

  useEffect(() => {
    getDayCount(datepickerHeaderDate);
  }, [datepickerHeaderDate]);

  const decrement = () => {
    switch (type) {
      case "date":
        setDatepickerHeaderDate((prev) => subMonths(prev, 1));
        break;
      case "month":
        setDatepickerHeaderDate((prev) => subYears(prev, 1));
        break;
      case "year":
        setDatepickerHeaderDate((prev) => subMonths(prev, 1));
        break;
    }
  };

  const increment = () => {
    switch (type) {
      case "date":
        setDatepickerHeaderDate((prev) => addMonths(prev, 1));
        break;
      case "month":
        setDatepickerHeaderDate((prev) => addYears(prev, 1));
        break;
      case "year":
        setDatepickerHeaderDate((prev) => subMonths(prev, 1));
        break;
    }
  };

  const isToday = (date: number) =>
    selectedDate && isEqual(
      new Date(selectedDate.getFullYear(), selectedDate.getMonth(), date),
      selectedDate
    );

  const setDateValue = (date: number) => () => {
    setSelectedDate(
      new Date(
        datepickerHeaderDate.getFullYear(),
        datepickerHeaderDate.getMonth(),
        date
      )
    );
    if (onChange) {
      const formatedDate = format(new Date(
        datepickerHeaderDate.getFullYear(),
        datepickerHeaderDate.getMonth(),
        date
      ), "yyyy-MM-dd")
      onChange(formatedDate);
    }
    setShowDatepicker(false);
  };

  const getDayCount = (date: Date) => {
    const daysInMonth = getDaysInMonth(date);

    // find where to start calendar day of week
    const dayOfWeek = getDay(new Date(date.getFullYear(), date.getMonth(), 1));
    const blankdaysArray = [];
    for (let i = 1; i <= dayOfWeek; i++) {
      blankdaysArray.push(i);
    }

    const daysArray = [];
    for (let i = 1; i <= daysInMonth; i++) {
      daysArray.push(i);
    }

    setBlankDays(blankdaysArray);
    setDayCount(daysArray);
  };

  const isSelectedMonth = (month: number) =>
    selectedDate && isEqual(
      new Date(selectedDate.getFullYear(), month, selectedDate.getDate()),
      selectedDate
    );

  const setMonthValue = (month: number) => () => {
    setDatepickerHeaderDate(
      new Date(
        datepickerHeaderDate.getFullYear(),
        month,
        datepickerHeaderDate.getDate()
      )
    );
    setType("date");
  };

  const toggleDatepicker = () => setShowDatepicker((prev) => !prev);

  const showMonthPicker = () => setType("month");

  const showYearPicker = () => setType("date");

  return (
    <div>
      <label htmlFor='datepicker' className='text-gray-100'>
        {label}
      </label>
      <div className="relative">
        <input type="hidden" name="date"/>
        <input
          type="text"
          readOnly
          className={`cursor-pointer w-full h-[56px] mt-3 rounded-xl border-gray-100 focus:ring-0 ${error ? `border-red-500 text-red-500` : `border-gray-100`}`}
          aria-describedby="birth_date-error"
          defaultValue={selectedDate && format(selectedDate, "yyyy-MM-dd")}
          onClick={toggleDatepicker}
        />
        <div
          className="cursor-pointer absolute right-4 top-[40%]"
          onClick={toggleDatepicker}
        >
          <CalenderIcon/>
        </div>

        {showDatepicker && (
          <div className="bg-white rounded-md shadow p-3 absolute top-1/6 right-0 w-[276px]">
            <div className="flex justify-between items-center mb-4">
              <button
                type="button"
                className="transition ease-in-out duration-100 inline-flex cursor-pointer hover:bg-gray-50 p-[6px] rounded-md border border-[#E1E3E3]"
                onClick={decrement}
              >
                <ChevronLeftIcon/>
              </button>

              <div className='flex'>
                {type === "date" && (
                  <div
                    onClick={showMonthPicker}
                    className="p-1 me-1 text-sm font-medium cursor-pointer hover:bg-gray-50 rounded-md"
                  >
                    <p className="text-center">
                      {format(datepickerHeaderDate, "MMM")}
                    </p>
                  </div>
                )}
                <div
                  onClick={showYearPicker}
                  className="p-1 text-sm font-medium cursor-pointer hover:bg-gray-50 rounded-md"
                >
                  <p className="text-center">
                    {format(datepickerHeaderDate, "yyyy")}
                  </p>
                </div>
              </div>

              <button
                type="button"
                className="transition ease-in-out duration-100 inline-flex cursor-pointer hover:bg-gray-50 p-[6px] rounded-md border border-[#E1E3E3]"
                onClick={increment}
              >
                <ChevronRightIcon/>
              </button>
            </div>

            {type === "date" && (
              <>
                <div className="flex mb-2">
                  {DAYS.map((day, i) => (
                    <div
                      key={i}
                      className="w-9"
                    >
                      <div className="text-gray-100 text-center text-[12.8px]">
                        {day}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap">
                  {blankDays.map((elem, i) => (
                    <div
                      key={i}
                      className="w-9 h-9 mb-2 cursor-pointer text-sm rounded-md flex items-center justify-center"
                    ></div>
                  ))}

                  {dayCount.map((d, i) => (
                    <div
                      key={i}
                      onClick={setDateValue(d)}
                      className={`w-9 h-9 mb-2 cursor-pointer text-sm rounded-md transition ease-in-out duration-100 flex items-center justify-center ${
                        isToday(d)
                          ? "bg-secondary-100 text-white"
                          : "hover:text-white hover:bg-secondary-100"
                      }`}
                    >
                      {d}
                    </div>
                  ))}
                </div>
              </>
            )}

            {type === "month" && (
              <div className="flex flex-wrap -mx-1">
                {Array(12)
                  .fill(null)
                  .map((_, i) => (
                    <div
                      key={i}
                      onClick={setMonthValue(i)}
                      style={{width: "25%"}}
                    >
                      <div
                        className={`cursor-pointer p-5 font-medium text-center text-sm rounded-md hover:bg-gray-50 ${
                          isSelectedMonth(i)
                            ? "bg-secondary-100 text-white"
                            : "hover:bg-secondary-100 hover:text-white"
                        }`}
                      >
                        {format(
                          new Date(
                            datepickerHeaderDate.getFullYear(),
                            i,
                            datepickerHeaderDate.getDate()
                          ),
                          "MMM"
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            )}{" "}

            {type === "year" && (
              <div className="flex flex-wrap -mx-1">
                {Array(12)
                  .fill(null)
                  .map((_, i) => (
                    <div
                      key={i}
                      onClick={() =>
                        selectedDate && setSelectedDate(
                          new Date(
                            datepickerHeaderDate.getFullYear() + i - 6,
                            selectedDate.getMonth(),
                            selectedDate.getDate()
                          )
                        )
                      }
                      style={{width: "25%"}}
                    >
                      <div
                        className={`cursor-pointer p-5 font-medium text-center text-sm rounded-md hover:bg-gray-50 ${
                          selectedDate && (datepickerHeaderDate.getFullYear() ===
                            selectedDate.getFullYear() + i - 6)
                            ? "bg-secondary-100 text-white"
                            : "hover:bg-secondary-100 hover:text-white"
                        }`}
                      >
                        {datepickerHeaderDate.getFullYear() + i - 6}
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        )}
      </div>
      <div className="text-sm mt-2 text-red-500">{error}</div>
    </div>
  );
}
