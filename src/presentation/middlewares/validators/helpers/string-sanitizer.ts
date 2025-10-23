export class StringSanitizer {

    // Capitaliza cada palabra: primera letra mayúscula, resto minúscula
    static capitalizeWords(value: string): string {
        return value
            .split(" ")
            .filter(Boolean)
            .map( word => word.charAt(0).toLocaleUpperCase() + word.slice(1).toLocaleLowerCase() )
            .join(" ")
    }

    static capitalizeFirstWord(value: string): string {
        if(!value) return "";
        const lowerCaseValue = value.toLocaleLowerCase();
        const firstLetter = lowerCaseValue.charAt(0).toLocaleUpperCase();
        const restOfString = lowerCaseValue.slice(1);
        return firstLetter + restOfString;
    }

}