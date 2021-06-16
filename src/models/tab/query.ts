import Tab from '.';
import { createDataSource, createMutableDataSource } from '../../services/orm/data-source';

export const mutableDataSource = createMutableDataSource<Tab>('tabs');

export const dataSource = createDataSource<Tab>('tabs');
