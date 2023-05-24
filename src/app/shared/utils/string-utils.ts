export class StringUtils {
  constructor() {
  }

  public static toCapitalize(s: string) {
    return s.charAt(0).toUpperCase() + s.substring(1).toLowerCase()
  }
}
