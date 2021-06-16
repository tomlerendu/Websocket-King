import Project from '.';
import { createDataSource, createMutableDataSource } from '../../services/orm/data-source';

export const mutableDataSource = createMutableDataSource<Project>('projects');

export const dataSource = createDataSource<Project>('projects');
