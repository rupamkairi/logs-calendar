import { Fragment, ReactNode, useMemo } from "react";
import { Field } from "houseform";
import { Icon } from "@iconify/react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { PlainTextPlugin } from "@lexical/react/LexicalPlainTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { labelToId } from "@/utils/stringify";

type EditorProps = {
  label?: string;
  placeholder?: string;
  start?: boolean;
  finish?: boolean;
  children?: ReactNode | JSX.Element;
};

const theme = {};

export default function Editor({ label, placeholder }: EditorProps) {
  const id = useMemo(() => labelToId(label!), [label]);

  const initialConfig = {
    namespace: "Editor",
    theme,
    onError,
  };

  return (
    <Field name={id} initialValue={""}>
      {({ value, setValue, onBlur, errors }) => (
        <Fragment>
          <div className="flex items-center gap-2 mb-2">
            <label htmlFor={id} className="">
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
                  <ContentEditable
                    id={id}
                    className="textarea px-4 input-sm w-full leading-tight"
                  />
                }
                placeholder={<div>{}</div>}
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
