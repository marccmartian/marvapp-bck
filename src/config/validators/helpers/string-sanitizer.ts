export class StringSanitizer {

    // Capitaliza cada palabra: primera letra mayúscula, resto minúscula
    static capitalizeWords(value: string): string {
        return value
            .split(" ")
            .filter(Boolean)
            .map( word => word.charAt(0).toLocaleUpperCase() + word.slice(1).toLocaleLowerCase() )
            .join(" ")
    }

}