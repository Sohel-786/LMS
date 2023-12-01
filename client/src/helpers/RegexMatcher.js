export function isEmail(string) {
  return string.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
}

export function isValidPassword(string) {
  return string.match(/^(?=.*[0-9])(?=.*[!@#$%^&*(_)])[a-zA-Z0-9!@#$%^&*(_)]{6,16}$/);
}

export function isValidPhoneNumber(string) {
  const regex = new RegExp(/^[+]{1}(?:[0-9\-\(\)\/\.]\s?){6,15}[0-9]{1}$/);
  return regex.test(string);
}
