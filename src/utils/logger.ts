const nativeLog = console.log;
const nativeWarn = console.warn;
const nativeError = console.error;

export function info(...args: unknown[]): void {
  nativeLog(
    "%cINFO",
    "background:#4CAF50;color: #111;padding:0 5px;border-radius:10px",
    ...args,
  );
}

export function warn(...args: unknown[]): void {
  nativeWarn(
    "%cWRN",
    "background:#FFC107;color: #111;padding:0 5px;border-radius:10px",
    ...args,
  );
}

function error(...args: unknown[]): void {
  nativeError(
    "%cERR",
    "background:#F44336;color: #111;padding:0 5px;border-radius:10px",
    ...args,
  );
}

export function debug(...args: unknown[]): void {
  nativeLog(
    "%cDEBG",
    "background:#2196F3;color: #111;padding:0 5px;border-radius:10px",
    ...args,
  );
}

console.log = info;
console.warn = warn;
console.error = error;
console.debug = debug;
