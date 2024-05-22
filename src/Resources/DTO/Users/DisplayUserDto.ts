import { DisplayFilmDto } from "../Films/DisplayFilmDto";


export class DisplayUserDto {
    constructor(
        readonly id: string,
        readonly name: string,
        readonly films?: DisplayFilmDto[],
    ) {

    }
}