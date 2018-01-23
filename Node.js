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
   * @return {number} uptime in seconds
   */
  get upTime(){
    return Date.getTime() - this.connectTime;
  }
  /**
   * Returns a JSON object with all the info of the Node
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
