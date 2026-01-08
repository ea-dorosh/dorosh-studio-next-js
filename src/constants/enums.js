
export const customerNewStatusEnum = {
  existing: 0,
  new: 1,
};

// How customer selected employee during public booking
export const employeeSelectionTypeEnum = {
  any: `any`, // Customer chose "Egal / Alle Mitarbeiter"
  specific: `specific`, // Customer selected one specific employee
  multiple: `multiple`, // Customer selected multiple employees (but not all)
};
