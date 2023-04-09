import { IUser } from 'types';

import user1 from '../../assets/user_1.png';
import user2 from '../../assets/user_2.png';
import user3 from '../../assets/user_3.png';
import user4 from '../../assets/user_4.png';
import user5 from '../../assets/user_5.png';
import user6 from '../../assets/user_6.png';

export const users: IUser[] = [
  {
    id: 1,
    name: 'Leanne Graham',
    username: 'Bret',
    email: 'Sincere@april.biz',
    address: {
      street: 'Kulas Light',
      suite: 'Apt. 556',
      city: 'Gwenborough',
      zipcode: '92998-3874',
    },
    phone: '1-770-736-8031',
    website: 'hildegard.org',
    photo: user1,
  },
  {
    id: 2,
    name: 'Ervin Howell',
    username: 'Antonette',
    email: 'Shanna@melissa.tv',
    address: {
      street: 'Victor Plains',
      suite: 'Suite 879',
      city: 'Wisokyburgh',
      zipcode: '90566-7771',
    },
    phone: '010-692-6593',
    website: 'anastasia.net',
    photo: user2,
  },
  {
    id: 3,
    name: 'Clementine Bauch',
    username: 'Samantha',
    email: 'Nathan@yesenia.net',
    address: {
      street: 'Douglas Extension',
      suite: 'Suite 847',
      city: 'McKenziehaven',
      zipcode: '59590-4157',
    },
    phone: '1-463-123-4447',
    website: 'ramiro.info',
    photo: user3,
  },
  {
    id: 4,
    name: 'Patricia Lebsack',
    username: 'Karianne',
    email: 'Julianne.OConner@kory.org',
    address: {
      street: 'Hoeger Mall',
      suite: 'Apt. 692',
      city: 'South Elvis',
      zipcode: '53919-4257',
    },
    phone: '493-170-9623',
    website: 'kale.biz',
    photo: user4,
  },
  {
    id: 5,
    name: 'Chelsey Dietrich',
    username: 'Kamren',
    email: 'Lucio_Hettinger@annie.ca',
    address: {
      street: 'Skiles Walks',
      suite: 'Suite 351',
      city: 'Roscoeview',
      zipcode: '33263',
    },
    phone: '(254)954-1289',
    website: 'demarco.info',
    photo: user5,
  },
  {
    id: 6,
    name: 'Mrs. Dennis Schulist',
    username: 'Leopoldo_Corkery',
    email: 'Karley_Dach@jasper.info',
    address: {
      street: 'Norberto Crossing',
      suite: 'Apt. 950',
      city: 'South Christy',
      zipcode: '23505-1337',
    },
    phone: '1-477-935-8478 x6430',
    website: 'ola.org',
    photo: user6,
  },
];
