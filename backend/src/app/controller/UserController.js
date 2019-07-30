import * as Yup from 'yup';

import User from '../models/User';

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .min(6)
        .required(),
    });

    const schemaIsValid = await schema.isValid(req.body);
    if (!schemaIsValid) {
      return res.status(400).json({ error: 'Validation Fails' });
    }

    const userExists = await User.findOne({ where: { email: req.body.email } });
    if (userExists) {
      return res
        .status(400)
        .json({ error: 'This email is already registered' });
    }

    const { id, name, email } = await User.create(req.body);

    return res.status(201).json({
      msg: 'User created with success!',
      userData: {
        id,
        name,
        email,
      },
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, password) => {
          return oldPassword ? password.required() : password;
        }),
      confirmPassword: Yup.string().when(
        'password',
        (password, confirmPassword) => {
          return password
            ? confirmPassword.required().oneOf([Yup.ref('password')])
            : confirmPassword;
        }
      ),
    });

    const schemaIsValid = await schema.isValid(req.body);
    if (!schemaIsValid) {
      return res.status(400).json({ error: 'Validation Fails' });
    }

    const { email, oldPassword } = req.body;

    const user = await User.findByPk(req.userId);

    if (email) {
      if (email !== user.email) {
        const emailAlreadyRegistered = await User.findOne({ where: { email } });

        if (emailAlreadyRegistered) {
          res.status(400).json({ msg: 'User already exists' });
        }
      }
    }

    if (oldPassword) {
      const passwordIsCorrect = await user.checkPassword(oldPassword);
      if (!passwordIsCorrect) {
        res.status(401).json({ error: 'Password does not match' });
      }
    }

    const { id, name } = await user.update(req.body);

    return res.json({
      id,
      name,
      email,
    });
  }
}

export default new UserController();
