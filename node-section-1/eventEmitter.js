const EventEmitter = require('events');

class Logger extends EventEmitter {
    log =() =>{
        this.emit("MessageLogged",{id : 1 , name : "sarvinstyle"} );
    }
}
module.exports=Logger
