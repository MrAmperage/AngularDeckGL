/*Абстрактный базовый клас для других лоадеров слоев*/
export default abstract class BaseLayerLoader {
  abstract name: string;
  abstract id: string;
  abstract module: string;
  abstract version: string;
  abstract extensions: string[];
  abstract worker?: boolean;
  abstract mimeTypes: string[];
  abstract options: any;
  abstract parse(...Options: any[]): any;
}
