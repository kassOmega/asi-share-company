export function capitalizeFullName(fullName: string) {
  let firstName = fullName;
  let lastName = "";
  if (fullName.includes(" ")) {
    firstName = fullName.split(" ")[0];
    lastName = fullName.split(" ")[1];
  }
  const capitalizedFirstName =
    firstName.charAt(0).toUpperCase() + firstName.slice(1);
  const capitalizedLastName = lastName
    ? lastName.charAt(0).toUpperCase() + lastName.slice(1)
    : "";

  return `${capitalizedFirstName} ${capitalizedLastName}`;
}
