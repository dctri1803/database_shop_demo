import { PaginationMetaDataDto } from "./pagination-metadata.dto";

export class PageDto {
    readonly data: Array<any>;
    readonly metatData: PaginationMetaDataDto;

    constructor(data: Array<any>, metaData: PaginationMetaDataDto) {
        this.data = data; 
        this.metatData = metaData
    }
}