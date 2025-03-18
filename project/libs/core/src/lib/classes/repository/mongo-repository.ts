import { Default__v, Document, Model, ObjectId, Require_id } from 'mongoose';

import {
  StorableEntity,
  StorablePlainObject,
} from '../../interfaces/base/storable-entity.interface';
import { Repository } from './repository.interface';
import { EntityFactory } from '../../interfaces/base/entity-factory.interface';
import { NotFoundException } from '@nestjs/common';

abstract class MongoRepository<
  T extends StorableEntity<StorablePlainObject<T>>,
  DocumentType extends Document<
    ObjectId,
    any,
    Default__v<Require_id<StorablePlainObject<T>>>
  >
> implements Repository<T>
{
  constructor(
    protected entityFactory: EntityFactory<T>,
    protected readonly model: Model<DocumentType>
  ) {}

  protected createEntityFromDocument(document: DocumentType): T {
    const object = document.toObject();

    return this.entityFactory.create(object);
  }

  public async save(entity: T): Promise<T> {
    const newEntity = new this.model(entity.toPlainObject());
    await newEntity.save();
    entity.id = newEntity._id.toString();
    return entity;
  }

  public async update(entity: T): Promise<T> {
    const document = await this.model
      .findByIdAndUpdate(entity.id, entity.toPlainObject(), {
        new: true,
        runValidators: true,
      })
      .exec();

    if (!document) {
      throw new NotFoundException(
        `Document with id ${entity.id} not found in Mongo DB`
      );
    }

    return this.createEntityFromDocument(document);
  }

  public async findById(id: T['id']): Promise<T | null> {
    const document = await this.model.findById(id);

    if (!document) {
      throw new NotFoundException(
        `Document with id ${id} not found in Mongo DB`
      );
    }

    return this.createEntityFromDocument(document);
  }

  public async deleteById(id: T['id']): Promise<void> {
    const deletedDocument = await this.model.findByIdAndDelete(id).exec();

    if (!deletedDocument) {
      throw new NotFoundException(
        `Document with id ${id} not found in Mongo DB`
      );
    }
  }
}

export { MongoRepository };
