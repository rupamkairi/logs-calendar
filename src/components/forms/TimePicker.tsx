import { Fragment, ReactNode, useMemo } from "react";
import { Field } from "houseform";
import { Icon } from "@iconify/react";
import { labelToId } from "@/utils/stringify";

type TimePickerProps = {
  label?: string;
  placeholder?: string;
  start?: boolean;
  end?: boolean;
  children?: ReactNode | JSX.Element;
};

export default function TimePicker({
  label,
  placeholder,
  start,
  end,
}: TimePickerProps) {
  const id = useMemo(() => labelToId(label!), [label]);
  return (
    <Field name={id} initialValue={""}>
      {({ value, setValue, onBlur, errors }) => (
        <Fragment>
          <div className="flex items-center gap-2 mb-2">
            <label htmlFor={id} className="">
              {start && (
                <Icon
                  className="h-5 w-5"
                  icon={"material-symbols:clock-loader-20"}
                />
              )}
              {end && (
                <Icon
                  className="h-5 w-5"
                  icon={"material-symbols:clock-loader-80"}
                />
              )}
            </label>
            <input
              id={id}
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
