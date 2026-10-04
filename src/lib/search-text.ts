/**
 * Normalises text for the on-page searches (Features explorer, FAQ): lower case, punctuation to
 * spaces. Shared by the server (building each item's search text) and the client (the visitor's
 * query).
 */
export function normalizeSearchText(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim();
}
