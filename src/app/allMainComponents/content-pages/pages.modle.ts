import { subPages } from "./sub-pages.modle";

export class addPagesModle {
  constructor(
    public title: string,
    public keyword: string,
    public pptUpload: File,
    public videoImageUpload: File,
    public videoURL: string,
    public descriptions: string,
    public snapshot: File,
    public subPages: subPages[]
  ) {}
}
