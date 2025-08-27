
// const {
//   ads_list
// } = require("../../models/adsModal");


// Controller agrees to implement the function called "respond"
exports.broadcast = async function(socket_io){
  // this function expects a socket_io connection as argument
 // const list = await ads_list(postData);
  
  
  // now we can do whatever we want:
  socket_io.on('ads',function(ads){

      // as is proper, protocol logic like
      // this belongs in a controller:

      socket.broadcast.emit(ads);
  });
}