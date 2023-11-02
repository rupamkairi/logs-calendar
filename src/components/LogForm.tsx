import { Field, Form, useFormContext } from "houseform";
import { Fragment } from "react";

export default function LogForm() {
  return (
    <div className="w-64 h-96 p-4">
      <div className="my-8 mb-2">
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            console.log("submit");
          }}
        >
          {({ errors }) => (
            <Fragment>
              <Field name="comment" initialValue={""}>
                {({ value, setValue, onBlur }) => (
                  <Fragment>
                    <input
                      className="p-2 w-full"
                      value={value}
                      onBlur={onBlur}
                      onChange={(e) => setValue(e.target.value)}
                      placeholder={"Comment"}
                    />
                    {errors.map((error) => (
                      <p key={error}>{error}</p>
                    ))}
                  </Fragment>
                )}
              </Field>
            </Fragment>
          )}
        </Form>
      </div>
    </div>
  );
}
