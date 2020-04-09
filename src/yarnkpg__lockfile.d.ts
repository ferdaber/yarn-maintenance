declare module "@yarnpkg/lockfile" {
  /**
   * Represents a resolved module that is installed into `node_modules`.
   * This information does not differentiate between a nested module or a root level module
   * within `node_modules`.
   */
  export interface LockfileEntry {
    /** Exact version number */
    version: string;
    /** Resolved download path of the package in the registry */
    resolved: string;
    /** Integrity hash */
    integrity: string;
    /**
     * Any dependencies the installed package has.
     * Key is the name of the dependency package, and value is the semver
     * string as stated by the dependency package's package.json.
     */
    dependencies?: Record<string, string>;
  }

  export interface Lockfile extends Record<string, LockfileEntry> {}

  type ParseResultType = "merge" | "success" | "conflict";

  export interface ParseResult {
    type: ParseResultType;
    /**
     * Record representing a parsed lockfile.
     *
     * The key is of the form `pkgname@<semver>`, and the value is the resolved
     * module. Multiple keys can have the same resolved module (if they are within semver range)
     * and the key's value in the object is referentially equal between those keys.
     */
    object: Lockfile;
  }

  /**
   * Parses `yarn.lock` contents into an object.
   * Throws if parsing failed.
   * @param lockfile `yarn.lock` contents as a string
   */
  export function parse(lockfile: string): ParseResult;
  /**
   * Write `yarn.lock` parsed object into a string ready to be saved.
   * @param noHeader enable to suppress the header comments
   * @param enableVersions enable to add Yarn and Node versions into the header
   */
  export function stringify(
    lockfile: Lockfile,
    noHeader?: boolean,
    enableVersions?: boolean
  ): unknown;
}
