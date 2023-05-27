import uniqid from 'uniqid';

export default class Socket {

    static send(socket, event, payload) {
        return new Promise((resolve, reject) => {
            // get actual timestamp
            const date = new Date();
            const id = parseInt(`${date.getTime()}-${uniqid()}`);
            socket.emit(event, { id, payload: payload });
            socket.off(`response-${id}`)
            socket.on(`response-${id}`, (response) => {
                resolve(response);
            })
        })
    }

}