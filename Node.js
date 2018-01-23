/** Class to store information about Nodes */
class Node {
  /**
   * @param {socket} socket - socket instance created on client connect
   */
  constructor(socket) {
    this.socket = socket;
    this.id = socket.id;
    this.connectTime = Date.getTime();
    this.userAgent = socket.request.headers['user-agent'];
  }
  /**
   * @return {number} uptime in milliseconds
   */
  get upTime(){
    return Date.getTime() - this.connectTime;
  }
  /**
   * @return {object} returns an object with all the data from instance
   */
  serialize() {
		return {
			id: this.id,
			connectTime: this.connectTime,
      upTime: this.uptime
    };
  }

}

module.exports = Node
