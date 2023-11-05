import { Fragment, ReactNode, useMemo } from "react";
import { Field } from "houseform";
import { Icon } from "@iconify/react";
import { labelToId } from "@/utils/stringify";

type FilePickerProps = {
  label?: string;
  placeholder?: string;
  start?: boolean;
  finish?: boolean;
  children?: ReactNode | JSX.Element;
};

export default function FilePicker({ label, placeholder }: FilePickerProps) {
  const id = useMemo(() => labelToId(label!), [label]);
  return (
    <Field name={id} initialValue={""}>
      {({ value, setValue, onBlur, errors }) => (
        <Fragment>
          <div className="flex items-center gap-2 mb-2">
            <label htmlFor={id} className="">
              <Icon className="h-5 w-5" icon={"mdi:paperclip"} />
            </label>
            <input
              id={id}
              type="file"
              className="file-input file-input-ghost file-input-sm rounded w-full"
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
