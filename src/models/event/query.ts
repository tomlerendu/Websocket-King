import Event from '.';
import { createDataSource, createMutableDataSource } from '../../services/orm/data-source';

export const mutableDataSource = createMutableDataSource<Event>('events');

export const dataSource = createDataSource<Event>('events');
