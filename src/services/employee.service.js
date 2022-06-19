import employees from "../data/employees.data";

const getEmployees = () => {
  return employees;
};

const getEmployeeById = (id) => {
  return employees.find((employee) => employee.id === parseInt(id));
};

export { getEmployees, getEmployeeById };
