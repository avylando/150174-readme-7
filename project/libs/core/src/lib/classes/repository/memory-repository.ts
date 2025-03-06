import { randomUUID } from 'node:crypto';
import {
  StorableEntity,
  StorablePlainObject,
} from '../../interfaces/base/storable-entity.interface';
import { Repository } from './repository.interface';
import { EntityFactory } from '../../interfaces/base/entity-factory.interface';

abstract class MemoryRepository<
  T extends StorableEntity<StorablePlainObject<T>>
> implements Repository<T>
{
  protected entities: Map<T['id'], StorablePlainObject<T>> = new Map();

  constructor(protected entityFactory: EntityFactory<T>) {}

  public get entitiesArray(): StorablePlainObject<T>[] {
    return Array.from(this.entities.values());
  }

  public async save(entity: T): Promise<T> {
    const id = randomUUID();
    entity.id = id;
    console.log('newEntity', entity);
    this.entities.set(id, entity.toPlainObject());
    return entity;
  }

  public async update(entity: T): Promise<T> {
    if (!this.entities.has(entity.id)) {
      throw new Error(`Entity with id ${entity.id} not found in repository`);
    }
    this.entities.set(entity.id, entity.toPlainObject());
    return this.entityFactory.create(entity.toPlainObject());
  }

  public async findById(id: T['id']): Promise<T | null> {
    if (!this.entities.has(id)) {
      return null;
    }

    return this.entityFactory.create(
      this.entities.get(id) as StorablePlainObject<T>
    );
  }

  public async deleteById(id: T['id']): Promise<void> {
    this.entities.delete(id);
  }
}

export { MemoryRepository };
