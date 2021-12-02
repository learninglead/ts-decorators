import { NextFunction, Request, Response } from 'express';

import { bodyValidator, controller, get, post } from './decoraters';

@controller('/auth')
class LoginController {
  @get('/login')
  getLogin(req: Request, res: Response) {
    res.send(`
      <form method="POST">
          <div>
              <label>Email: </label>
              <input type="email" name="email" />
          </div>
          <div>
              <label>Password: </label>
              <input type="password" name="password" />
          </div>
          <button type="submit">Submit</button>
      </form>
    `);
  }

  @post('/login')
  @bodyValidator('email', 'password')
  postLogin(req: Request, res: Response) {
    const { email, password } = req.body;
    if (email === 'admin@gmail.com' && password === '12345678') {
      req.session = { loggedIn: true };
      res.redirect('/');
    } else {
      res.send('Invalid email or password');
    }
  }

  @get('/logout')
  getLogout(req: Request, res: Response) {
    req.session = undefined;
    res.redirect('/');
  }
}
