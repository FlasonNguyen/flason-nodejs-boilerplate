import * as _ from 'lodash';
import { NextFunction, Request, Response } from 'express';
import { logger } from '@/utils';

export const QueryMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // Main Middleware
  const filter = parseFilter(req);
  const order = parseOrder(req);
  const page = parseInt(String(req.query.page || 1));
  const limit = parseInt(String(req.query.limit || 10));
  const offset = parseInt(String(req.query.offset)) || (page - 1) * limit;
  const fields = parseFields(req);

  if (fields.attributes != undefined) {
    fields.attributes = _.union(['id', 'updated_at'], fields.attributes);
  }

  req.queryInfo = _.merge(
    {
      filter,
      limit,
      page,
      offset,
      order,
    },
    fields,
  );
  logger.info(req.queryInfo);
  next();
};

const parseFilter = (req: Request): any => {
  return JSON.parse(String(req.query.filter)) || {};
};

const parseOrder = (req: Request): [] => {
  return JSON.parse(String(req.query.order)) || [['updated_at', 'asc']];
};

const parseFields = (req: Request): any => {
  const fields = JSON.parse(String(req.query.fields)) || [];
  try {
    return parseAttributes(fields);
  } catch (error) {
    return null;
  }
};

const parseAttributes = (fields: object) => {
  const attributes: any[] = [];
  const includes: any[] = [];
  let isGetAll = false;
  let isSetParanoid = false;
  let where: any = undefined;
  _.forEach(fields, function (f) {
    if (typeof f === 'string') {
      switch (f) {
        case '$all':
          isGetAll = true;
          break;
        case '$paranoid':
          isSetParanoid = true;
          break;
        default:
          attributes.push(f);
      }
    } else if (typeof f === 'object' && !Array.isArray(f)) {
      _.forEach(
        f,
        function (value: any, name: string) {
          switch (name) {
            case '$filter':
              where = _.merge({}, where, value);
              break;
            default:
              includes.push({
                [name]: value,
              });
          }
        }.bind(this),
      );
    }
  });
  const include = parseInclude(includes);
  const result: any = {
    include,
    distinct: !!includes,
  };
  if (where) result.where;
  if (!isGetAll) {
    result.attributes = attributes;
  }
  if (isSetParanoid) {
    result.paranoid = false;
  }
  return result;
};

const parseInclude = (includes: any) => {
  if (includes.length === 0) return includes;

  const associates: any[] = [];
  _.forEach(includes, function (include: any) {
    _.forEach(include, function (attrs: any, name: string) {
      const associate = Object.assign({ association: name }, ...parseAttributes(attrs));
      associates.push(associate);
    }).bind(this);
  });
  return associates;
};
