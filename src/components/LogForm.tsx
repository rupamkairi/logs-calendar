import { Field, Form } from "houseform";
import { Fragment } from "react";
import { Icon } from "@iconify/react";

export default function LogForm() {
  return (
    <div className="card w-80 bg-base-100 rounded-xl shadow-xl shadow-base-300 overflow-hidden">
      <div className="bg-base-300 px-4 py-1">
        <div className="flex justify-between items-center">
          <p className="text-sm">Log</p>
          <button className="p-1 rounded-full">
            <Icon className="h-5 w-5" icon={"ic:sharp-close"} />
          </button>
        </div>
      </div>
      <div className="card-body p-4">
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            console.log("submit");
          }}
        >
          {({ errors }) => (
            <Fragment>
              <Field name="title" initialValue={""}>
                {({ value, setValue, onBlur, errors }) => (
                  <Fragment>
                    <div className="flex items-center gap-2 mb-2">
                      <input
                        id="title"
                        className="input rounded w-full"
                        autoFocus={true}
                        value={value}
                        onBlur={onBlur}
                        onChange={(e) => setValue(e.target.value)}
                        placeholder={"Title"}
                      />
                      {errors.map((error) => (
                        <p key={error}>{error}</p>
                      ))}
                    </div>
                  </Fragment>
                )}
              </Field>
              <Details />
              <Attachment />
              <AddTime />
              <button className="btn btn-primary">Save</button>
            </Fragment>
          )}
        </Form>
      </div>
    </div>
  );
}

function Details() {
  return (
    <Field name="details" initialValue={""}>
      {({ value, setValue, onBlur, errors }) => (
        <Fragment>
          <div className="flex items-center gap-2 mb-2">
            <label htmlFor="details" className="">
              <Icon className="h-5 w-5" icon={"gg:details-more"} />
            </label>
            <textarea
              id="details"
              className="textarea input-sm w-full leading-tight"
              rows={3}
              value={value}
              onBlur={onBlur}
              onChange={(e) => setValue(e.target.value)}
              placeholder={"Details"}
            ></textarea>
            {errors.map((error) => (
              <p key={error}>{error}</p>
            ))}
          </div>
        </Fragment>
      )}
    </Field>
  );
}

function Attachment() {
  return (
    <Field name="attachment" initialValue={""}>
      {({ value, setValue, onBlur, errors }) => (
        <Fragment>
          <div className="flex items-center gap-2 mb-2">
            <label htmlFor="attachment" className="">
              <Icon className="h-5 w-5" icon={"mdi:paperclip"} />
            </label>
            <input
              id="attachment"
              type="file"
              className="file-input file-input-ghost file-input-sm rounded w-full"
              value={value}
              onBlur={onBlur}
              onChange={(e) => setValue(e.target.value)}
              placeholder={"Attachment"}
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

function AddTime() {
  return (
    <Field name="add-time" initialValue={""}>
      {({ value, setValue, onBlur, errors }) => (
        <Fragment>
          <div className="flex items-center gap-2 mb-2">
            <label htmlFor="add-time" className="">
              <Icon className="h-5 w-5" icon={"ph:clock-countdown-fill"} />
            </label>
            <input
              id="add-time"
              className="input input-sm rounded w-full"
              value={value}
              onBlur={onBlur}
              onChange={(e) => setValue(e.target.value)}
              placeholder={"Add Time"}
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
