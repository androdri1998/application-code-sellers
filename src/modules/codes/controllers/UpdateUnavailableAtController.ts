/* eslint-disable radix */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import HTTPStatusCode from 'http-status-codes';
import IDatabaseRepository from '../../app/repositories/IDatabaseRepository';
import ICodesRepository from '../repositories/ICodesRepository';
import IUsersRepository from '../../users/repositories/IUsersRepository';

import UpdateUnavailableAtService from '../services/UpdateUnavailableAtService';

class UpdateUnavailableAtController {
  private usersRepository: IUsersRepository;

  private codesRepository: ICodesRepository;

  private databaseRepository: IDatabaseRepository;

  constructor(
    usersRepository: IUsersRepository,
    codesRepository: ICodesRepository,
    databaseRepository: IDatabaseRepository,
  ) {
    this.usersRepository = usersRepository;
    this.codesRepository = codesRepository;
    this.databaseRepository = databaseRepository;

    this.update = this.update.bind(this);
  }

  async update(
    req: Request,
    res: Response,
  ): Promise<Response<any, Record<string, any>>> {
    const { codeId } = req.params;
    const { unavailable_at: unavailableAt } = req.body;
    const userId = req.user?.id as string;

    const updateUnavailableAtService = new UpdateUnavailableAtService(
      this.usersRepository,
      this.codesRepository,
      this.databaseRepository,
    );

    const response = await updateUnavailableAtService.execute({
      codeId,
      userId,
      unavailableAt,
    });

    return res.status(HTTPStatusCode.OK).json(response);
  }
}

export default UpdateUnavailableAtController;
