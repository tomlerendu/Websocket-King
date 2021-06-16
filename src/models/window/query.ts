import Window from '.';
import { createDataSource, createMutableDataSource } from '../../services/orm/data-source';

export const mutableDataSource = createMutableDataSource<Window>('windows');

export const dataSource = createDataSource<Window>('windows');
