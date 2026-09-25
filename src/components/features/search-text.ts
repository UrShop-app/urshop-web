/**
 * Normalises text for the feature search: lower case, punctuation to spaces. Shared by the server
 * (building each item's `searchText`) and the explorer (the visitor's query).
 */
export function normalizeSearchText(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim();
}
