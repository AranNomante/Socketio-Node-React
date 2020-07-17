const socket = io => {
  io.on('connection', client => {
    console.log('New Connection');
 
    // socket event for client subscription
    client.on('subscribeToDateEvent', interval => {
      console.log('Client is subscribing with interval: ', interval);
	  if(interval !== 1000){
		  console.log('Client interval is rejected');
		  client.emit('intervalError','Cannot change interval');
	  }else{  
      // emit message to the client side
      setInterval(() => {
        client.emit('getDate', new Date().toUTCString());
      }, interval);
	  }
    });
  });
}
 
module.exports = socket;