import { Field, Form } from "houseform";
import { Fragment } from "react";
import { Icon } from "@iconify/react";
import FilePicker from "./forms/FilePicker";
import TimePicker from "./forms/TimePicker";
import Editor from "./forms/Editor";

export default function LogForm() {
  return (
    <div className="card w-80 bg-base-100 rounded-xl shadow-xl shadow-base-300 overflow-hidden">
      <div className="bg-base-300 px-4 py-1">
        <div className="flex justify-between items-center">
          <p className="text-sm">Log Form</p>
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
              <StartTime />
              <FinishTime />
              <button className="btn btn-primary">Save</button>
            </Fragment>
          )}
        </Form>
      </div>
    </div>
  );
}

function Details() {
  return <Editor label="Details" />;
}

function Attachment() {
  return <FilePicker label="Attachments" />;
}

function StartTime() {
  return <TimePicker label="Start time" start={true} />;
}

function FinishTime() {
  return <TimePicker label="Finish time" finish={true} />;
}
