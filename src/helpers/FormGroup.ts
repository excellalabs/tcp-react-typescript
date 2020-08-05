export function addFormGroup(namespace = "") {
  return function withFormGroup(fieldName: string): string {
    return namespace ? `${namespace}.${fieldName}` : fieldName;
  };
}

export default addFormGroup;
