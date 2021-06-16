import UserInterfaceProperty from '.';

import { createDataSource, createMutableDataSource } from '../../services/orm/data-source';

export const mutableDataSource = createMutableDataSource<UserInterfaceProperty<string | number | boolean | null>>('userInterfaceProperties');

export const dataSource = createDataSource<UserInterfaceProperty<string | number | boolean | null>>('userInterfaceProperties');
