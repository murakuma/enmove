
import { Socket } from "net";
import { URL } from "url";

const RETRY_INTERVAL = 500;

export function waitForServer( url: URL, callback: () => void ) {

    let callbackHasBeenCalled = false;

    const client = new Socket();

    const tryConnection = () => client.connect( Number(url.port), url.hostname, () => {
        client.end();
        if ( !callbackHasBeenCalled ) {
            callbackHasBeenCalled = true;
            callback();
        }
    } );

    tryConnection();

    client.on( "error", err => {
        // Retry
        setTimeout( tryConnection, RETRY_INTERVAL );
    } );
}
