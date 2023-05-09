import {Contact} from "./contact";

export class UserAllPersonalFields {
  email?: string;
  firstName?: string;
  lastName?: string;
  title?: string;
  location?: string;
  phoneNumber?: string;
  summary?: string;
  sex?: string;
  contacts?: Contact[];
}
