
export default function entryReducer(tasks, action) {
    switch (action.type) {
        case 'add': {
            console.log("Added entry: ", action);
            return [
                ...interactions,
                {
                    date: action.date,
                    message: action.message,
                    writer: action.writer,
                    entryID: action.entryID
                },
            ];
        }
        default: {
            console.log("ERROR in the Entry Reducer");
            throw Error('Unknown action: ' + action.type);
        }
    }
}