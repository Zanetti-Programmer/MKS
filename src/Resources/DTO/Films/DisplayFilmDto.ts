import { DisplayUserDto } from "../Users/DisplayUserDto";



export class DisplayFilmDto {
    constructor(
        readonly id: string,
        readonly name: string,
        readonly genre: string,
        readonly sinopse: string,
        readonly user?: DisplayUserDto,
    ) {

    }
}