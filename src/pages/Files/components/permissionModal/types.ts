export enum RoleEnum {
  writer = 'writer',
  commenter = 'commenter',
  reader = 'reader ',
  owner = 'owner ',
}

export const RoleEnumRus = {
  [RoleEnum.writer]: 'Редактор',
  [RoleEnum.commenter]: 'Комментатор',
  [RoleEnum.reader]: 'Читатель',
  [RoleEnum.owner]: 'Владелец',
};

export enum UserEnum {
  user = 'user',
  group = 'group',
  domain = 'domain',
  anyone = 'anyone',
}

export const UserEnumRus = {
  [UserEnum.user]: 'Пользователь',
  [UserEnum.group]: 'Группа',
  [UserEnum.domain]: 'Домен',
  [UserEnum.anyone]: 'Другое',
};
