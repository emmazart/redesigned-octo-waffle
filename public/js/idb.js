let db; // variable holds db connection
const request = indexedDB.open('transaction', 1);  // establishes connection to database 'budget'

// will only run if db version changes
request.onupgradeneeded = function(event) {
    const db = event.target.result;
    db.createObjectStore('new_transaction', { autoIncrement: true });
};

// upon successful request
request.onsuccess = function(event) {
    db = event.target.result;

    if (navigator.onLine) {
        // if app is online, write function to send all local db data to api
        console.log('app online');
    };
};

// on error
request.onerror = function(event) {
    console.log("REQUEST ERROR", event.target.errorCode);
};

// function will execute if user attempts to save new data and there is no connection
function saveRecord(record) {
    const transaction = db.transaction(['new_transaction'], 'readwrite');
    const transactionObjectStore = transaction.objectStore('new_transaction');
    transactionObjectStore.add(record);
};