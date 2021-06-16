import Connection from '.';
import { createDataSource, createMutableDataSource } from '../../services/orm/data-source';

export const mutableDataSource = createMutableDataSource<Connection>('connections');

export const dataSource = createDataSource<Connection>('connections');
