export interface ImgCard {
  src: string
  isCheck: boolean
  fileExtension: string
}

export type ImgCardInScriptResult = Pick<ImgCard, 'src' | 'fileExtension'>
