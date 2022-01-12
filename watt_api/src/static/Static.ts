export class Static<T extends string> {
    private list: Record<string, boolean>;

    constructor(...list: T[]) {
        this.list = {};

        for (const item of list) {
            this.list[item] = true;
        }
    }

    public default(): T {
        return Object.keys(this.list)[0] as T;
    }

    public getList(): T[] {
        return Object.keys(this.list) as T[];
    }

    public isValid(key: string): boolean {
        return this.list[key as any];
    }
}

export default Static;