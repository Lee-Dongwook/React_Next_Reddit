import { AppDataSource } from './data-source';
import User from './entities/User';
import Sub from './entities/Sub';
import Post from './entities/Post';

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

export const subInitializer = async() => {
    try {
      const userRepository = AppDataSource.getRepository(User);
      const subRepository = AppDataSource.getRepository(Sub);
    
      const existingUser = await userRepository.findOneBy({email: "test@test.com"});
      
      if(existingUser) {
        const existingSub = await subRepository.findOneBy({name: "testBoard"});

        if(!existingSub) {
            const testUserSub = new Sub();
            testUserSub.name = 'testBoard';
            testUserSub.title = '테스트 게시판';
            testUserSub.description = '테스트 게시판입니다.';
            testUserSub.username = existingUser.username;
            testUserSub.user = existingUser;

            await subRepository.save(testUserSub);
            console.log('테스트 유저의 테스트 게시판이 생성되었습니다.');
        } else {
            console.log('테스트 게시판이 이미 존재합니다. 다음 프로세스를 진행합니다.');
        }

      } else {
        console.log('테스트 유저가 생성되지 않았습니다. 서버를 재 실행해주세요.');
      }

    } catch(error) {
        console.error('문제가 발생하였습니다.', error);
    }
}

export const postInitializer = async() => {
  try {
    const subRepository = AppDataSource.getRepository(Sub);
    const postRepository = AppDataSource.getRepository(Post);
  
    const existingSub = await subRepository.findOneBy({name: "testBoard"})

    if(existingSub){
      const existingPost = await postRepository.findOneBy({subName: "testBoard", identifier: "1"});
      if(!existingPost) {
        const testUserPost = new Post();
        testUserPost.identifier = '1';
        testUserPost.title = '테스트 게시글';
        testUserPost.slug = 'test-post';
        testUserPost.body = '테스트 게시글입니다.';
        testUserPost.subName = existingSub.name;
        testUserPost.username = existingSub.username;
        testUserPost.user = existingSub.user;
        testUserPost.sub = existingSub;

        await postRepository.save(testUserPost);
        console.log('테스트 유저의 테스트 게시물이 생성되었습니다.');
      } else {
        console.log('테스트 게시물이 이미 존재합니다. 다음 프로세스를 진행합니다.');
      }
    } else {
      console.log('테스트 게시판이 생성되지 않았습니다. 서버를 재 실행해주세요.');
    }
  } catch(error) {
    console.error('문제가 발생하였습니다.', error);
  }
}