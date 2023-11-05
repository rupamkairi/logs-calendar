import { Fragment, ReactNode } from "react";
import { Field } from "houseform";
import { Icon } from "@iconify/react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { PlainTextPlugin } from "@lexical/react/LexicalPlainTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";

type EditorProps = {
  label?: string;
  placeholder?: string;
  start?: boolean;
  finish?: boolean;
  children?: ReactNode | JSX.Element;
};

const theme = {};

export default function Editor({ label, placeholder }: EditorProps) {
  const initialConfig = {
    namespace: "Editor",
    theme,
    onError,
  };

  return (
    <Field name={label!} initialValue={""}>
      {({ value, setValue, onBlur, errors }) => (
        <Fragment>
          <div className="flex items-center gap-2 mb-2">
            <label htmlFor={label} className="">
              <Icon className="h-5 w-5" icon={"gg:details-more"} />
            </label>
            {/* <textarea
              id={label}
              className="textarea px-4 input-sm w-full leading-tight"
              rows={3}
              value={value}
              onBlur={onBlur}
              onChange={(e) => setValue(e.target.value)}
              placeholder={placeholder ?? label ?? ""}
            ></textarea> */}
            <LexicalComposer initialConfig={initialConfig}>
              <PlainTextPlugin
                contentEditable={
                  <ContentEditable className="textarea px-4 input-sm w-full leading-tight" />
                }
                placeholder={<span></span>}
                ErrorBoundary={LexicalErrorBoundary}
              />
              <HistoryPlugin />
            </LexicalComposer>
            {errors.map((error) => (
              <p key={error}>{error}</p>
            ))}
          </div>
        </Fragment>
      )}
    </Field>
  );
}

function onError(error: any) {
  console.error(error);
}
