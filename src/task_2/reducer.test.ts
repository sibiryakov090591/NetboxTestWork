import reducer, {ItemType, reducerActions} from "./reducer";

let startState: ItemType[] = [
    [
        {field: "ID", value: 1, type: "integer"},
        {field: "Name", value: "Alex", type: "string" },
        {field: "Age", value: 30, type: "integer" },
        {field: "Phone", value: "777-777-777", type: "string"},
        {field: "E-mail", value: "test@test.ru", type: "string"}
    ],
    [
        {field: "ID", value: 2, type: "integer"},
        {field: "Name", value: "Bob", type: "string" },
        {field: "Age", value: 29, type: "integer" },
        {field: "Phone", value: "888-888-888", type: "string"},
        {field: "E-mail", value: "test@test.ru", type: "string"}
    ],
    [
        {field: "ID", value: 3, type: "integer"},
        {field: "Name", value: "John", type: "string" },
        {field: "Age", value: 28, type: "integer" },
        {field: "Phone", value: "999-999-999", type: "string"},
        {field: "E-mail", value: "test@test.ru", type: "string"}
    ]
]

beforeEach(() => {
    startState = [
        [
            {field: "ID", value: 1, type: "integer"},
            {field: "Name", value: "Alex", type: "string" },
            {field: "Age", value: 30, type: "integer" },
            {field: "Phone", value: "777-777-777", type: "string"},
            {field: "E-mail", value: "test@test.ru", type: "string"}
        ],
        [
            {field: "ID", value: 2, type: "integer"},
            {field: "Name", value: "Bob", type: "string" },
            {field: "Age", value: 29, type: "integer" },
            {field: "Phone", value: "888-888-888", type: "string"},
            {field: "E-mail", value: "test@test.ru", type: "string"}
        ],
        [
            {field: "ID", value: 3, type: "integer"},
            {field: "Name", value: "John", type: "string" },
            {field: "Age", value: 28, type: "integer" },
            {field: "Phone", value: "999-999-999", type: "string"},
            {field: "E-mail", value: "test@test.ru", type: "string"}
        ]
    ]
})

test('Item should be deleted from correct array', () => {

    const action = reducerActions.deleteItem(2);
    const endState = reducer(startState, action)

    expect(endState.length).toBe(2);
    expect(endState[1][0].value).toEqual(3);
});

test('Item should be added to correct array', () => {

    const action = reducerActions.addItem("Lili", 23, "123-123-123", "abs@abs.ru");
    const endState = reducer(startState, action)

    expect(endState.length).toBe(4);
    expect(endState[endState.length - 1]).toEqual([
        {field: "ID", value: 4, type: "integer"},
        {field: "Name", value: "Lili", type: "string" },
        {field: "Age", value: 23, type: "integer" },
        {field: "Phone", value: "123-123-123", type: "string"},
        {field: "E-mail", value: "abs@abs.ru", type: "string"}
    ]);
});

test('Item should be updated from correct array', () => {

    const action = reducerActions.saveItem(2, "Valentina", 40, "90-90-90", "newSome@new.ru");
    const endState = reducer(startState, action)

    expect(endState.length).toBe(3);
    expect(endState[1][1].value).toEqual("Valentina");
    expect(endState[1][2].value).toEqual(40);
    expect(endState[1][3].value).toEqual("90-90-90");
    expect(endState[1][4].value).toEqual("newSome@new.ru");
});