export function isNil(v) {
  return v === undefined || v === null;
}

export function buildFormDataFromObject(formData, data, parentKey) {
  if (Array.isArray(data)) {
    data.forEach((el) => {
        buildFormDataFromObject(formData, el, parentKey + '[]');
    });
  } else if (data && typeof data === 'object' && !(data instanceof File)) {
    Object.keys(data).forEach((key) => {
        buildFormDataFromObject(formData, data[key], parentKey ? `${parentKey}[${key}]` : key);
    });
  } else {
    if (isNil(data)) {
      return;
    }

    let value = typeof data === 'boolean' || typeof data === 'number' ? data.toString() : data;
    formData.append(parentKey, value);
  }
}
