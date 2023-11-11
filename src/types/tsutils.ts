// type Point = { x: number; y: number };
// type P = keyof Point;

// type Mapish = {
//   [k: string]: boolean | null;
// };
// type MK = keyof Mapish;

type mapType = {
  message: string;
  success: boolean;
  error: boolean;
};

const mapValue = {
  message: "Completed",
  success: true,
  error: null,
};

type MK = keyof mapType;
type MT = typeof mapValue;
// type _MKT = keyof typeof mapValue;
type MKT = keyof MT;

// type errorType = mapType["error"];
type ValuesOf<T> = T[keyof T];

// type VOF_mapType = ValuesOf<mapType>;
type VOF_mapValue = ValuesOf<typeof mapValue>;

export type Nullablelify<T> = {
  [P in keyof T]: T[P] | null;
};
export type Optionalablify<T> = {
  [P in keyof T]?: T[P];
};

type NullableMapType = Nullablelify<mapType>;
type OptionalableMapType = Optionalablify<mapType>;
type OptionalabllyNullableMapType = Optionalablify<NullableMapType>;

export type Merge<T1, T2> = {
  [K in keyof T1 | keyof T2]:
    | (T1 extends Partial<Record<K, any>> ? T1[K] : never)
    | (T2 extends Partial<Record<K, any>> ? T2[K] : never);
};
