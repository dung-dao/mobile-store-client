//Fake ajax

function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function login() {
  //login
  await timeout(1000);
  throw new Error("something");
  return { username: "John", password: "123" };
}
