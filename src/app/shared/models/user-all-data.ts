import {UserAllPersonalFields} from "./user-all-personal-fields";
import {WorkData} from "./work-data";
import {Education} from "./education";

export class UserAllData extends UserAllPersonalFields {

  works?: WorkData[];
  educations?: Education[];

}
