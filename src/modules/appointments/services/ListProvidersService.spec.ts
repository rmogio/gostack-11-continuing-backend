import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProvidersService from './ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let listProvidersService: ListProvidersService;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    listProvidersService = new ListProvidersService(fakeUsersRepository);
  });

  it('should be able to list the providers', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'John Snow',
      email: 'john@snow.wall',
      password: '123123',
    });

    const user2 = await fakeUsersRepository.create({
      name: 'John Fire',
      email: 'john@fire.wall',
      password: '123123',
    });

    const loggedUser = await fakeUsersRepository.create({
      name: 'John Water',
      email: 'john@Water.wall',
      password: '123123',
    });

    const providers = await listProvidersService.execute({
      user_id: loggedUser.id,
    });

    expect(providers).toEqual([user1, user2]);
  });
});
