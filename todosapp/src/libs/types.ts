export interface Itodos {
    _id: string;
    title: string;
    todos: string;
    createdDate: Date;
    createdBy: string;
    isCompleted: boolean;
}

export interface Iuser {
    _id?: string;
    username: string;
    email: string;
    avatar: string;
    todos: [{
        todosId: string
    }]
}