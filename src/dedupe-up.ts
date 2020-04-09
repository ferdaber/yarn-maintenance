import { Lockfile } from "@yarnpkg/lockfile";

/**
 * Parse the file
 * Reformat object such that for each unique package name, get all of the
 * resolved versions, and all of the semver requirements
 *
 * OPTION A (smart-ish):
 * Get the highest resolved version
 * Starting from the highest resolved version, gather all of the semver requirements that meet it
 * Recreate keys for those (make sure to remember referential equality between same resolved version!)
 * Go down to the next highest resolved version, repeat the same
 * Any semver requirements that get orphaned are deleted
 * Any resolved version that get orphaned (no semvers attached) are also deleted
 *
 * OPTION B (lazy):
 * Delete any keys where there are multiple resolved versions for the same package name
 *
 * BOTH OPTIONS:
 * Save lockfile, rerun yarn
 */
export function dedupeUp(lockFile: Lockfile) {
  return lockFile;
}
