/** Class to store information about Nodes */
class Node {
  /**
   * @param {socket} socket - socket instance created on client connect
   */
  constructor(socket) {
    this.socket = socket;
    this.id = socket.id;
    this.alive = true;
    this.connectTime = Date.now();
    this.disconnectTime = null;
    this.userAgent = socket.request.headers['user-agent'];
  }
  /**
   * @return {number} uptime in milliseconds
   */
  get upTime(){
    //Test if the node is alive wether or not to use current time or DC time
    if (this.alive) {
      return Date.now() - this.connectTime;
    } else {
      return this.disconnectTime - this.connectTime
    }
  }
  /**
   * sets Node's alive to false records disconnect time
   * @return {null}
   */
   disconnect () {
     this.alive = false;
     this.disconnectTime = Date.now()
   }
  /**
   * @return {object} returns an object with all the data from instance
   */
  serialize() {
		return {
			id: this.id,
			connectTime: this.connectTime,
      upTime: this.uptime,
      userAgent: this.userAgent,
      alive: this.alive,
    };
  }
}

module.exports = Node;
