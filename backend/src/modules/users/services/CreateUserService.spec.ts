import 'reflect-metadata';
import CreateUserService from './CreateUserService';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository'
import AppError from '@shared/errors/AppError';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository;
    const createUser = new CreateUserService(fakeUsersRepository);

    const user = await createUser.execute({
      name: 'John Doe',
      email: 'john@john.com',
      password: '123456'
    });

    expect(user).toHaveProperty('id');

  });

  it('should not be able to create existent user', async () => {
    const fakeUsersRepository = new FakeUsersRepository;
    const createUser = new CreateUserService(fakeUsersRepository);

    const user = {
      name: 'John Doe',
      email: 'john@john.com',
      password: '123456'
    };

    await createUser.execute(user);

    expect(createUser.execute(user)).rejects.toBeInstanceOf(AppError);

  });

});
