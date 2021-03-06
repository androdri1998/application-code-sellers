/* eslint-disable import/prefer-default-export */
import joi from 'joi';

export const createCommentCodeSchema = {
  params: joi.object({
    codeId: joi.string().uuid().required(),
  }),
  body: joi.object({
    contentComment: joi.string().required(),
  }),
};

export const removeCommentCodeSchema = {
  params: joi.object({
    codeId: joi.string().uuid().required(),
    commentCodeId: joi.string().uuid().required(),
  }),
};

export const updateCommentCodeSchema = {
  params: joi.object({
    codeId: joi.string().uuid().required(),
    commentCodeId: joi.string().uuid().required(),
  }),
  body: joi.object({
    contentComment: joi.string().required(),
  }),
};

export const listCommentCodeSchema = {
  params: joi.object({
    codeId: joi.string().uuid().required(),
  }),
  query: joi.object({
    limit: joi.number().integer(),
    page: joi.number().integer(),
  }),
};
