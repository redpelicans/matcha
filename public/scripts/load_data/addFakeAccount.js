import users from '../../src/server/models/users';

const addFakeAccount = () => {
  const user = { login: 'abarriel', email: 'allan.barrielle@gmail.com', password: 'passwd1', firstname: 'allan', lastname: 'barrielle' };
  return users.add(user);
};

export default addFakeAccount;
// ('abarriel','allan.barrielle@gmail.com','$2a$10$vpiJTzmJVRLJe5qOM4T5eOtjd2jmUgV7JGM7Q5STQuXqgB6QbqAi6','allan','barrielle','men','21','heterosexual',48.8537,2.549),
// ('lcharvol','lcharvl@gmail.com','$2a$10$vpiJTzmJVRLJe5qOM4T5eOtjd2jmUgV7JGM7Q5STQuXqgB6QbqAi6','lucals','charvol','men','52','bisexual',48.8882574,2.3168467),
// ('jpascal','jpascal@gmail.com','$2a$10$vpiJTzmJVRLJe5qOM4T5eOtjd2jmUgV7JGM7Q5STQuXqgB6QbqAi6','julie','pascal','women','45','heterosexual',48.8856123,2.3236024),
// ('tferrari','tferrari@gmail.com','$2a$10$vpiJTzmJVRLJe5qOM4T5eOtjd2jmUgV7JGM7Q5STQuXqgB6QbqAi6','tony','ferrari','men','65','bisexual',48.8852991,2.339703),
// ('marnaud','marnaud@gmail.com','$2a$10$vpiJTzmJVRLJe5qOM4T5eOtjd2jmUgV7JGM7Q5STQuXqgB6QbqAi6','mariana','arnaud','women','35','heterosexual',48.8724036,2.3315904),
// ('mquesada','mquesada@gmail.com','$2a$10$vpiJTzmJVRLJe5qOM4T5eOtjd2jmUgV7JGM7Q5STQuXqgB6QbqAi6','marina','barrielle','women','19','bisexual',48.8724036,2.3315904),
// ('tboivin','tboivin@gmail.com','$2a$10$vpiJTzmJVRLJe5qOM4T5eOtjd2jmUgV7JGM7Q5STQuXqgB6QbqAi6','thibault','barrielle','men','22','heterosexual',48.8249724,2.4423883),
// ('aboudjmen','aboudjmen@gmail.com','$2a$10$vpiJTzmJVRLJe5qOM4T5eOtjd2jmUgV7JGM7Q5STQuXqgB6QbqAi6','adams','barrielle','men','19','bisexual',48.770936,2.5586286),
// ('lduval','lduval@gmail.com','$2a$10$vpiJTzmJVRLJe5qOM4T5eOtjd2jmUgV7JGM7Q5STQuXqgB6QbqAi6','lucas','barrielle','men','37','heterosexual',47.8889781,2.1386827),
// ('natasha','natasha@gmail.com','$2a$10$vpiJTzmJVRLJe5qOM4T5eOtjd2jmUgV7JGM7Q5STQuXqgB6QbqAi6','natasha','barrielle','women','36','heterosexual',43.2803051,5.2650563),
// ('elizabeth','elizabeth.barrielle@gmail.com','$2a$10$vpiJTzmJVRLJe5qOM4T5eOtjd2jmUgV7JGM7Q5STQuXqgB6QbqAi6','elizabeth','barrielle','women','35','heterosexual',43.3443814,5.4032437),
// ('paulokok','paul.barrielle@gmail.com','$2a$10$vpiJTzmJVRLJe5qOM4T5eOtjd2jmUgV7JGM7Q5STQuXqgB6QbqAi6','paul','barrielle','women','20','heterosexual',43.3453801,5.4707066),
// ('ltitia','lititia.barrielle@gmail.com','$2a$10$vpiJTzmJVRLJe5qOM4T5eOtjd2jmUgV7JGM7Q5STQuXqgB6QbqAi6','laetitia','barrielle','women','18','bisexual',43.3265892,5.5158536),
// ('linab','lina.barrielle@gmail.com','$2a$10$vpiJTzmJVRLJe5qOM4T5eOtjd2jmUgV7JGM7Q5STQuXqgB6QbqAi6','lina','barrielle','women','24','heterosexual',48.8821757,2.2637868),
// ('leab','leab.barrielle@gmail.com','$2a$10$vpiJTzmJVRLJe5qOM4T5eOtjd2jmUgV7JGM7Q5STQuXqgB6QbqAi6','lea','barrielle','women','27','heterosexual',48.9305507,2.2744882),
// ('lolab','lola.barrielle@gmail.com','$2a$10$vpiJTzmJVRLJe5qOM4T5eOtjd2jmUgV7JGM7Q5STQuXqgB6QbqAi6','lola','barrielle','women','25','heterosexual',48.8422437,2.2363779),
// ('camilleb','camille.barrielle@gmail.com','$2a$10$vpiJTzmJVRLJe5qOM4T5eOtjd2jmUgV7JGM7Q5STQuXqgB6QbqAi6','camille','barrielle','women','18','bisexual',48.8537,2.549),
// ('inesb','ines.barrielle@gmail.com','$2a$10$vpiJTzmJVRLJe5qOM4T5eOtjd2jmUgV7JGM7Q5STQuXqgB6QbqAi6','ines','barrielle','women','31','bisexual',48.8734482,2.2561488),
// ('mariab','maria.barrielle@gmail.com','$2a$10$vpiJTzmJVRLJe5qOM4T5eOtjd2jmUgV7JGM7Q5STQuXqgB6QbqAi6','maria','barrielle','women','31','heterosexual',48.8871477,2.2541669),
// ('zoeb','zoe.barrielle@gmail.com','$2a$10$vpiJTzmJVRLJe5qOM4T5eOtjd2jmUgV7JGM7Q5STQuXqgB6QbqAi6','zoe','barrielle','women','31','heterosexual',48.902219,2.3513199);
