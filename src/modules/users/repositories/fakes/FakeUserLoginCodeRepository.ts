/* eslint-disable camelcase */
import { v4 as uuidv4 } from 'uuid';

import IDatabase from '../../../app/db/IDatabase';
import { generateCurrentDate } from '../../../app/utils/date';
import {
  createDTO,
  FindByCodeDTO,
  GetUserLoginCodeValidAndNotCheckedByUserIdDTO,
  RemoveUserLoginCodesByUserIdDTO,
  UpdateCheckedAtAndUpdatedAtByCodeDTO,
  UpdateIsValidByCodeDTO,
  UserLoginCode,
} from '../dto';
import IUserLoginCodeRepository from '../IUserLoginCodeRepository';

class FakeUsersRepository implements IUserLoginCodeRepository {
  private database;

  private userLoginCodes: UserLoginCode[];

  constructor(database: IDatabase) {
    this.database = database;

    this.userLoginCodes = [];
  }

  async removeUserLoginCodesByUserId({
    userId,
  }: RemoveUserLoginCodesByUserIdDTO): Promise<boolean> {
    const userLoginCodes = this.userLoginCodes.filter(
      userLoginCode => userLoginCode.user_id !== userId,
    );
    this.userLoginCodes = userLoginCodes;
    const isDeleted = true;

    return isDeleted;
  }

  async getUserLoginCodeValidAndNotCheckedByUserId({
    user_id,
  }: GetUserLoginCodeValidAndNotCheckedByUserIdDTO): Promise<UserLoginCode[]> {
    const userLoginCodes = this.userLoginCodes.filter(
      userLoginCode =>
        userLoginCode.user_id === user_id &&
        userLoginCode.is_valid === true &&
        userLoginCode.checked_at === null,
    );

    return userLoginCodes;
  }

  async findByCode({ code }: FindByCodeDTO): Promise<UserLoginCode | null> {
    const userLoginCodeFound = this.userLoginCodes.find(
      userLoginCode => userLoginCode.code === code,
    );

    return userLoginCodeFound || null;
  }

  async invalidateUserLoginCodeByCode({
    code,
    is_valid,
  }: UpdateIsValidByCodeDTO): Promise<UserLoginCode> {
    const userLoginCodeIndex = this.userLoginCodes.findIndex(
      userLoginCode => userLoginCode.code === code,
    );

    const userLoginCode = this.userLoginCodes[userLoginCodeIndex];

    userLoginCode.is_valid = is_valid;
    userLoginCode.updated_at = generateCurrentDate();

    this.userLoginCodes[userLoginCodeIndex] = userLoginCode;

    return userLoginCode || null;
  }

  async updateCheckedAtAndUpdatedAtByCode({
    code,
  }: UpdateCheckedAtAndUpdatedAtByCodeDTO): Promise<UserLoginCode> {
    const userLoginCodeIndex = this.userLoginCodes.findIndex(
      userLoginCode => userLoginCode.code === code,
    );

    const userLoginCode = this.userLoginCodes[userLoginCodeIndex];

    userLoginCode.updated_at = generateCurrentDate();
    userLoginCode.checked_at = generateCurrentDate();

    this.userLoginCodes[userLoginCodeIndex] = userLoginCode;

    return userLoginCode || null;
  }

  async create({ user_id }: createDTO): Promise<UserLoginCode> {
    const userLoginCode = {
      id: uuidv4(),
      user_id,
      code: uuidv4(),
      updated_at: null,
      checked_at: null,
      created_at: generateCurrentDate(),
      is_valid: true,
    };

    this.userLoginCodes.push(userLoginCode);

    return userLoginCode;
  }
}

export default FakeUsersRepository;
