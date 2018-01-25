/**
 * Class to distribute work to nodes in the network
 */
 //TODO add support for batch reallocation on disconnect 
class Delagator {
  /**
   *
   */
  constructor() {
    this.job = null;
    this.batch = null;
    this.batchFunc = null
  }
  //JOB METHODS
  /**
   * @param {function} func - func to be eval() by client
   */
  set job(func){
    this.job = func;
  }
  /**
   * reutrns the string of the function with brackets to identify it as an
   * object literal for eval() on the client
   * @return {string}
   */
  get job() {
    return '(' + this.job + ')';
  }

  //BATCH METHODS
  /**
   * Sets the function to be called to to distribute next batch
   * @param {function} func - function to be called todistribute next batch
   */
  set batch(func){
    this.batchFunc = func;
  }
  /**
   *
   */
  get batch(){
    this.batchFunc();
  }


}

module.exports = Delagator;
