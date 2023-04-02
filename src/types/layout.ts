export type Layout = 
{
  type: string,
  default: boolean,
  breakpoint: string,
  content: Content[]
}

type Content = {
  id: string,
  order: number,
  type: string,
  dataId: string,
  styling: Object

}
