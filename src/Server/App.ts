import Express from 'express';
import morgan from 'morgan';

class App {
  public express = Express();

  constructor() {
    this.express.use(Express.json());
    this.express.use(morgan('dev'));
  }
}

export default App;
