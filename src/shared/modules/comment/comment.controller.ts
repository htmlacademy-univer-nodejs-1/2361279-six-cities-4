import { inject, injectable } from 'inversify';
import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import {
  BaseController,
  HttpError,
  HttpMethod,
  PrivateRouteMiddleware,
  ValidateDtoMiddleware,
} from '../../libs/rest/index.js';
import { Component } from '../../types/index.js';
import { Logger } from '../../libs/logger/index.js';
import { CommentService } from './comment-service.interface.js';
import { OfferService } from '../offer/index.js';
import { fillDTO } from '../../helpers/index.js';
import { CommentRdo } from './rdo/comment.rdo.js';
import { CreateCommentRequest } from './types/create-comment-request.type.js';
import { CreateCommentDto } from './dto/create-comment.dto.js';
import { UserService } from '../user/user-service.interface.js';

@injectable()
export default class CommentController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.CommentService) private readonly commentService: CommentService,
    @inject(Component.OfferService) private readonly offerService: OfferService,
    @inject(Component.UserService) private readonly userService: UserService,
  ) {
    super(logger);

    this.logger.info('Register routes for CommentController…');
    this.addRoute({
      path: '/comments/:offerId',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateDtoMiddleware(CreateCommentDto)
      ]
    });
  }

  public async create(
    { body, tokenPayload }: CreateCommentRequest,
    res: Response
  ): Promise<void> {

    if (! await this.offerService.exists(tokenPayload.id)) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${body.offer} not found.`,
        'CommentController'
      );
    }

    if (! await this.userService.findById(body.user)) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `User with id ${body.offer} not found.`,
        'CommentController'
      );
    }

    const comment = await this.commentService.create({ ...body, user: tokenPayload.id });
    await this.offerService.incCommentCount(body.offer);
    this.created(res, fillDTO(CommentRdo, comment));
  }
}
