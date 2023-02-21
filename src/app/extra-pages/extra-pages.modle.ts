import { accoDataList } from "./extra-arrayPage.modle";

export class addPagesModle {
  constructor(
    public title: string,
    public keyword: string,
    public pptUpload: File,
    public videoImageUpload: File,
    public videoURL: string,
    public description: string,
    public accoArrayList: accoDataList[]
  ) {}
}
