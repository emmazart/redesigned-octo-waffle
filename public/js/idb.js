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
        uploadTransaction();
    };
};

// on error
request.onerror = function(event) {
    console.log("REQUEST ERROR", event.target.errorCode);
};

// function will execute if user attempts to save new data and there is no connection
// executed in index.js line 144 in the catch for the fetch
function saveRecord(record) {
    const transaction = db.transaction(['new_transaction'], 'readwrite');
    const transactionObjectStore = transaction.objectStore('new_transaction');
    transactionObjectStore.add(record);
};

// function to execute when app is back online and idb data needs to be 
// sent to the server
function uploadTransaction() {
    const transaction = db.transaction(['new_transaction'], 'readwrite');
    const transactionObjectStore = transaction.objectStore('new_transaction');
    const getAll = transactionObjectStore.getAll();

    // upon successful getAll execution
    getAll.onsuccess = function() {
        // if there was data in indexedDb's store, send to server
        // if there's more than 1 item in store, send to bulk create endpoint
        if (getAll.result.length > 0) {
            console.log('multiple transactions')
            fetch('/api/transaction/bulk', {
                method: 'POST',
                body: JSON.stringify(getAll.result),
                headers: {
                    Accept: 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(serverResponse => {
                if (serverResponse.message) {
                    throw new Error(serverResponse);
                }

                // open one more transaction
                const transaction = db.transaction(['new_transaction'], 'readwrite');
                // access object store
                const transactionObjectStore = transaction.objectStore('new_transaction');
                // clear object store
                transactionObjectStore.clear();

                alert('All saved transactions have been submitted!');
            })
            .catch(err => {
                console.log(err);
            });
        }
    }
};

// listen for app coming back online
window.addEventListener('online', uploadTransaction);