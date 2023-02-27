import { subPages } from "./sub-pages.modle";

export class addPagesModle {
  constructor(
    public pageId: number,
    public title: string,
    public keyword: string,
    public ppTpath: string,
    public videoImage: string,
    public videoURL: string,
    public description: string,
    public snapshot: string,
    public subPages: subPages[]
  ) {}
}
