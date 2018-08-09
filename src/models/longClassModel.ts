export class LongClassModel {

    private idLong: number;

    constructor(idLong: number) {
        this.idLong = idLong;
    }

    getIdLong() {
        return this.idLong;
    }

    setIdLong(value) {
        this.idLong = value;
    }

}