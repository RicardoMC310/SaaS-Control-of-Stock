export default class Name {
    private static readonly MIN_NAME_LENGTH: number = 3;

    private constructor(
        private readonly name: string
    ) {}

    toString(): string {
        return this.name;
    }

    static create(name: string): Name {
        name = name.trim();
        
        this.validate(name);
        return new Name(name);
    }

    private static validate(name: string) {
        if (name.length < this.MIN_NAME_LENGTH) {
            throw new Error("Name is too short. min 3 characters");
        }
    }
}