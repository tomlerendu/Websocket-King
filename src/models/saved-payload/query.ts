import SavedPayload from '.';
import { createDataSource, createMutableDataSource } from '../../services/orm/data-source';

export const mutableDataSource = createMutableDataSource<SavedPayload>('savedPayloads');

export const dataSource = createDataSource<SavedPayload>('savedPayloads');
