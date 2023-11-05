import { camelize, underscored } from "underscore.string";

export function labelToId(label?: string) {
  return underscored(label!.toLowerCase()) ?? "";
}
