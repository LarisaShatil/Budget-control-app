export function sanitizeMoneyInput(raw: string): string {
  const normalized = raw.replace(/,/g, ".").trim();
  const allowed = normalized.replace(/[^\d.]/g, "");

  if (allowed === "") return "";

  const firstDot = allowed.indexOf(".");
  if (firstDot === -1) {
    return allowed;
  }

  const intPartRaw = allowed.slice(0, firstDot);
  const fracRaw = allowed.slice(firstDot + 1).replace(/\./g, "");

  const intPart = intPartRaw === "" ? "0" : intPartRaw;
  const frac = fracRaw.slice(0, 2);

  return frac.length ? `${intPart}.${frac}` : `${intPart}.`;
}

export function parseMoneyInput(value: string): number {
  const v = value.trim();
  if (v === "" || v === ".") return 0;
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
}

