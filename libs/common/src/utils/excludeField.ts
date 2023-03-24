export default function exclude<Table, Key extends keyof Table>(
    table: Table,
    keys: Key[]
): Omit<Table, Key> {
    for (let key of keys) {
        delete table[key]
    }
    return table
}