import { ObjectTypes } from "@/constants/ObjectTypes";

export const isValidObjectTypeName = (name: string | string[]): boolean => {
  return Object.values(ObjectTypes).some((obj) => obj.name === name);
};

// Create a reverse mapping for codes
export const NameToCodeMap = Object.fromEntries(
    Object.values(ObjectTypes).map(obj => [obj.name, obj.code])
);