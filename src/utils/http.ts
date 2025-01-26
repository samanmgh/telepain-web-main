export function isEmpty(value: any) {
  const type = typeof value;
  if ((value !== null && type === "object") || type === "function") {
    const properties = Object.keys(value);
    return properties.length === 0;
  } else if (type === "string" && value.trim().length === 0) {
    return true;
  }
  return !value;
}

export function objectToFormData(obj: any, fd?: FormData) {
  const formData = fd || new FormData();

  const isUndefined = (value: any) => value === undefined;
  const isObject = (value: any) => value === Object(value);
  const isBlob = (value: any) => {
    return (
      value !== null &&
      typeof value.size === "number" &&
      typeof value.type === "string" &&
      typeof value.slice === "function"
    );
  };
  const isFile = (value: any) => {
    return (
      isBlob(value) &&
      typeof value.lastModified === "number" &&
      typeof value.name === "string"
    );
  };
  const isDate = (value: any) => value instanceof Date;

  if (isUndefined(obj) || !isObject(obj)) {
    return formData;
  }

  Object.keys(obj).forEach((key) => {
    const value = obj[key];
    if (value === "SKIP_FIELD") {
      return;
    }
    if (Array.isArray(value)) {
      value.forEach((entry) => {
        formData.append(key, entry);
      });
    } else if (
      isObject(value) &&
      !isEmpty(value) &&
      !isFile(value) &&
      !isDate(value)
    ) {
      objectToFormData(value, formData);
    } else {
      formData.append(key, value);
    }
  });

  return formData;
}
export function addHeader(
  hs: HeadersInit | undefined,
  key: string,
  value: string,
): HeadersInit {
  if (hs instanceof Headers) {
    if (hs.get(key)) hs.set(key, value);
    else hs.append(key, value);
  } else if (hs instanceof Array) {
    const h = hs.find((f) => f[0] === key);
    if (h) {
      h[1] = value;
    } else hs.push([key, value]);
  } else {
    // eslint-disable-next-line no-param-reassign
    if (!hs) hs = {};
    hs[key] = value;
  }
  return hs;
}
export function getHeader(hs: HeadersInit | undefined, key: string): string {
  let res = "";
  if (hs instanceof Headers) {
    if (hs.has(key)) res = hs.get(key) ?? "";
  } else if (hs instanceof Array) {
    const h = hs.find((f) => f[0] === key);
    if (h) {
      res = h[1];
    }
  } else if (hs) {
    res = hs[key];
  }
  return res;
}
