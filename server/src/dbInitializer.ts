import { AppDataSource } from './data-source';
import User from './entities/User';

export const userInitializer = async() => {
    try {
        await AppDataSource.initialize();
        
        const userRepository = AppDataSource.getRepository(User);
        const existingUser = await userRepository.findOneBy({email: "test@test.com"});
    
        if (!existingUser) {
          const testUser = new User();
          testUser.email = 'test@test.com';
          testUser.username = 'test';
          testUser.password = 'test1234';
    
          await userRepository.save(testUser);
          console.log('테스트 유저가 생성되었습니다.');
        } else{
            console.log('테스트 유저가 이미 존재합니다. 다음 프로세스를 진행합니다.');
        }
      } catch (error) {
        console.error('문제가 발생하였습니다.', error);
      }
}