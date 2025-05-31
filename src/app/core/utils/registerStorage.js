export function saveRegisterData(data) {
   const prevData = JSON.parse(localStorage.getItem("registerData") || "{}");
   localStorage.setItem("registerData", JSON.stringify({ ...prevData, ...data }));
}

export function getRegisterData() {
   return JSON.parse(localStorage.getItem("registerData") || "{}");
}

export function clearRegisterData() {
   localStorage.removeItem("registerData");
}
 