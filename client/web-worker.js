//#This for listening form worker.postMessage
self.addEventListener("message", (e) => {
    let payload = e.data.payload;
    let type = e.data.type;

    console.log("Receive message: ", e.data);
});


//#This for listening from broadcast channel specified.
const broadcast = new BroadcastChannel('txn-validator');
let count=0;
broadcast.onmessage = (e) => {
    console.log("HIT ", count++);
    if (e.data && e.data.type === 'VALIDATE_TXN') {
      //TODO:
    }
  };