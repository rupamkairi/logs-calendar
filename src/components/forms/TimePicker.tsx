import { Fragment, ReactNode } from "react";
import { Field } from "houseform";
import { Icon } from "@iconify/react";

type TimePickerProps = {
  label?: string;
  placeholder?: string;
  start?: boolean;
  finish?: boolean;
  children?: ReactNode | JSX.Element;
};

export default function TimePicker({
  label,
  placeholder,
  start,
  finish,
}: TimePickerProps) {
  return (
    <Field name={label!} initialValue={""}>
      {({ value, setValue, onBlur, errors }) => (
        <Fragment>
          <div className="flex items-center gap-2 mb-2">
            <label htmlFor={label} className="">
              {start && (
                <Icon
                  className="h-5 w-5"
                  icon={"material-symbols:clock-loader-20"}
                />
              )}
              {finish && (
                <Icon
                  className="h-5 w-5"
                  icon={"material-symbols:clock-loader-80"}
                />
              )}
            </label>
            <input
              id={label}
              className="input input-sm px-4 rounded w-full"
              value={value}
              onBlur={onBlur}
              onChange={(e) => setValue(e.target.value)}
              placeholder={placeholder ?? label ?? ""}
            />
            {errors.map((error) => (
              <p key={error}>{error}</p>
            ))}
          </div>
        </Fragment>
      )}
    </Field>
  );
}
